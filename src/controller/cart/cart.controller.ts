import express from 'express';
import authenticationToken from '../../middleware/auth/authenticationToken.middleware';
import addProductToCart from '../../service/impl/cart/addProductToCart/addProductToCart.model';
import globalValidator from '../../utils/globalValidator';
import { cartValidationSchema } from '../../utils/validator';
const router = express.Router();
router.post('/add-product-to-cart', authenticationToken, globalValidator(cartValidationSchema),addProductToCart);
export default router;