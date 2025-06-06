# 🔧 Настройка переменных окружения

## Frontend Environment (.env.production)

Создайте файл `packages/frontend/.env.production`:

```env
VITE_API_URL=https://api.rail-x.online
VITE_SOCKET_URL=https://api.rail-x.online
VITE_APP_ENV=production
```

## Backend Environment (.env.production)

Создайте файл `packages/backend/.env.production`:

```env
# Основные настройки
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://rail-x.online

# База данных (получите на Railway)
DATABASE_URL="postgresql://username:password@host:port/database"

# Redis (получите на Railway)
REDIS_URL="redis://username:password@host:port"

# Telegram Bot (получите у @BotFather)
BOT_TOKEN=1234567890:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
BOT_USERNAME=your_bot_username

# JWT для аутентификации
JWT_SECRET=your_super_secret_jwt_key_256_bits_minimum

# AWS S3 для файлов
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=xxx...
AWS_BUCKET_NAME=rail-x-files
AWS_REGION=eu-west-1

# ЮKassa для платежей
YOOKASSA_SHOP_ID=123456
YOOKASSA_SECRET_KEY=live_xxx...

# Дополнительные настройки
CORS_ORIGIN=https://rail-x.online
RATE_LIMIT_MAX=100
SESSION_SECRET=your_session_secret
```

## Development Environment

Для разработки создайте `.env.local` файлы:

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:3001
VITE_SOCKET_URL=http://localhost:3001
VITE_APP_ENV=development
```

### Backend (.env.local)
```env
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000

# Локальная база данных
DATABASE_URL="postgresql://postgres:password@localhost:5432/railx"

# Локальный Redis
REDIS_URL="redis://localhost:6379"

# Тестовый Telegram Bot
BOT_TOKEN=your_test_bot_token
BOT_USERNAME=your_test_bot_username

JWT_SECRET=dev_secret_key_for_testing_only
```

## Получение необходимых ключей

### 1. Telegram Bot Token
1. Напишите @BotFather в Telegram
2. Отправьте `/start`
3. Отправьте `/newbot`
4. Следуйте инструкциям
5. Получите токен вида: `1234567890:XXXXXXX`

### 2. Railway Database
1. Зайдите на https://railway.app
2. Создайте проект
3. Add Plugin → PostgreSQL
4. Скопируйте DATABASE_URL
5. Add Plugin → Redis
6. Скопируйте REDIS_URL

### 3. AWS S3
1. Зайдите в AWS Console
2. Создайте S3 bucket
3. В IAM создайте пользователя с правами S3
4. Получите Access Key и Secret Key

### 4. ЮKassa
1. Зарегистрируйтесь на https://yookassa.ru
2. Получите Shop ID и Secret Key в настройках

## Безопасность

⚠️ **ВАЖНО:**
- Никогда не коммитьте .env файлы в git
- Используйте длинные случайные ключи для JWT_SECRET
- Регулярно ротируйте секретные ключи
- Используйте отдельные ключи для dev/prod

## Проверка настроек

Запустите проверку:
```bash
./deploy.sh
# Выберите опцию 6 (Настройка базы данных)
```

Или вручную:
```bash
cd packages/backend
npx prisma generate
npx prisma db push
``` 