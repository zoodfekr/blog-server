import mongoose from 'mongoose';
import * as Yup from 'yup';
import { userValidationSchema } from '../validation/users_validation.js';

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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// متد استاتیک برای اعتبارسنجی
userSchema.statics.validation = function (body) {
    return userValidationSchema.validate(body, { abortEarly: false });
};

export const User_model = mongoose.model('users', userSchema);
