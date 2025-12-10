import * as yup from 'yup';

export const UserRegisterSchemaValidation = yup.object().shape({
    email:yup.string().email('Not a Valid Email Format').required('Email is Required'),
    password:yup.string().required('Password is Required').min(4,'Minimum 4 characters required').max(8,'Maximum 8 characters required'),
    uname:yup.string().required('Username is required!'),
    phone:yup.string().required('Phone number is required!').min(8,"Enter your phone number correctly").max(8,"Enter your phone number correctly")
});