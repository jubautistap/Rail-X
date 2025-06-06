#!/bin/bash

# 🚀 Rail-X Auto Deploy Script
echo "🚀 Начинаем деплой Rail-X..."

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функция для логирования
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Проверка зависимостей
check_dependencies() {
    log_info "Проверяем зависимости..."
    
    if ! command -v node &> /dev/null; then
        log_error "Node.js не установлен"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        log_error "npm не установлен"
        exit 1
    fi
    
    log_success "Зависимости в порядке"
}

# Установка зависимостей
install_dependencies() {
    log_info "Устанавливаем зависимости..."
    
    # Корневые зависимости
    npm install
    
    # Frontend зависимости
    cd packages/frontend
    npm install
    cd ../..
    
    # Backend зависимости
    cd packages/backend
    npm install
    cd ../..
    
    log_success "Зависимости установлены"
}

# Сборка проектов
build_projects() {
    log_info "Собираем проекты..."
    
    # Сборка frontend
    log_info "Собираем frontend..."
    cd packages/frontend
    npm run build
    cd ../..
    
    # Сборка backend
    log_info "Собираем backend..."
    cd packages/backend
    npm run build
    cd ../..
    
    log_success "Проекты собраны"
}

# Деплой frontend на Vercel
deploy_frontend() {
    log_info "Деплоим frontend на Vercel..."
    
    # Проверяем установлен ли Vercel CLI
    if ! command -v vercel &> /dev/null; then
        log_warning "Vercel CLI не установлен. Устанавливаем..."
        npm install -g vercel
    fi
    
    cd packages/frontend
    
    # Создаем .env.production если не существует
    if [ ! -f .env.production ]; then
        log_info "Создаем .env.production..."
        cat > .env.production << EOF
VITE_API_URL=https://api.rail-x.online
VITE_SOCKET_URL=https://api.rail-x.online
VITE_APP_ENV=production
EOF
    fi
    
    # Деплоим
    vercel --prod
    
    cd ../..
    log_success "Frontend задеплоен на Vercel"
}

# Деплой backend на Railway
deploy_backend() {
    log_info "Деплоим backend на Railway..."
    
    cd packages/backend
    
    # Создаем .env.production если не существует
    if [ ! -f .env.production ]; then
        log_warning "Создайте .env.production с нужными переменными"
        cat > .env.production << EOF
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://rail-x.online

# Добавьте свои переменные:
# DATABASE_URL=postgresql://...
# BOT_TOKEN=...
# JWT_SECRET=...
EOF
    fi
    
    log_info "Для деплоя на Railway:"
    log_info "1. Зайдите на https://railway.app"
    log_info "2. Создайте новый проект"
    log_info "3. Подключите этот репозиторий"
    log_info "4. Добавьте переменные окружения"
    
    cd ../..
    log_success "Backend готов к деплою"
}

# Настройка базы данных
setup_database() {
    log_info "Настраиваем базу данных..."
    
    cd packages/backend
    
    # Генерируем Prisma клиент
    if [ -f "prisma/schema.prisma" ]; then
        npx prisma generate
        log_success "Prisma клиент сгенерирован"
    else
        log_warning "schema.prisma не найден"
    fi
    
    cd ../..
}

# Проверка конфигурации
check_config() {
    log_info "Проверяем конфигурацию..."
    
    # Проверяем vercel.json
    if [ -f "packages/frontend/vercel.json" ]; then
        log_success "vercel.json найден"
    else
        log_warning "vercel.json не найден"
    fi
    
    # Проверяем railway.toml
    if [ -f "packages/backend/railway.toml" ]; then
        log_success "railway.toml найден"
    else
        log_warning "railway.toml не найден"
    fi
    
    # Проверяем Prisma схему
    if [ -f "packages/backend/prisma/schema.prisma" ]; then
        log_success "Prisma schema найдена"
    else
        log_warning "Prisma schema не найдена"
    fi
}

# Главная функция
main() {
    echo "================================"
    echo "🚀 Rail-X Deployment Script"
    echo "================================"
    
    check_dependencies
    check_config
    
    # Спрашиваем что делать
    echo ""
    echo "Выберите действие:"
    echo "1) Полный деплой (установка + сборка + деплой)"
    echo "2) Только установка зависимостей"
    echo "3) Только сборка"
    echo "4) Только деплой frontend"
    echo "5) Только деплой backend"
    echo "6) Настройка базы данных"
    echo ""
    read -p "Введите номер (1-6): " choice
    
    case $choice in
        1)
            install_dependencies
            build_projects
            setup_database
            deploy_frontend
            deploy_backend
            ;;
        2)
            install_dependencies
            ;;
        3)
            build_projects
            ;;
        4)
            deploy_frontend
            ;;
        5)
            deploy_backend
            ;;
        6)
            setup_database
            ;;
        *)
            log_error "Неверный выбор"
            exit 1
            ;;
    esac
    
    echo ""
    log_success "🎉 Готово!"
    echo ""
    echo "📱 Telegram Bot: https://t.me/your_bot_username"
    echo "🌐 Frontend: https://rail-x.online"
    echo "⚙️ Backend: https://api.rail-x.online"
    echo ""
    echo "📖 Полная инструкция: README.md и DEPLOY.md"
}

# Запускаем главную функцию
main "$@" 