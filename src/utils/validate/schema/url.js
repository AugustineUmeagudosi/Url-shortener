import Joi from 'joi';

export const validateUrl = Joi.object().keys({
    longUrl: Joi.string().required(),
});
