import express from 'express';
import { ScraperController } from '../../controller';

const ScrapeRouter = express
.Router()
.post('/includio', ScraperController.scrapeIncludioCtrl.scrape);

export default ScrapeRouter;