import * as yup from 'yup';

export const PaymentValidation = yup.object().shape({
    cardNumber:yup.string().min(16,"Card number should be 16 Numbers").required('Enter your Card number'),
    ExpiredDate:yup.string().min(7,"Date should be in this form (MM/YYYY)").required('Enter your Expired Date'),
    CVV:yup.string().min(3,"CVV must be 3 numbers").required('Enter your CVV correctly')
});