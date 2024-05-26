export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  DB_HOST: process.env.DB_HOST,
  // host: process.env.DB_HOST,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
});
