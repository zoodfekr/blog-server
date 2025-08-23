import bcrypt from "bcrypt";
import { User_model } from '../models/users_models.js';
import appRoot from 'app-root-path'
import chalk from "chalk";
import { removeFileIfExists } from "../utils/deleteFile.js";


// گرفتن لیست کاربران
export const getUsers = async (req, res) => {
    try {
        const users = await User_model.find();

        console.log('-----------', appRoot);

        const value = {
            total: users.length,
            data: users
        }
        res.json(value);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// دریافت اطلاعات کاربر با نام کاربری
export const getUserByUserName = async (req, res) => {
    const { username } = req.params;
    const user = await User_model.findOne({ username }).select("-password")
    if (!user) return res.status(404).json({ message: "کاربر یافت نشد" });
    return res.status(200).json({ data: user });
}

// افزودن کاربر جدید
export const addUsers = async (req, res) => {
    try {
        // 1. اعتبارسنجی ورودی‌ها با متد استاتیک مدل و ارسال فایل در context
        await User_model.validation(req.body, req.file);

        // 2. بررسی وجود نام کاربری
        const existingUser = await User_model.findOne({ username: req.body.username });
        if (existingUser) {
            await removeFileIfExists(req.file?.filename);
            return res.status(400).json({ error: "این نام کاربری قبلا ثبت شده است" });
        }

        // 3. هش کردن پسورد
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // 4. گرفتن نام فایل آواتار (اگر وجود داشت)
        const avatar = req.file ? req.file.filename : null;

        // 5. ایجاد و ذخیره کاربر جدید
        const user = new User_model({ ...req.body, password: hashedPassword, avatar });
        await user.save();

        res.json({ message: "کاربر ذخیره شد", data: { username: user.username, avatar: user.avatar, email: user.email } });

    } catch (error) {

        console.log(chalk.red('حذف فایل به علت خطا'));
        await (async () => {
            try {
                await removeFileIfExists(req.file?.filename);
            } catch (err) {
                if (err.code !== 'ENOENT') {
                    console.error('خطا در حذف فایل:', err);
                }
            }
        })();
        if (error.name === 'ValidationError') {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(500).json({ error: error.message });
    }
};

// حذف کاربر با نام کاربری
export const deleteUser = async (req, res) => {
    try {
        const { username } = req.params; // گرفتن username از پارامتر URL

        // پیدا کردن و حذف همزمان کاربر
        const user = await User_model.findOneAndDelete({ username });

        if (!user) {
            return res.status(404).json({ message: "کاربر یافت نشد" });
        }

        console.log('-----------------', user.avatar);

        // اگر آواتار دارد، حذف فایل
        await removeFileIfExists(user.avatar);

        res.status(200).json({ message: "کاربر با موفقیت حذف شد" });

    } catch (error) {
        console.error("خطا در حذف کاربر:", error);
        res.status(500).json({ message: "خطای سرور" });
    }
};

// ویرایش کاربر با نام کاربری
export const updateUserByUserName = async (req, res) => {
    try {
        const { username } = req.params;
        
        // ابتدا کاربر فعلی را پیدا کن
        const currentUser = await User_model.findOne({ username });
        if (!currentUser) {
            return res.status(404).json({ message: "کاربر یافت نشد" });
        }

        // اعتبارسنجی ورودی‌ها با متد جدید
        await User_model.updateValidation(req.body, req.file);

        // آماده‌سازی فیلدهای آپدیت
        const updates = {};
        
        // اگر نام کاربری جدید وارد شده و با نام قبلی متفاوت است
        if (req.body.username && req.body.username !== currentUser.username) {
            // بررسی اینکه نام کاربری جدید تکراری نباشد
            const existingUser = await User_model.findOne({ username: req.body.username });
            if (existingUser) {
                // اگر فایل آپلود شده، آن را حذف کن
                if (req.file) {
                    await removeFileIfExists(req.file.filename);
                }
                return res.status(400).json({ error: "این نام کاربری قبلا ثبت شده است" });
            }
            updates.username = req.body.username;
        }

        // اگر پسورد جدید وارد شده
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(req.body.password, salt);
        }

        // اگر ایمیل جدید وارد شده
        if (req.body.email) {
            updates.email = req.body.email;
        }

        // اگر آواتار جدید آپلود شده
        if (req.file) {
            // حذف آواتار قبلی
            if (currentUser.avatar) {
                await removeFileIfExists(currentUser.avatar);
            }
            updates.avatar = req.file.filename;
        }

        // اگر هیچ فیلدی برای آپدیت وجود ندارد
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: "هیچ فیلدی برای آپدیت وارد نشده است" });
        }

        // آپدیت کاربر
        const updatedUser = await User_model.findOneAndUpdate(
            { username },
            { $set: updates },
            { new: true }
        );

        // حذف پسورد از خروجی
        const { password, ...userWithoutPassword } = updatedUser.toObject();

        res.status(200).json({
            message: "اطلاعات کاربر بروزرسانی شد",
            data: userWithoutPassword,
        });

    } catch (error) {
        console.error("خطا در ویرایش کاربر:", error);
        
        // اگر فایل آپلود شده و خطا رخ داده، آن را حذف کن
        if (req.file) {
            try {
                await removeFileIfExists(req.file.filename);
            } catch (err) {
                console.error('خطا در حذف فایل:', err);
            }
        }
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(500).json({ message: "خطای سرور" });
    }
};
