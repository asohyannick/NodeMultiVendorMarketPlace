import * as Yup from 'yup';
import { MaritalStatus } from '../service/interfac/profile/profile.interfac';
const validateUserRegistration = Yup.object().shape({
    firstName: Yup.string().trim().required('firstName must be provided').min(6, 'firstName must be at least 3 characters minimum'),
    lastName: Yup.string().trim().required('lasttName must be provided').min(6, 'lasttName must be at least 3 characters minimum'),
    email: Yup.string().email('Email address must be provided').trim().required('Email address must be provided'),
    password: Yup.string().required('Password must be provided').min(3, "Password must be at least 3 characters minimum"),
    isAdmin: Yup.boolean().required('Admin status must be provided').default(false),
});
const validateUserLogin = Yup.object().shape({
    email: Yup.string().email('Email address must be provided').trim().required('Email address must be provided'),
    password: Yup.string().required('Password must be provided').min(3, "Password must be at least 3 characters minimum"),
});
const validateUpdatedUserRegistration = Yup.object().shape({
    firstName: Yup.string().trim().required('firstName must be provided').min(6, 'firstName must be at least 3 characters minimum'),
    lastName: Yup.string().trim().required('lasttName must be provided').min(6, 'lasttName must be at least 3 characters minimum'),
    email: Yup.string().email('Email address must be provided').trim().required('Email address must be provided'),
    password: Yup.string().required('Password must be provided').min(3, "Password must be at least 3 characters minimum"),
    isAdmin: Yup.boolean().required('Admin status must be provided').default(false),
});
const validateProfileRegistration = Yup.object().shape({
    firstName: Yup.string().trim().required('firstName must be provided').min(6, 'firstName must be at least 3 characters minimum'),
    lastName: Yup.string().trim().required('lasttName must be provided').min(6, 'lasttName must be at least 3 characters minimum'),
    email: Yup.string().email('Email address must be provided').trim().required('Email address must be provided'),
    address: Yup.object().shape({
        street: Yup.string().trim().required('Street name must be provided').trim(),
        phoneNumber: Yup.string().trim().required('Phone number must be provided').trim(),
        city: Yup.string().trim().required('City name must be provided').trim(),
        zipCode: Yup.string().trim().required('Zip code must be provided').trim(),
        state: Yup.string().trim().required('State name must be provided').trim(),
        country: Yup.string().trim().required('Country name must be provided').trim(),
    }),
    carier: Yup.string().trim().required('Carier name must be provided').trim(),
    hobby: Yup.array().required('Hobbies must be provided').of(Yup.string().trim()),
    married: Yup.mixed().required('Marital status must be provided').oneOf(Object.values(MaritalStatus)),
    date: Yup.date().required('The date must be provided'),
});
const validateUpdatedProfileRegistration = Yup.object().shape({
    firstName: Yup.string().trim().required('firstName must be provided').min(6, 'firstName must be at least 3 characters minimum'),
    lastName: Yup.string().trim().required('lasttName must be provided').min(6, 'lasttName must be at least 3 characters minimum'),
    email: Yup.string().email('Email address must be provided').trim().required('Email address must be provided'),
    address: Yup.object().shape({
        street: Yup.string().trim().required('Street name must be provided').trim(),
        phoneNumber: Yup.string().trim().required('Phone number must be provided').trim(),
        city: Yup.string().trim().required('City name must be provided').trim(),
        zipCode: Yup.string().trim().required('Zip code must be provided').trim(),
        state: Yup.string().trim().required('State name must be provided').trim(),
        country: Yup.string().trim().required('Country name must be provided').trim(),
    }),
    carier: Yup.string().trim().required('Carier name must be provided').trim(),
    hobby: Yup.array().required('Hobbies must be provided').of(Yup.string().trim()),
    married: Yup.mixed().required('Marital status must be provided').oneOf(Object.values(MaritalStatus)),
    date: Yup.date().required('The date must be provided'),
});
export {
    validateUserRegistration,
    validateUserLogin,
    validateUpdatedUserRegistration,
    validateProfileRegistration,
    validateUpdatedProfileRegistration
}