import express from 'express';
import authenticationToken from '../../middleware/auth/authenticationToken.middleware';
import globalValidator from '../../utils/globalValidator';
import { notificationValidationSchema } from '../../utils/validator';
import createNotification from '../../service/impl/notification/createNotification/createNotification.impl';
const router = express.Router();
router.post('/create-notification', authenticationToken, globalValidator(notificationValidationSchema), createNotification);
export default router;