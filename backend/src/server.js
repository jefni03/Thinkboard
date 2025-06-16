import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';
dotenv.config();



const app = express();
const PORT = process.env.PORT || 5001;





app.use(express.json()); // Middleware to parse JSON bodies
app.use(rateLimiter)
app.use(cors({origin: 'http://localhost:5173'}));
// simple custome middleware
// app.use((req, res, next) => {
//     console.log("We just got a request!");
//     next();
// });

app.use('/api/notes', notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server is running on', PORT)});
});
