import * as Joi from 'joi';

export const validationSchema = Joi.object({
  GMAIL_USER: Joi.string().required(),
  GMAIL_PASS: Joi.string().required(),
});
