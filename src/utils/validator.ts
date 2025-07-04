import * as Yup from 'yup';
import { MaritalStatus } from '../service/interfac/profile/profile.interfac';
import { Types } from 'mongoose';
import { VendorStatus, VendorTypeStatus } from '../service/interfac/vendor/vendor.interfac';
import { ProductStatus } from '../service/interfac/product/product.interfac';
import { OrderStatus, PaymentCashMethodStatus, PaymentMethodStatus } from '../service/interfac/order/order.interfac';
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
const vendorValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    contact: Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        phone: Yup.string().required('Phone number is required'),
        address: Yup.object().shape({
            street: Yup.string().required('Street is required'),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            country: Yup.string().required('Country is required'),
            zipCode: Yup.string().required('Zip code is required'),
        }).required('Address is required'),
    }).required('Contact information is required'),
    socialMedia: Yup.object().shape({
        facebook: Yup.string().url('Invalid URL').required('Facebook URL is required'),
        twitter: Yup.string().url('Invalid URL').required('Twitter URL is required'),
        instagram: Yup.string().url('Invalid URL').required('Instagram URL is required'),
        linkedin: Yup.string().url('Invalid URL').required('LinkedIn URL is required'),
    }).required('Social media links are required'),
    productId: Yup.mixed<Types.ObjectId>().required('Product ID is required'),
    ratings: Yup.array().of(Yup.object().shape({
        userId: Yup.mixed<Types.ObjectId>().required('User ID is required'),
        score: Yup.string().required('Score is required'),
        comment: Yup.string().optional(),
    })).optional(),
    status: Yup.mixed<VendorStatus>().oneOf(Object.values(VendorStatus)).required('Status is required'),
    lastLogin: Yup.date().optional(),
    verified: Yup.boolean().required('Verification status is required'),
    commissions: Yup.number().min(0, 'Commissions must be a positive number').required('Commissions are required'),
    feedback: Yup.array().of(Yup.object().shape({
        userId: Yup.mixed<Types.ObjectId>().required('User ID is required'),
        feedback: Yup.string().required('Feedback is required'),
    })).optional(),
    documents: Yup.array().of(Yup.object().shape({
        type: Yup.mixed<VendorTypeStatus>().oneOf(Object.values(VendorTypeStatus)).required('Document type is required'),
        url: Yup.string().url('Invalid URL').required('Document URL is required'),
        verified: Yup.boolean().required('Verification status is required'),
    })).optional(),
});

const updateVendorValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    contact: Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        phone: Yup.string().required('Phone number is required'),
        address: Yup.object().shape({
            street: Yup.string().required('Street is required'),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            country: Yup.string().required('Country is required'),
            zipCode: Yup.string().required('Zip code is required'),
        }).required('Address is required'),
    }).required('Contact information is required'),
    socialMedia: Yup.object().shape({
        facebook: Yup.string().url('Invalid URL').required('Facebook URL is required'),
        twitter: Yup.string().url('Invalid URL').required('Twitter URL is required'),
        instagram: Yup.string().url('Invalid URL').required('Instagram URL is required'),
        linkedin: Yup.string().url('Invalid URL').required('LinkedIn URL is required'),
    }).required('Social media links are required'),
    productId: Yup.mixed<Types.ObjectId>().required('Product ID is required'),
    ratings: Yup.array().of(Yup.object().shape({
        userId: Yup.mixed<Types.ObjectId>().required('User ID is required'),
        score: Yup.string().required('Score is required'),
        comment: Yup.string().optional(),
    })).optional(),
    status: Yup.mixed<VendorStatus>().oneOf(Object.values(VendorStatus)).required('Status is required'),
    lastLogin: Yup.date().optional(),
    verified: Yup.boolean().required('Verification status is required'),
    commissions: Yup.number().min(0, 'Commissions must be a positive number').required('Commissions are required'),
    feedback: Yup.array().of(Yup.object().shape({
        userId: Yup.mixed<Types.ObjectId>().required('User ID is required'),
        feedback: Yup.string().required('Feedback is required'),
    })).optional(),
    documents: Yup.array().of(Yup.object().shape({
        type: Yup.mixed<VendorTypeStatus>().oneOf(Object.values(VendorTypeStatus)).required('Document type is required'),
        url: Yup.string().url('Invalid URL').required('Document URL is required'),
        verified: Yup.boolean().required('Verification status is required'),
    })).optional(),
});
const productValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').trim(),
    description: Yup.string().required('Description is required').trim(),
    vendorId: Yup.mixed<Types.ObjectId>().required('Vendor ID is required'),
    categoryId: Yup.mixed<Types.ObjectId>().required('Category ID is required'),
    price: Yup.number().min(0, 'Price must be a positive number').required('Price is required'),
    stockQuantity: Yup.number().min(0, 'Stock quantity must be a non-negative integer').required('Stock quantity is required'),
    images: Yup.array().of(Yup.object().shape({
        url: Yup.string().url('Invalid URL').required('Image URL is required'),
        altText: Yup.string().required('Alt text is required'),
    })).optional(),
    ratings: Yup.array().of(Yup.object().shape({
        userId: Yup.mixed<Types.ObjectId>().required('User ID is required'),
        score: Yup.number().min(1).max(5).required('Score must be between 1 and 5'),
        comment: Yup.string().optional().trim(),
    })).optional(),
    tags: Yup.array().of(Yup.string().trim()).optional(),
    status: Yup.mixed<ProductStatus>().oneOf(Object.values(ProductStatus)).required('Status is required'),
});
const updateProductValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').trim(),
    description: Yup.string().required('Description is required').trim(),
    vendorId: Yup.mixed<Types.ObjectId>().required('Vendor ID is required'),
    categoryId: Yup.mixed<Types.ObjectId>().required('Category ID is required'),
    price: Yup.number().min(0, 'Price must be a positive number').required('Price is required'),
    stockQuantity: Yup.number().min(0, 'Stock quantity must be a non-negative integer').required('Stock quantity is required'),
    images: Yup.array().of(Yup.object().shape({
        url: Yup.string().url('Invalid URL').required('Image URL is required'),
        altText: Yup.string().required('Alt text is required'),
    })).optional(),
    ratings: Yup.array().of(Yup.object().shape({
        userId: Yup.mixed<Types.ObjectId>().required('User ID is required'),
        score: Yup.number().min(1).max(5).required('Score must be between 1 and 5'),
        comment: Yup.string().optional(),
    })).optional(),
    tags: Yup.array().of(Yup.string().trim()).optional(),
    status: Yup.mixed<ProductStatus>().oneOf(Object.values(ProductStatus)).required('Status is required'),
});
const categoryValidationSchema = Yup.object().shape({
    categoryId: Yup.mixed<Types.ObjectId>().required('Category ID is required'),
    productId: Yup.mixed<Types.ObjectId>().required('Product ID is required'),
    name: Yup.string().required('Name is required').trim(),
    description: Yup.string().required('Description is required').trim(),
    image: Yup.object().shape({
        url: Yup.string().url('Invalid URL').required('Image URL is required').trim(),
        altText: Yup.string().required('Alt text is required').trim(),
    }).required('Image information is required'),
    isActive: Yup.boolean().required('Active status is required').default(false),
});
const updateCategoryValidationSchema = Yup.object().shape({
    categoryId: Yup.mixed<Types.ObjectId>().required('Category ID is required'),
    productId: Yup.mixed<Types.ObjectId>().required('Product ID is required'),
    name: Yup.string().required('Name is required').trim(),
    description: Yup.string().required('Description is required').trim(),
    image: Yup.object().shape({
        url: Yup.string().url('Invalid URL').required('Image URL is required').trim(),
        altText: Yup.string().required('Alt text is required').trim(),
    }).required('Image information is required'),
    isActive: Yup.boolean().required('Active status is required').default(false),
});
const orderValidationSchema = Yup.object().shape({
    user: Yup.mixed<Types.ObjectId>().required('User ID is required'),
    vendor: Yup.mixed<Types.ObjectId>().required('Vendor ID is required'),
    products: Yup.array().of(Yup.object().shape({
        product: Yup.mixed<Types.ObjectId>().required('Product ID is required'),
        stockQuantity: Yup.number().min(1, 'Stock quantity must be at least 1').required('Stock quantity is required'),
        price: Yup.number().min(0, 'Price must be a positive number').required('Price is required'),
    })).required('At least one product is required'),
    shippingAddress: Yup.object().shape({
        name: Yup.string().required('Name is required'),
        street: Yup.string().required('Street is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        country: Yup.string().required('Country is required'),
        zipCode: Yup.string().required('Zip code is required'),
    }).required('Shipping address is required'),
    payment: Yup.object().shape({
        method: Yup.object().shape({
            type: Yup.mixed<PaymentCashMethodStatus>().oneOf(Object.values(PaymentCashMethodStatus)).required('Payment method is required'),
        }).required('Payment method is required'),
        status: Yup.mixed<PaymentMethodStatus>().oneOf(Object.values(PaymentMethodStatus)).required('Payment status is required'),
        transactionId: Yup.string().required('Transaction ID is required'),
    }).required('Payment information is required'),
    status: Yup.mixed<OrderStatus>().oneOf(Object.values(OrderStatus)).required('Order status is required'),
    totalAmount: Yup.number().min(0, 'Total amount must be a positive number').required('Total amount is required'),
});
const updateOrderValidationSchema = Yup.object().shape({
    user: Yup.mixed<Types.ObjectId>().required('User ID is required'),
    vendor: Yup.mixed<Types.ObjectId>().required('Vendor ID is required'),
    products: Yup.array().of(Yup.object().shape({
        product: Yup.mixed<Types.ObjectId>().required('Product ID is required'),
        stockQuantity: Yup.number().min(1, 'Stock quantity must be at least 1').required('Stock quantity is required'),
        price: Yup.number().min(0, 'Price must be a positive number').required('Price is required'),
    })).required('At least one product is required'),
    shippingAddress: Yup.object().shape({
        name: Yup.string().required('Name is required'),
        street: Yup.string().required('Street is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        country: Yup.string().required('Country is required'),
        zipCode: Yup.string().required('Zip code is required'),
    }).required('Shipping address is required'),
    payment: Yup.object().shape({
        method: Yup.object().shape({
            type: Yup.mixed<PaymentCashMethodStatus>().oneOf(Object.values(PaymentCashMethodStatus)).required('Payment method is required'),
        }).required('Payment method is required'),
        status: Yup.mixed<PaymentMethodStatus>().oneOf(Object.values(PaymentMethodStatus)).required('Payment status is required'),
        transactionId: Yup.string().required('Transaction ID is required'),
    }).required('Payment information is required'),
    status: Yup.mixed<OrderStatus>().oneOf(Object.values(OrderStatus)).required('Order status is required'),
    totalAmount: Yup.number().min(0, 'Total amount must be a positive number').required('Total amount is required'),
});
const cartValidationSchema = Yup.object().shape({
    userId: Yup.mixed<Types.ObjectId>().required('User ID is required'),
    items: Yup.array().of(Yup.object().shape({
        productId: Yup.mixed<Types.ObjectId>().required('Product ID is required'),
        quantity: Yup.number().min(1, 'Quantity must be at least 1').required('Quantity is required'),
    })).required('At least one item is required in the cart'),
});
const updateCartValidationSchema = Yup.object().shape({
    userId: Yup.mixed<Types.ObjectId>().required('User ID is required'),
    items: Yup.array().of(Yup.object().shape({
        productId: Yup.mixed<Types.ObjectId>().required('Product ID is required'),
        quantity: Yup.number().min(1, 'Quantity must be at least 1').required('Quantity is required'),
    })).required('At least one item is required in the cart'),
});
export {
    validateUserRegistration,
    validateUserLogin,
    validateUpdatedUserRegistration,
    validateProfileRegistration,
    validateUpdatedProfileRegistration,
    vendorValidationSchema,
    updateVendorValidationSchema,
    productValidationSchema,
    updateProductValidationSchema,
    categoryValidationSchema,
    updateCategoryValidationSchema,
    orderValidationSchema,
    updateOrderValidationSchema,
    cartValidationSchema,
    updateCartValidationSchema
}