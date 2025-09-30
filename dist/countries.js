"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCountries = getAllCountries;
exports.getCountryById = getCountryById;
exports.getCountryByCode = getCountryByCode;
exports.getCountryByName = getCountryByName;
exports.searchCountries = searchCountries;
exports.filterCountries = filterCountries;
exports.getCountriesByRegion = getCountriesByRegion;
exports.getCountriesBySubregion = getCountriesBySubregion;
exports.getCountriesByCurrency = getCountriesByCurrency;
exports.getCountryByPhoneCode = getCountryByPhoneCode;
exports.getCountriesNearCoordinates = getCountriesNearCoordinates;
exports.getAllRegions = getAllRegions;
exports.getAllSubregions = getAllSubregions;
exports.getAllCurrencies = getAllCurrencies;
const loader_1 = require("./data/loader");
const distance_1 = require("./utils/distance");
function getAllCountries() {
    return (0, loader_1.getCountriesData)();
}
function getCountryById(id) {
    return (0, loader_1.getCountriesData)().find(country => country.id === id);
}
function getCountryByCode(code) {
    const upperCode = code.toUpperCase();
    return (0, loader_1.getCountriesData)().find(country => country.iso2 === upperCode || country.iso3 === upperCode);
}
function getCountryByName(name, exact = false) {
    const countries = (0, loader_1.getCountriesData)();
    if (exact) {
        return countries.find(country => country.name === name);
    }
    const lowerName = name.toLowerCase();
    return countries.find(country => country.name.toLowerCase() === lowerName);
}
function searchCountries(options) {
    const { query, limit, caseSensitive = false } = options;
    const countries = (0, loader_1.getCountriesData)();
    const searchQuery = caseSensitive ? query : query.toLowerCase();
    const results = countries.filter(country => {
        const name = caseSensitive ? country.name : country.name.toLowerCase();
        const native = caseSensitive ? country.native : country.native.toLowerCase();
        const capital = caseSensitive ? country.capital : country.capital.toLowerCase();
        return (name.includes(searchQuery) ||
            native.includes(searchQuery) ||
            capital.includes(searchQuery) ||
            country.iso2.toLowerCase().includes(searchQuery) ||
            country.iso3.toLowerCase().includes(searchQuery));
    });
    return limit ? results.slice(0, limit) : results;
}
function filterCountries(filters) {
    let countries = (0, loader_1.getCountriesData)();
    if (filters.region) {
        countries = countries.filter(country => country.region.toLowerCase() === filters.region.toLowerCase());
    }
    if (filters.subregion) {
        countries = countries.filter(country => country.subregion.toLowerCase() === filters.subregion.toLowerCase());
    }
    if (filters.currency) {
        countries = countries.filter(country => country.currency.toLowerCase() === filters.currency.toLowerCase());
    }
    if (filters.phonecode) {
        countries = countries.filter(country => country.phonecode === filters.phonecode);
    }
    if (filters.timezone) {
        countries = countries.filter(country => country.timezones.some(tz => tz.zoneName === filters.timezone));
    }
    return countries;
}
function getCountriesByRegion(region) {
    return (0, loader_1.getCountriesData)().filter(country => country.region.toLowerCase() === region.toLowerCase());
}
function getCountriesBySubregion(subregion) {
    return (0, loader_1.getCountriesData)().filter(country => country.subregion.toLowerCase() === subregion.toLowerCase());
}
function getCountriesByCurrency(currency) {
    return (0, loader_1.getCountriesData)().filter(country => country.currency.toLowerCase() === currency.toLowerCase());
}
function getCountryByPhoneCode(phonecode) {
    return (0, loader_1.getCountriesData)().filter(country => country.phonecode === phonecode);
}
function getCountriesNearCoordinates(options) {
    const { latitude, longitude, radius = 500 } = options;
    const countries = (0, loader_1.getCountriesData)();
    return countries.filter(country => {
        const countryLat = parseFloat(country.latitude);
        const countryLon = parseFloat(country.longitude);
        const distance = (0, distance_1.calculateDistance)(latitude, longitude, countryLat, countryLon);
        return distance <= radius;
    });
}
function getAllRegions() {
    const regions = new Set((0, loader_1.getCountriesData)().map(country => country.region));
    return Array.from(regions).sort();
}
function getAllSubregions() {
    const subregions = new Set((0, loader_1.getCountriesData)().map(country => country.subregion));
    return Array.from(subregions).sort();
}
function getAllCurrencies() {
    const currenciesMap = new Map();
    (0, loader_1.getCountriesData)().forEach(country => {
        if (!currenciesMap.has(country.currency)) {
            currenciesMap.set(country.currency, {
                code: country.currency,
                name: country.currency_name,
                symbol: country.currency_symbol,
            });
        }
    });
    return Array.from(currenciesMap.values()).sort((a, b) => a.code.localeCompare(b.code));
}
//# sourceMappingURL=countries.js.map