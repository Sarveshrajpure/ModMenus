import * as yup from "yup";

export const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  lastName: yup
    .string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  businessName: yup
    .string()
    .max(25, "Must be 25 characters or less")
    .required("Required"),
  email: yup
    .string()
    .email("Enter a valid Email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Confirm password is required"),
});
