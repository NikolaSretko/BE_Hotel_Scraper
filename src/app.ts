import express from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import morgan from 'morgan';
import dotenv from 'dotenv';
import ScrapeRouter from './routes/scraper/scraperRoutes';
import autoScrape from './auto/index';

dotenv.config();

const app = express();

// Middleware konfigurieren
app.use(cors());
app.use(cookieSession({
    name: 'session',
    keys: [process.env.SESSION_KEY || 'default_key'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(morgan('dev'));
app.use(express.json());

// Automatischdes Scrapen
autoScrape.regensburg.includio();

// Routen definieren
app.use('/api/scrape', ScrapeRouter);


export { app };