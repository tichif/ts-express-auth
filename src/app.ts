import express from 'express';
require('dotenv').config();
import config from 'config';

import connectDB from './utils/connectDB';
import log from './utils/logger';
import router from './routes';

const app = express();

const PORT = config.get('port');

// middleware
app.use(express.json());

// routes
app.use(router);

app.listen(PORT, () => {
  connectDB();
  log.info(`App is running on port ${PORT}...`);
});
