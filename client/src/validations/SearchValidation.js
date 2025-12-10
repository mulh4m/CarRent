import * as yup from 'yup';

export const SearchValidation = yup.object().shape({
    pickupLocation:yup.string().required('Enter pickup location'),
    pickupDate:yup.string().required('please enter pickup date'),
    pickupTime:yup.string().required('please enter pickup time'),
    returnDate:yup.string().required('please enter return date'),
    returnTime:yup.string().required('please enter return time'),
    selectedAge:yup.string().required('Select your age').notOneOf(['Age'], "Select your age"),
    selectedRegion:yup.string().required('Select your region').notOneOf(['Region'], "Select your region"),
});