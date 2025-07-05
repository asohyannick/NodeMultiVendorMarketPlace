import express from 'express';
import authenticationToken from '../../middleware/auth/authenticationToken.middleware';
import globalValidator from '../../utils/globalValidator';
import createContact from '../../service/impl/contact/createContact/createContact.impl';
import { contactValidationSchema } from '../../utils/validator';
const router = express.Router();
router.post('/create-contact', authenticationToken, globalValidator(contactValidationSchema), createContact);
export default router;