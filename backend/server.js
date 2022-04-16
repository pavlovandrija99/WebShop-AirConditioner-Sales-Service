import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './config/database.js'

dotenv.config();

connectDatabase();

const app = express();

app.get('/', (req, res) => {
    res.send('Backend is running...');
});

app.listen(process.env.PORT || 5000, console.log(`Server running on port ${process.env.PORT}`));