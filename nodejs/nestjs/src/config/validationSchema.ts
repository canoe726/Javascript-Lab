import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'stage')
    .default('development'),
  PORT: Joi.number().port().default(3000),
  GMAIL_USER: Joi.string().required(),
  GMAIL_PASS: Joi.string().required(),
});
