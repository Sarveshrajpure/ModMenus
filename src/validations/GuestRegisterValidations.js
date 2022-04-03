import * as yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const guestRegisterSchema = yup.object().shape({
  name: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is Required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Enter valid Contact number")
    .required("Contact number is required"),
  email: yup
    .string()
    .email("Enter a valid Email")
    .required("Email is required"),
});
