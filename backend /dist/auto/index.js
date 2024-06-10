"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const includio_1 = __importDefault(require("./regensburg/includio"));
const autoScrape = {
    regensburg: {
        includio: includio_1.default
    },
    stuttgart: {}
};
exports.default = autoScrape;
