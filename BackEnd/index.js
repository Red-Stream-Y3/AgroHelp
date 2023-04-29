import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import findConfig from 'find-config';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import kbRoutes from './routes/kbRoutes.js';

dotenv.config({ path: findConfig('.env.dev') });

connectDB();

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/knowledgebase', kbRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`.yellow.bold);
});
