import express from 'express';
require('dotenv').config();
import config from 'config';

import connectDB from './utils/connectDB';
import log from './utils/logger';

const app = express();

const PORT = config.get('port');

app.listen(PORT, () => {
  connectDB();
  log.info(`App is running on port ${PORT}...`);
});
