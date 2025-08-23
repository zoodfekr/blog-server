import * as yup from 'yup';

export const userValidationSchema = yup.object({
    username: yup
        .string()
        .required('نام کاربری الزامی است')
        .trim()
        .min(3, 'نام کاربری باید حداقل 3 کاراکتر باشد')
        .max(30, 'نام کاربری نباید بیشتر از 30 کاراکتر باشد'),

    password: yup
        .string()
        .required('رمز عبور الزامی است')
        .min(4, 'رمز عبور باید حداقل 4 کاراکتر باشد')
        .max(255, 'رمز عبور نباید بیشتر از 255 کاراکتر باشد'),

    email: yup
        .string()
        .required('ایمیل الزامی است')
        .email('ایمیل معتبر نیست'),

    avatar: yup.mixed().test(
        "fileRequired",
        "آواتار الزامی است",
        (_, ctx) => !!ctx?.options?.context?.file // یعنی فایل باید وجود داشته باشه
    ).test(
        "fileType",
        "فقط تصویر مجاز است",
        (_, ctx) => {
            const file = ctx?.options?.context?.file;
            if (!file) return false;
            return file.mimetype.startsWith("image/");
        }
    ),

    createdAt: yup.date().default(() => new Date()),
});

// اعتبارسنجی برای ویرایش کاربر - همه فیلدها اختیاری هستند
export const userUpdateValidationSchema = yup.object({
    username: yup
        .string()
        .trim()
        .min(3, 'نام کاربری باید حداقل 3 کاراکتر باشد')
        .max(30, 'نام کاربری نباید بیشتر از 30 کاراکتر باشد'),

    password: yup
        .string()
        .min(4, 'رمز عبور باید حداقل 4 کاراکتر باشد')
        .max(255, 'رمز عبور نباید بیشتر از 255 کاراکتر باشد'),

    email: yup
        .string()
        .email('ایمیل معتبر نیست'),

    avatar: yup.mixed().test(
        "fileType",
        "فقط تصویر مجاز است",
        (_, ctx) => {
            const file = ctx?.options?.context?.file;
            if (!file) return true; // اگر فایل نباشد، مشکلی نیست
            return file.mimetype.startsWith("image/");
        }
    ),
});
