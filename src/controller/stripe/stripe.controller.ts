import express from 'express';
import authenticationToken from '../../middleware/auth/authenticationToken.middleware';
import { processStripePayment } from '../../service/impl/stripe/processStripePayment/processStripePayment.impl';
import globalValidator from '../../utils/globalValidator';
import { validateStripePayment, validateUpdatedStripePayment } from '../../utils/validator';
import { showStripePayments } from '../../service/impl/stripe/showStripePayments/showStripePayments.impl';
import { showStripePayment } from '../../service/impl/stripe/showStripePayment/showStripePayment.impl';
import { editAndUpdateStripePayment } from '../../service/impl/stripe/updateStripePayment/updateStripePayment.impl';
const router = express.Router();
router.post('/create-payment', authenticationToken, globalValidator(validateStripePayment), processStripePayment);
router.get('/show-payments', authenticationToken, showStripePayments);
router.get('/show-payment/:id', authenticationToken, showStripePayment);
router.put('/show-payment/:id', authenticationToken, globalValidator(validateUpdatedStripePayment), editAndUpdateStripePayment);

export default router;