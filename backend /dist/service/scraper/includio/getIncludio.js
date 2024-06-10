"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIncludio = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const index_1 = require("./utils/index");
/**
 * Scrapes hotel data from a website and returns the details.
 * @returns A promise that resolves to an object containing the hotel details.
 */
exports.getIncludio = {
    scrapeAndReturn: async () => {
        const url = index_1.utils.generateUrl();
        try {
            const browser = await puppeteer_1.default.launch({ headless: true, args: ['--no-sandbox'] });
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: 'networkidle2' });
            const result = await page.evaluate(() => {
                const priceElements = document.querySelectorAll('.grid-item');
                return Array.from(priceElements).map(priceElement => {
                    const element = priceElement;
                    let inseratText = element ? element.innerText : 'Preis nicht gefunden';
                    return {
                        inseratText
                    };
                });
            });
            await browser.close();
            const processedPrices = result.map(item => index_1.utils.processScrapedData(item.inseratText));
            const hotelData = {
                pricePerNight: processedPrices,
                pricePerNightFuture: []
            };
            return hotelData;
        }
        catch (error) {
            const typedError = error;
            console.error('Error during scraping data:', typedError);
            throw new Error('Scraping data failed: ' + typedError.message);
        }
    }
};
