import express from 'express';
import authenticationToken from '../../middleware/auth/authenticationToken.middleware';
import globalValidator from '../../utils/globalValidator';
import createContact from '../../service/impl/contact/createContact/createContact.impl';
import { contactValidationSchema, updateContactValidationSchema } from '../../utils/validator';
import showContacts from '../../service/impl/contact/showContacts/showContacts.impl';
import showContact from '../../service/impl/contact/showContact/showContact.impl';
import updateContact from '../../service/impl/contact/updateContact/updateContact.impl';
const router = express.Router();
router.post('/create-contact', authenticationToken, globalValidator(contactValidationSchema), createContact);
router.get('/show-contacts', authenticationToken, showContacts);
router.get('/show-contact/:id', authenticationToken, showContact);
router.put('/update-contact/:id', authenticationToken, globalValidator(updateContactValidationSchema), updateContact);

export default router;