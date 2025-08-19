import mongoose from "mongoose";
import * as Yup from "yup";
import { userValidationSchema } from "../validation/users_validation.js";
import bcrypt from "bcrypt";


// تعریف مدل دیتابیس
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// متد استاتیک برای اعتبارسنجی
userSchema.statics.validation = function (body) {
  return userValidationSchema.validate(body, { abortEarly: false });
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
