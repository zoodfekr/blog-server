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

    createdAt: yup
        .date()
        .default(() => new Date())
});