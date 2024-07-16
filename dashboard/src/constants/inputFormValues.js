import * as yup from "yup";

// initial input fields
export const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contact: "",
    birth: "",
    gender: "",
    department: "",
    role: "",
    docAvatar: "",
};

// phone number input validation checking from string by regex pattern...
const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;


// user input validation logic for each input field 
export const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email("Invalid Email").required("Required"),
    password: yup.string().min(6, "Password must be at least 8 characters long").required("Required"),
    contact: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Required"),
    birth: yup.date().required("Required"),
    gender: yup.string().required("Required"),
    department: yup.string().required("Required"),
    role: yup.string().required("Required"),
    docAvatar: yup.mixed().required("Required"),
});