# 🚀 Деплой Rail-X в хостинг

Подробная инструкция по развертыванию Telegram Mini App маркетплейса Rail-X.

## 🎯 Обзор

- **Frontend**: Vercel/Netlify (статический хостинг)
- **Backend**: Railway/Heroku (Node.js хостинг)
- **Database**: Railway PostgreSQL/Supabase
- **Files**: AWS S3/Cloudinary

## 📋 Предварительные требования

- ✅ Telegram Bot создан через @BotFather
- ✅ Домен настроен: `https://rail-x.online`
- ✅ SSL сертификат (обязательно для Telegram)

---

## 🎨 Frontend Деплой (Vercel)

### 1. Подготовка проекта

```bash
cd packages/frontend

# Создайте .env.production
cat > .env.production << EOF
VITE_API_URL=https://api.rail-x.online
VITE_SOCKET_URL=https://api.rail-x.online
VITE_APP_ENV=production
EOF
```

### 2. Настройка Vercel

Установите Vercel CLI:
```bash
npm i -g vercel
```

Деплой:
```bash
cd packages/frontend
vercel

# Следуйте инструкциям:
# ? Set up and deploy? Yes
# ? Which scope? Your account
# ? Link to existing project? No
# ? Project name: rail-x-frontend
# ? In which directory is your code located? ./
```

### 3. Конфигурация Vercel

Создайте `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_API_URL": "https://api.rail-x.online",
    "VITE_SOCKET_URL": "https://api.rail-x.online",
    "VITE_APP_ENV": "production"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "Content-Security-Policy",
          "value": "frame-ancestors 'self' https://web.telegram.org https://telegram.org"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 4. Настройка домена

В Vercel Dashboard:
1. Перейдите в проект → Settings → Domains
2. Добавьте `rail-x.online`
3. Настройте DNS записи у регистратора

---

## ⚙️ Backend Деплой (Railway)

### 1. Подготовка

```bash
cd packages/backend

# Создайте .env.production
cat > .env.production << EOF
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://rail-x.online

# Database (Railway предоставит)
DATABASE_URL=postgresql://...

# Redis (Railway предоставит)  
REDIS_URL=redis://...

# Telegram
BOT_TOKEN=your_bot_token
BOT_USERNAME=your_bot_username

# AWS S3
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_BUCKET_NAME=rail-x-files
AWS_REGION=eu-west-1

# JWT
JWT_SECRET=your_super_secret_jwt_key_256_bits

# Payments
YOOKASSA_SHOP_ID=your_shop_id
YOOKASSA_SECRET_KEY=your_secret
EOF
```

### 2. Railway Setup

1. Зайдите на [railway.app](https://railway.app)
2. Подключите GitHub репозиторий
3. Создайте новый проект

### 3. Настройка Railway

Создайте `railway.toml`:
```toml
[build]
builder = "nixpacks"
buildCommand = "npm run build"

[deploy]
startCommand = "npm start"
restartPolicyType = "always"

[env]
NODE_ENV = "production"
```

### 4. Database Setup

В Railway:
1. Add Plugin → PostgreSQL
2. Скопируйте `DATABASE_URL`
3. Add Plugin → Redis
4. Скопируйте `REDIS_URL`

### 5. Environment Variables

В Railway Dashboard → Variables:
```
NODE_ENV=production
FRONTEND_URL=https://rail-x.online
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
BOT_TOKEN=...
JWT_SECRET=...
```

### 6. Custom Domain

1. Settings → Networking → Custom Domain
2. Добавьте `api.rail-x.online`
3. Настройте CNAME в DNS

---

## 🗄️ База данных (Prisma)

### 1. Установка Prisma

```bash
cd packages/backend
npm install prisma @prisma/client
```

### 2. Создание схемы

Создайте `prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id          String   @id @default(cuid())
  telegramId  Int      @unique
  firstName   String
  lastName    String?
  username    String?
  phoneNumber String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  orders    Order[]
  favorites Favorite[]
  addresses Address[]

  @@map("users")
}

model Product {
  id            String   @id @default(cuid())
  name          String
  description   String
  price         Int
  originalPrice Int?
  brand         String
  images        String[]
  inStock       Boolean  @default(true)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  categoryId String
  category   Category @relation(fields: [categoryId], references: [id])
  
  orderItems OrderItem[]
  favorites  Favorite[]

  @@map("products")
}

model Category {
  id       String    @id @default(cuid())
  name     String
  slug     String    @unique
  icon     String?
  products Product[]

  @@map("categories")
}

model Order {
  id        String      @id @default(cuid())
  status    OrderStatus @default(PENDING)
  total     Int
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt

  userId String
  user   User   @relation(fields: [userId], references: [id])

  items OrderItem[]

  @@map("orders")
}

model OrderItem {
  id       String @id @default(cuid())
  quantity Int
  price    Int

  orderId   String
  order     Order   @relation(fields: [orderId], references: [id])
  productId String
  product   Product @relation(fields: [productId], references: [id])

  @@map("order_items")
}

model Favorite {
  id String @id @default(cuid())

  userId    String
  user      User    @relation(fields: [userId], references: [id])
  productId String
  product   Product @relation(fields: [productId], references: [id])

  @@unique([userId, productId])
  @@map("favorites")
}

model Address {
  id          String  @id @default(cuid())
  label       String
  address     String
  latitude    Float
  longitude   Float
  isDefault   Boolean @default(false)
  
  userId String
  user   User   @relation(fields: [userId], references: [id])

  @@map("addresses")
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PREPARING
  COURIER_ASSIGNED
  PICKED_UP
  IN_TRANSIT
  DELIVERED
  CANCELLED
}
```

### 3. Миграции

```bash
# Генерация клиента
npx prisma generate

# Применение схемы
npx prisma db push

# Или создание миграции
npx prisma migrate dev --name init
```

### 4. Сидинг данных

Создайте `prisma/seed.ts`:
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Создание категорий
  const menCategory = await prisma.category.create({
    data: {
      name: 'Мужское',
      slug: 'men',
      icon: '👔',
    },
  });

  const womenCategory = await prisma.category.create({
    data: {
      name: 'Женское',
      slug: 'women',
      icon: '👗',
    },
  });

  // Создание товаров
  await prisma.product.createMany({
    data: [
      {
        name: 'Стильная футболка',
        description: 'Модная футболка из натурального хлопка',
        price: 2490,
        originalPrice: 3500,
        brand: 'Urban Style',
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'],
        categoryId: menCategory.id,
      },
      {
        name: 'Летнее платье',
        description: 'Легкое летнее платье для особых случаев',
        price: 3990,
        originalPrice: 5500,
        brand: 'Style Co',
        images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'],
        categoryId: womenCategory.id,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Запуск сидинга:
```bash
npx tsx prisma/seed.ts
```

---

## 📱 Telegram Bot настройка

### 1. Настройка Menu Button

Отправьте @BotFather:
```
/setmenubutton
@your_bot_username
```

Введите:
- **Text**: 🛍 Открыть магазин
- **URL**: https://rail-x.online

### 2. Настройка команд

```
/setcommands
@your_bot_username
```

Список команд:
```
start - 🚀 Запустить Rail-X
shop - 🛍 Открыть магазин  
help - ❓ Помощь
support - 📞 Поддержка
```

### 3. Настройка Web App

```
/setdomain
@your_bot_username
rail-x.online
```

### 4. Webhook (опционально)

Если нужен webhook для уведомлений:
```bash
curl -X POST "https://api.telegram.org/bot<BOT_TOKEN>/setWebhook" \
     -H "Content-Type: application/json" \
     -d '{"url":"https://api.rail-x.online/webhook/telegram"}'
```

---

## 🔧 Финальные настройки

### 1. DNS записи

У вашего регистратора домена:
```
# Основной сайт
A     rail-x.online          → Vercel IP
CNAME www.rail-x.online      → rail-x.online

# API
CNAME api.rail-x.online      → Railway domain

# SSL (Let's Encrypt автоматически)
```

### 2. Проверка деплоя

```bash
# Frontend
curl https://rail-x.online

# Backend  
curl https://api.rail-x.online/health

# Telegram Test
# Зайдите в бота и нажмите Menu Button
```

### 3. Мониторинг

Настройте уведомления:
- Vercel → Integrations → Slack/Discord
- Railway → Notifications
- Sentry для ошибок (опционально)

---

## 🚨 Troubleshooting

### Проблема: "Bot domain invalid"
**Решение**: Убедитесь что домен доступен по HTTPS и возвращает 200

### Проблема: CORS ошибки  
**Решение**: Проверьте настройки CORS в backend:
```javascript
app.use(cors({
  origin: ['https://rail-x.online', 'https://web.telegram.org'],
  credentials: true
}));
```

### Проблема: База данных не подключается
**Решение**: Проверьте `DATABASE_URL` в переменных окружения

### Проблема: Socket.IO не работает
**Решение**: Убедитесь что WebSocket трафик разрешен:
```javascript
// В Railway добавьте:
const io = new Server(server, {
  cors: {
    origin: "https://rail-x.online",
    methods: ["GET", "POST"]
  },
  transports: ['websocket', 'polling']
});
```

---

## 📊 Мониторинг после деплоя

### Важные метрики:
- ✅ Frontend доступен: https://rail-x.online
- ✅ API отвечает: https://api.rail-x.online/health  
- ✅ База данных подключена
- ✅ Socket.IO работает
- ✅ Telegram Bot Menu Button открывает сайт

### Логи:
- Vercel: Dashboard → Functions → Logs
- Railway: Dashboard → Deployments → View Logs

**Готово! Rail-X успешно задеплоен! 🚀** 