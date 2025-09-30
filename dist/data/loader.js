"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountriesData = getCountriesData;
exports.getStatesData = getStatesData;
exports.getCitiesData = getCitiesData;
exports.clearCache = clearCache;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
let countriesCache = null;
let statesCache = null;
let citiesCache = null;
const dataPath = path.join(__dirname, '../../public/data');
function getCountriesData() {
    if (!countriesCache) {
        const filePath = path.join(dataPath, 'countries.json');
        const data = fs.readFileSync(filePath, 'utf-8');
        countriesCache = JSON.parse(data);
    }
    return countriesCache;
}
function getStatesData() {
    if (!statesCache) {
        const filePath = path.join(dataPath, 'states.json');
        const data = fs.readFileSync(filePath, 'utf-8');
        statesCache = JSON.parse(data);
    }
    return statesCache;
}
function getCitiesData() {
    if (!citiesCache) {
        const filePath = path.join(dataPath, 'cities.json');
        const data = fs.readFileSync(filePath, 'utf-8');
        citiesCache = JSON.parse(data);
    }
    return citiesCache;
}
function clearCache() {
    countriesCache = null;
    statesCache = null;
    citiesCache = null;
}
//# sourceMappingURL=loader.js.map