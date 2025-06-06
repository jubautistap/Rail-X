import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);

// Socket.IO для real-time трекинга курьеров
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'", "https://telegram.org"],
      connectSrc: ["'self'", "https://api.telegram.org"],
    },
  },
}));

app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'Rail-X API',
    version: '1.0.0'
  });
});

// API Routes (пока заглушки)
app.get('/api/v1/products', (req, res) => {
  res.json({
    success: true,
    data: {
      products: [
        {
          id: '1',
          name: 'Стильная футболка',
          brand: 'Urban Style',
          price: 2490,
          originalPrice: 3500,
          discount: 29,
          images: [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
            'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=400'
          ],
          description: 'Модная футболка из натурального хлопка',
          deliveryTime: { min: 2, max: 4 },
          rating: 4.8,
          reviewsCount: 124,
          inStock: true,
          tags: ['новинка', 'хит продаж']
        },
        {
          id: '2',
          name: 'Джинсы Slim Fit',
          brand: 'Denim Co',
          price: 4990,
          images: [
            'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
          ],
          description: 'Классические джинсы прямого кроя',
          deliveryTime: { min: 1, max: 3 },
          rating: 4.6,
          reviewsCount: 89,
          inStock: true,
          tags: ['базовый гардероб']
        }
      ],
      total: 2,
      page: 1,
      totalPages: 1
    }
  });
});

app.get('/api/v1/categories', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: '1',
        name: 'Мужское',
        slug: 'men',
        icon: '👔',
        subcategories: [
          { id: '1-1', name: 'Футболки', slug: 'tshirts' },
          { id: '1-2', name: 'Рубашки', slug: 'shirts' },
          { id: '1-3', name: 'Джинсы', slug: 'jeans' }
        ]
      },
      {
        id: '2',
        name: 'Женское',
        slug: 'women',
        icon: '👗',
        subcategories: [
          { id: '2-1', name: 'Платья', slug: 'dresses' },
          { id: '2-2', name: 'Блузки', slug: 'blouses' },
          { id: '2-3', name: 'Юбки', slug: 'skirts' }
        ]
      },
      {
        id: '3',
        name: 'Аксессуары',
        slug: 'accessories',
        icon: '👜',
        subcategories: [
          { id: '3-1', name: 'Сумки', slug: 'bags' },
          { id: '3-2', name: 'Обувь', slug: 'shoes' },
          { id: '3-3', name: 'Украшения', slug: 'jewelry' }
        ]
      }
    ]
  });
});

// Socket.IO для real-time уведомлений
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Присоединение к комнате заказа для трекинга
  socket.on('join-order', (orderId) => {
    socket.join(`order-${orderId}`);
    console.log(`User ${socket.id} joined order room: ${orderId}`);
  });
  
  // Обновление локации курьера
  socket.on('courier-location', (data) => {
    socket.to(`order-${data.orderId}`).emit('courier-location-update', {
      location: data.location,
      timestamp: new Date().toISOString()
    });
  });
  
  // Обновление статуса заказа
  socket.on('order-status-update', (data) => {
    socket.to(`order-${data.orderId}`).emit('order-status-change', {
      status: data.status,
      message: data.message,
      timestamp: new Date().toISOString()
    });
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Error handling
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 Rail-X API сервер запущен на порту ${PORT}`);
  console.log(`📱 Telegram Mini App API готов к работе`);
  console.log(`🔄 Socket.IO сервер для real-time трекинга активен`);
});

export { io }; 