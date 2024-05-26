import emailConfig from './emailConfig';
import { validationSchema } from './validationSchema';

export const envConfig = {
  envFilePath: ['.env.development'],
  isGlobal: true,
  load: [emailConfig],
  validationSchema,
};
