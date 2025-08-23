import express from 'express';
import { resolvePath } from '../utils/path.js';

const home_router = express.Router();

home_router.get('/', (req, res) => {

    res.sendFile(resolvePath('views', 'index.html'));
});

// اضافه کردن مسیر برای تست ثبت نام
home_router.get('/test-registration', (req, res) => {
    res.sendFile(resolvePath('views', 'test-registration.html'));
});

// اضافه کردن مسیر برای تست ویرایش کاربر
home_router.get('/test-update', (req, res) => {
    res.sendFile(resolvePath('views', 'test-update.html'));
});

export default home_router;