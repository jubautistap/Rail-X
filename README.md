# 🚀 Rail-X - Telegram Mini App Маркетплейс

Революционный маркетплейс одежды в формате Telegram Mini App с курьерской доставкой за 2-10 часов.

## 📱 Особенности

- **Telegram Mini App** - запускается прямо в Telegram
- **Быстрая доставка** - от продавцов к покупателям за 2-10 часов  
- **Без складов** - прямые поставки от продавцов
- **Real-time трекинг** - отслеживание курьера на карте
- **Темная тема** - современный дизайн с мятным акцентом
- **PWA поддержка** - работает как нативное приложение

## 🏗️ Архитектура

```
rail-x/
├── packages/
│   ├── frontend/          # React + TypeScript + Telegram WebApp
│   └── backend/           # Node.js + Express + Socket.IO
├── package.json           # Monorepo конфигурация
└── README.md
```

## 🛠️ Технологический стек

### Frontend
- **React 18** + TypeScript
- **Vite** - сборщик
- **Emotion** - CSS-in-JS
- **Zustand** - состояние
- **React Router** - роутинг
- **Telegram WebApp API** - интеграция

### Backend  
- **Node.js** + Express
- **TypeScript**
- **Socket.IO** - real-time
- **PostgreSQL** + Prisma ORM
- **Redis** - кеширование
- **AWS S3** - файлы

## 🚀 Быстрый старт

### Требования
- Node.js 18+
- npm или yarn
- PostgreSQL (для production)

### Установка

1. **Клонируйте репозиторий**
```bash
git clone <repository-url>
cd rail-x
```

2. **Автоматическая установка и деплой**
```bash
./deploy.sh
# Выберите опцию 1 (Полный деплой)
```

3. **Или установите зависимости вручную**
```bash
npm run install:all
```

3. **Настройте переменные окружения**

Создайте `.env` файлы:

**packages/backend/.env**
```env
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/railx"

# Redis
REDIS_URL="redis://localhost:6379"

# Telegram Bot
BOT_TOKEN=your_telegram_bot_token
BOT_USERNAME=your_bot_username

# File uploads
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_BUCKET_NAME=your_s3_bucket
AWS_REGION=eu-west-1

# JWT
JWT_SECRET=your_jwt_secret_key

# Payment providers
YOOKASSA_SHOP_ID=your_yookassa_shop_id
YOOKASSA_SECRET_KEY=your_yookassa_secret
```

**packages/frontend/.env**
```env
VITE_API_URL=http://localhost:3001
VITE_SOCKET_URL=http://localhost:3001
VITE_APP_ENV=development
```

### Запуск в режиме разработки

```bash
# Запуск всего проекта
npm run dev

# Или по отдельности:
npm run dev:frontend  # http://localhost:3000
npm run dev:backend   # http://localhost:3001
```

## 📱 Telegram Bot Setup

### 1. Создайте бота

Напишите [@BotFather](https://t.me/BotFather) в Telegram:

```
/start
/newbot
Your Bot Name
your_bot_username
```

### 2. Настройте Mini App

```
/mybots
@your_bot_username
Bot Settings
Menu Button
Configure Menu Button
```

URL для Menu Button: `https://rail-x.online` (в разработке - ngrok URL)

### 3. Настройте Web App

```
/setmenubutton
@your_bot_username
```

Пример команд для настройки:
```
/setcommands
start - Запустить Rail-X
help - Помощь
shop - Открыть магазин
```

## 🔧 Команды разработки

```bash
# Установка всех зависимостей
npm run install:all

# Запуск в development режиме
npm run dev

# Сборка проекта
npm run build

# Линтинг
npm run lint

# Тесты
npm run test

# База данных
npm run db:generate  # Генерация Prisma клиента
npm run db:push      # Синхронизация схемы
npm run db:migrate   # Миграции
npm run db:seed      # Тестовые данные
```

## 🎨 Дизайн-система

### Цвета
```css
--background: #1e1e1e;      /* Основной фон */
--accent: #64DDA0;          /* Мятный акцент */
--text-primary: #ffffff;    /* Основной текст */
--text-secondary: #b0b0b0;  /* Вторичный текст */
--card-bg: #2a2a2a;         /* Фон карточек */
--border: #3a3a3a;          /* Границы */
```

### Компоненты
- Скругленные углы: 12-16px
- Тени: soft shadows
- Анимации: 0.15s ease-out
- Градиенты: мятный градиент для кнопок

## 🚀 Деплой

### Frontend (Vercel)
```bash
cd packages/frontend
npm run build
# Deploy to Vercel
```

### Backend (Railway/Heroku)
```bash
cd packages/backend  
npm run build
# Deploy to Railway/Heroku
```

### Environment Variables
Не забудьте настроить переменные окружения в production!

## 📊 MVP Функционал

### ✅ Готово
- [x] Telegram Mini App структура
- [x] Дизайн-система (темная тема + мятный акцент)
- [x] Главная страница с категориями
- [x] Backend API с заглушками
- [x] Socket.IO для real-time уведомлений
- [x] TypeScript типы

### 🔄 В разработке
- [ ] Каталог товаров с фильтрами
- [ ] Карточка товара
- [ ] Корзина и оформление заказа
- [ ] Интеграция Telegram Payments
- [ ] Отслеживание заказов
- [ ] Панель продавца
- [ ] Панель курьера

### 🎯 Планы
- [ ] Live-трекинг курьеров на карте
- [ ] Push-уведомления через Telegram
- [ ] Система отзывов с фото
- [ ] AR примерка
- [ ] Программа лояльности

## 🤝 Команда

- **Frontend**: React + TypeScript + Telegram WebApp
- **Backend**: Node.js + Express + Socket.IO  
- **Design**: Темная тема с мятным акцентом
- **Mobile**: PWA + Telegram Mini App

## 📞 Поддержка

- **Telegram**: [@rail_x_support](https://t.me/rail_x_support)
- **Email**: support@rail-x.ru
- **Docs**: [docs.rail-x.ru](https://docs.rail-x.ru)

## 📄 Лицензия

MIT License - см. [LICENSE](LICENSE) файл

---

**Rail-X** - будущее модного шопинга в Telegram! 🚀 