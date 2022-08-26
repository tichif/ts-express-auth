import mongoose from 'mongoose';
import config from 'config';

import log from './logger';

mongoose.connection.once('ready', () =>
  console.log('Database connection ready...')
);

mongoose.connection.on('error', (err) => console.log(err));

async function connectDB() {
  const dbUri = config.get<string>('mongoUri');

  try {
    const conn = await mongoose.connect(dbUri);
    log.info(`Database connection: ${conn.connection.host}`);
  } catch (error) {
    process.exit(1);
  }
}

export default connectDB;
