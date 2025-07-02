import express from 'express';
import authenticationToken from '../../middleware/auth/authenticationToken.middleware';
import createOrder from '../../service/impl/order/createOrder/createOrder.impl';
import globalValidator from '../../utils/globalValidator';
import { orderValidationSchema } from '../../utils/validator';
const router = express.Router();
router.post('/create-order', authenticationToken, globalValidator(orderValidationSchema), createOrder);
export default router;