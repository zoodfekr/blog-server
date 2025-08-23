import mongoose from 'mongoose';
import * as Yup from 'yup';
import bcrypt from "bcrypt";

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

// متد تبدیل نام کاربری به حروف کوچک قبل از ذخیره 
userSchema.pre("save", function (next) {
  this.username = this.username.toLowerCase();
  next();
});

// middleware برای hash کردن password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // اگر پسورد تغییر نکرده بود، دوباره hash نکن
  try {
    const salt = await bcrypt.genSalt(10); // تولید salt
    this.password = await bcrypt.hash(this.password, salt); // hash کردن پسورد
    next();
  } catch (err) {
    next(err);
  }
});

export const User_model = mongoose.model("users", userSchema);
