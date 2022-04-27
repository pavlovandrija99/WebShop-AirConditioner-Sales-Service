import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './config/database.js'
import airConditionerTypeRoutes from './routes/airConditionerTypeRoutes.js'
import airConditionerRoutes from './routes/airConditionerRoutes.js'
import { notFound ,errorHandler } from './middleware/errorMiddleware.js'

dotenv.config();

connectDatabase();

const app = express();

app.use(express.json())

app.use('/api/airConditionerTypes', airConditionerTypeRoutes);
app.use('/api/airConditioners', airConditionerRoutes);

app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Backend is running...');
});

app.listen(process.env.PORT || 5000, console.log(`Server running on port ${process.env.PORT}`));