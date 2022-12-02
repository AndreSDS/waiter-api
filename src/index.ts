import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';

dotenv.config({ path: __dirname + '/.env' });

const app = express();

if (!process.env.MONGO_CONNECTION_URL) {
  throw new Error('MONGO_CONNECTION_URL is not defined');
} else {
  //mongoose.connect('mongodb://fullstack-app:njR2vP5pYOM5ijdH4FC0styLcg24xHyvbG4f4g1407sDeoWqu3INutMIijTxpA0sY7MlTvhmzewQACDbc3zC7A%3D%3D@fullstack-app.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@fullstack-app@')
  mongoose.connect(process.env.MONGO_CONNECTION_URL, {
    dbName: 'waiter-app',
  }).then(() => {
    console.log('Connected to MongoDB');
    const port = process.env.PORT || 3001;

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    app.listen(3001, () => {
      console.log(`Server started on port http://localhost:${port}`);
    });
  })
    .catch(() => {
      console.log('Error connecting to MongoDB');
    });
}

