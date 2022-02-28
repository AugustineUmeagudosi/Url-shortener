import { Router } from 'express';
import { validateData } from '../middlewares/validate';
import * as urlValidator from '../utils/validate/schema/url';
import * as UrlController from '../controllers/urls';

const router = Router();

// create short link
router.post(
    '/encode',
    validateData(urlValidator.validateUrl),
    UrlController.createShortLink,
);

export default router;