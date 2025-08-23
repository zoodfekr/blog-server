import mongoose from 'mongoose';
import * as Yup from 'yup';
import { userValidationSchema, userUpdateValidationSchema } from '../validation/users_validation.js';

// تعریف مدل دیتابیس
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255
    },
    email: {
        type: String,
        required: true
    },
    avatar: { type: String, required: true }, // مسیر یا نام فایل آواتار
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// متد استاتیک برای اعتبارسنجی
userSchema.statics.validation = function (body, file) {
    return userValidationSchema.validate(body, { abortEarly: false, context: { file } });
};

// متد استاتیک برای اعتبارسنجی ویرایش کاربر
userSchema.statics.updateValidation = function (body, file) {
    return userUpdateValidationSchema.validate(body, { abortEarly: false, context: { file } });
};

export const User_model = mongoose.model('users', userSchema);
