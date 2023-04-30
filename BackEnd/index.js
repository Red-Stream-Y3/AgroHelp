import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import findConfig from 'find-config';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { visit } from './middleware/visitMiddleware.js';
import { getVisits } from './controllers/visitController.js';
import userRoutes from './routes/userRoutes.js';
import cropRoutes from './routes/cropRoutes.js';
import diseaseRoutes from './routes/diseaseRoutes.js';

dotenv.config({ path: findConfig('.env.dev') });

connectDB();

const app = express();

app.use(express.json());

// Use middleware to increment visitor count
app.use(visit);

app.use('/api', getVisits);
app.use('/api/users', userRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/diseases', diseaseRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`.yellow.bold);
});
