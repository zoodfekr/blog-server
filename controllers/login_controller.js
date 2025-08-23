import bcrypt from "bcrypt";
import { User_model } from "../models/users_models.js";
import { loginValidationSchema } from "../validation/login_validation.js";

export const loginUser = async (req, res) => {
  try {
    // 1. اعتبارسنجی ورودی‌ها
    await loginValidationSchema.validate(req.body, { abortEarly: false });

    // 2. پیدا کردن کاربر
    const user = await User_model.findOne({ username: req.body.username });
    if (!user) {
      return res
        .status(400)
        .json({ error: "نام کاربری یا رمز عبور اشتباه است" });
    }

    // 3. مقایسه رمز عبور
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: "نام کاربری یا رمز عبور اشتباه است" });
    }

    // 4. ورود موفق
    res.json({ message: "ورود موفقیت آمیز بود", token: "123" });
  } catch (error) {
    if (error.name === "ValidationError") {
      // استخراج کلیدهایی که مشکل دارند
      const missingFields = error.inner.map((e) => e.path);

      return res.status(400).json({
        message: "ورودی‌های نامعتبر",
        errors: error.errors, // پیام خطاهای Yup
        missingFields: missingFields, // کلیدهایی که وارد نشده یا اشتباه هستند
      });
    }

    res.status(500).json({ error: error.message });
  }
};
