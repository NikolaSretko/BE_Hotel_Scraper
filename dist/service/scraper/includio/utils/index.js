"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
const processData_1 = require("./processData");
const urlConstrucor_1 = require("./urlConstrucor");
exports.utils = {
    generateUrl: urlConstrucor_1.generateUrl,
    processScrapedData: processData_1.processScrapedData
};
