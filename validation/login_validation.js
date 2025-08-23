import * as yup from "yup";

export const loginValidationSchema = yup.object({
  username: yup
    .string()
    .required("نام کاربری الزامی است")
    .trim()
    .min(3, "نام کاربری باید حداقل 3 کاراکتر باشد")
    .max(30, "نام کاربری نباید بیشتر از 30 کاراکتر باشد"),

  password: yup
    .string()
    .required("رمز عبور الزامی است")
    .min(4, "رمز عبور باید حداقل 4 کاراکتر باشد")
    .max(255, "رمز عبور نباید بیشتر از 255 کاراکتر باشد"),

  re_password: yup
    .string()
    .required("تکرار رمز عبور الزامی است")
    .oneOf([yup.ref("password"), null], "رمز عبور و تکرار آن باید یکسان باشند"),
});
