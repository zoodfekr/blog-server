import multer from "multer";
import { v4 as uuidv4 } from 'uuid';


// مسیر ذخیره فایل‌ها
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/files/avatars");
    },
    filename: async function (req, file, cb) {
        const userName = await req.body.username || "user";
        const ext = file.originalname;
        console.log('-->', req.body)
        cb(null, `${uuidv4()}_${ext}`);
    }
});

// اعتبارسنجی نوع فایل (فقط عکس)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("فقط فایل تصویری مجاز است!"), false);
    }
};

// ساخت middleware
const upload = multer({ storage, fileFilter });
export default upload;
