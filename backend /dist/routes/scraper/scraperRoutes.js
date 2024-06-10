"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../../controller");
const ScrapeRouter = express_1.default
    .Router()
    .post('/includio', controller_1.ScraperController.scrapeIncludioCtrl.scrape);
exports.default = ScrapeRouter;
