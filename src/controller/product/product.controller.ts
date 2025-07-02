import express from 'express';
import authenticationToken from '../../middleware/auth/authenticationToken.middleware';
import createProduct from '../../service/impl/product/createProduct/createProduct.impl';
import globalValidator from '../../utils/globalValidator';
import { productValidationSchema } from '../../utils/validator';
const router = express.Router();
router.post('/create-product', authenticationToken, globalValidator(productValidationSchema), createProduct);
export default router;