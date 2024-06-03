import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import { UserRouter } from './routes/user.js';
const app = express();
import cookieParser from 'cookie-parser';

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use(cookieParser());
app.use('/auth', UserRouter)


const MONGO_URI = process.env.MONGO_URI;


// Connect to MongoDB Atlas
mongoose.connect(MONGO_URI, {
  
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

const PORT = "3000";

app.get('/', (req, res) => {
    res.send("Hello World");
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});