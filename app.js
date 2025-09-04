import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth.routes.js';
import productosRoutes from './routes/productos.routes.js';
import { notFound, errorHandler } from './middlewares/errors.js';

const app = express();

// Middlewares base
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));
app.use(express.json());

// Rate limit para endpoints sensibles (puedes moverlo solo a /auth)
app.use('/auth', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Rutas
app.use('/auth', authRoutes);
app.use('/productos', productosRoutes);

// Healthcheck
app.get('/health', (_req, res) => res.json({ ok: true }));

// 404 + errores
app.use(notFound);
app.use(errorHandler);

export default app;
