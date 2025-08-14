import express from 'express'
import process from 'process'
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import home_router from './routes/home.js'
import admin_router from './routes/admin.js'
import users_router from './routes/users.js'
import { resolvePath } from './utils/path.js';
import { connectDB } from './config/db.js';


// ایجاد یک اپلیکیشن Express
const app = express();


// تنظیمات CORS
dotenv.config({ path: resolvePath('config', 'config.env') });


// استفاده از مسیر استاتیک برای فایل‌های عمومی
app.use(express.static(resolvePath('public')));

// استفاده از JSON parser برای درخواست‌های JSON
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

// مسیر ها
app.use('/admin', admin_router)
app.use(home_router)
app.use(users_router)


// اتصال به پایگاه داده
connectDB()
console.log('Connected to database')


// راه‌اندازی سرور
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
