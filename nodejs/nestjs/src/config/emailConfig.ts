import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  baseUrl: 'http://localhost:3000',
}));
