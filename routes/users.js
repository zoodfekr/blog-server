import express from 'express';
import multer from 'multer';
import { addUsers, getUsers, deleteUser, getUserByUserName, updateUserByUserName } from '../controllers/users_controller.js';
import upload from '../config/multer_config.js';

const users_router = express.Router();

// Middleware برای handle کردن خطاهای multer
const handleMulterError = (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'حجم فایل بیش از حد مجاز است (5MB)' });
        }
        if (error.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({ error: 'تعداد فایل‌ها بیش از حد مجاز است' });
        }
        return res.status(400).json({ error: 'خطا در آپلود فایل' });
    }

    if (error.message === 'فقط فایل تصویری مجاز است!') {
        return res.status(400).json({ error: error.message });
    }

    next(error);
};

users_router.get('/users', getUsers);
users_router.post('/adduser', upload.single('avatar'), handleMulterError, addUsers);
users_router.delete('/user/:username', deleteUser);
users_router.get('/user/:username', getUserByUserName);
users_router.put('/user/:username', upload.single('avatar'), handleMulterError, updateUserByUserName);


export default users_router;