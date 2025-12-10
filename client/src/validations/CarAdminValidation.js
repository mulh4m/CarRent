import * as yup from 'yup';

export const CarAdminValidation = yup.object().shape({
    carName:yup.string().required('Enter Car Name'),
    carPrice:yup.string().required('Enter Car Price'),
    carImg:yup.string().required('Place an URL image'),
    carDoor:yup.string().required('Choose the number of doors on the car'),
    carPass:yup.string().required('Choose the number of passengers in the car'),
    transmission:yup.string().required('Choose the transmission type of the car'),
});