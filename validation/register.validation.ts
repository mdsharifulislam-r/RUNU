import * as yup from "yup"
export const registerValidation = yup?.object({
    name:yup.string().required("name is required"),
    email:yup.string().email("Email is Invalid").required("Email Is required"),
    password:yup.string().required("Password is Required"),
    confirm_password:yup.string().oneOf([yup.ref("password")]).required('This field is required')
})

export const loginValidation = yup?.object({
    email:yup.string().email("Email is Invalid").required("Email Is required"),
    password:yup.string().required("Password is Required"),
})