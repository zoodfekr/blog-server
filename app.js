import express from 'express';
import process from 'process';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import chalk from 'chalk';


import home_router from './routes/home.js';
import admin_router from './routes/admin.js';
import users_router from './routes/users.js';
import { resolvePath } from './utils/path.js';
import { connectDB } from './config/db.js';
import { logger } from './config/winston.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, 'config', '.env') });

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev' , {stream : logger.stream}));



app.use(cors({ origin: '*' }));
app.use(express.static(resolvePath('public')));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Routes should be defined after body parsing middleware
app.use('/admin', admin_router);
app.use(home_router);
app.use(users_router);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running ${chalk.red(process.env.NODE_ENV)} on port ${PORT}`));
