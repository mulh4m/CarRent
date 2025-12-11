import * as yup from 'yup';

export const UserRegisterSchemaValidation = yup.object().shape({
    email: yup
        .string()
        .email('Not a Valid Email Format')
        .required('Email is Required'),

    password: yup
        .string()
        .required('Password is Required')
        .min(4, 'Minimum 4 characters required')
        .max(8, 'Maximum 8 characters required'),

    uname: yup
        .string()
        .required('Username is required!'),

    phone: yup
        .string()
        .required('Phone number is required!')
        .matches(/^([97])[0-9]{7}$/, "Phone must start with 9 or 7 "),
});
