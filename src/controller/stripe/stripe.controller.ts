import express from 'express';
import authenticationToken from '../../middleware/auth/authenticationToken.middleware';
import { processStripePayment } from '../../service/impl/stripe/processStripePayment/processStripePayment.impl';
import globalValidator from '../../utils/globalValidator';
import { validateStripePayment } from '../../utils/validator';
const router = express.Router();
router.post('/create-payment', authenticationToken, globalValidator(validateStripePayment), processStripePayment);
export default router;