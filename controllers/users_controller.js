import { User_model } from '../models/users_models.js';

// گرفتن لیست کاربران
export const getUsers = async (req, res) => {
    try {
        const users = await User_model.find();

        const value = {
            total: users.length,
            data: users
        }
        res.json(value);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// افزودن کاربر جدید
export const addUsers = async (req, res) => {

    const { username, password, email } = req.body

    if (!username || !password || !email) return res.status(400).json({ error: "لطفا تمام فیلدها را پر کنید" });

    try {
        const existingUser = await User_model.find({ username });

        if (existingUser.length > 0) return res.status(400).json({ error: "این نام کاربری قبلا ثبت شده است" });

        const user = new User_model({ username, password, email })

        await user.save();

        res.json({ message: "کاربر ذخیره شد", data: user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
