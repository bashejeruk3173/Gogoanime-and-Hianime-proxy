import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes/route';
import { cacheRoutes } from "./utils/cache-routes";

dotenv.config();

const app = express();
const PORT = 4040;

// Allow only gogoanime.me.uk
const allowedOrigin = 'https://gogoanime.me.uk';

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, etc.) or from the allowed domain
        if (!origin || origin === allowedOrigin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cacheRoutes());

app.get("/", (_, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>GIF Display</title>
            <style>
                body, html {
                    height: 100%;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #000;
                }
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            </style>
        </head>
        <body>
            <img src="https://media.disquscdn.com/errors/img/3.gif" alt="Error GIF">
        </body>
        </html>
    `);
});

app.use('/', router);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

export default app;
