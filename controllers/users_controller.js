import bcrypt from "bcrypt";
import { User_model } from "../models/users_models.js";
import { userValidationSchema } from "../validation/users_validation.js";

// گرفتن لیست کاربران
export const getUsers = async (req, res) => {
  try {
    const users = await User_model.find();

    const value = {
      total: users.length,
      data: users,
    };
    res.json(value);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// افزودن کاربر جدید
export const addUsers = async (req, res) => {
  try {
    // 1. اعتبارسنجی ورودی‌ها با متد استاتیک مدل
    await loginValidationSchema.validation(req.body);

    // 2. بررسی وجود نام کاربری
    const existingUser = await User_model.findOne({
      username: req.body.username,
    });
    if (existingUser) {
      return res.status(400).json({ error: "این نام کاربری قبلا ثبت شده است" });
    }

    // const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // 3. ایجاد و ذخیره کاربر جدید
    const user = new User_model({ ...req.body });
    await user.save();

    res.json({ message: "کاربر ذخیره شد", data: user });
  } catch (error) {
    if (error.name === "ValidationError") {
      // خطاهای Yup
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ error: error.message });
  }
};
