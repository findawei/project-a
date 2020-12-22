const dotenv =require( 'dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  VERIFICATION_TOKEN: process.env.VerificationToken,
  ZOOM_API_KEY: process.env.APIKey,
  ZOOM_API_SECRET: process.env.APISecret
};