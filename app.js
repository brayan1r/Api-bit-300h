import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth.routes.js';
import productosRoutes from './routes/products.Routes.js';
import { notFound, errorHandler } from './middlewares/errors.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));
app.use(express.json());

// Puedes limitar solo /auth o aún más fino: /auth/login
app.use('/auth', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use('/auth', authRoutes);
app.use('/productos', productosRoutes);

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use(notFound);
app.use(errorHandler);

export default app;
