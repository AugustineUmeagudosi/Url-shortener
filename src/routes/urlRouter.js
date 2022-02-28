import { Router } from 'express';
import { validateData } from '../middlewares/validate';
import * as urlValidator from '../utils/validate/schema/url';
import * as UrlController from '../controllers/urls';
import * as UrlMiddleware from '../middlewares/url';

const router = Router();

// create short link
router.post(
    '/encode',
    validateData(urlValidator.validateUrl),
    UrlController.createShortLink,
);

// decode a short url
router.get( 
    '/decode',
    UrlMiddleware.checkIfShortUrlExists,
    UrlController.decode
);

export default router;