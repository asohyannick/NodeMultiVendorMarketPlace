import express from 'express';
import authenticationToken from '../../middleware/auth/authenticationToken.middleware';
import globalValidator from '../../utils/globalValidator';
import { vendorValidationSchema } from '../../utils/validator';
import createVendor from '../../service/impl/vendor/createVendor/createVendor.impl';
const router = express.Router();
router.post('/create-new-vendor', authenticationToken, globalValidator(vendorValidationSchema), createVendor);
export default router;