export default {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  logLevel: 'info',
  smtp: {
    user: 'qodkv4zqrb5xqjkj@ethereal.email',
    pass: 's2SNrzSkznq7vDHcaq',
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
  },
  accessTokenPrivateKey: '',
  refreshTokenPrivateKey: '',
};
