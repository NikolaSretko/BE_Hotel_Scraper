"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScraperService = void 0;
const getIncludio_1 = require("./scraper/includio/getIncludio");
const postIncludio_1 = require("./scraper/includio/postIncludio");
exports.ScraperService = {
    getIncludio: getIncludio_1.getIncludio,
    postIncludio: postIncludio_1.postIncludio
};
