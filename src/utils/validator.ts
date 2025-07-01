import * as Yup from 'yup';
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

export {
    validateUserRegistration,
    validateUserLogin,
    validateUpdatedUserRegistration
}