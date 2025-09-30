"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCities = getAllCities;
exports.getCityById = getCityById;
exports.getCitiesByCountryId = getCitiesByCountryId;
exports.getCitiesByCountryCode = getCitiesByCountryCode;
exports.getCitiesByStateId = getCitiesByStateId;
exports.getCitiesByStateCode = getCitiesByStateCode;
exports.searchCities = searchCities;
exports.getCitiesNearCoordinates = getCitiesNearCoordinates;
exports.getCityByName = getCityByName;
const loader_1 = require("./data/loader");
const distance_1 = require("./utils/distance");
function getAllCities() {
    return (0, loader_1.getCitiesData)();
}
function getCityById(id) {
    return (0, loader_1.getCitiesData)().find(city => city.id === id);
}
function getCitiesByCountryId(countryId) {
    return (0, loader_1.getCitiesData)().filter(city => city.country_id === countryId);
}
function getCitiesByCountryCode(countryCode) {
    return (0, loader_1.getCitiesData)().filter(city => city.country_code === countryCode.toUpperCase());
}
function getCitiesByStateId(stateId) {
    return (0, loader_1.getCitiesData)().filter(city => city.state_id === stateId);
}
function getCitiesByStateCode(stateCode, countryCode) {
    const upperStateCode = stateCode.toUpperCase();
    let cities = (0, loader_1.getCitiesData)().filter(city => city.state_code === upperStateCode);
    if (countryCode) {
        cities = cities.filter(city => city.country_code === countryCode.toUpperCase());
    }
    return cities;
}
function searchCities(options, countryId, stateId) {
    const { query, limit, caseSensitive = false } = options;
    let cities = (0, loader_1.getCitiesData)();
    if (countryId) {
        cities = cities.filter(city => city.country_id === countryId);
    }
    if (stateId) {
        cities = cities.filter(city => city.state_id === stateId);
    }
    const searchQuery = caseSensitive ? query : query.toLowerCase();
    const results = cities.filter(city => {
        const name = caseSensitive ? city.name : city.name.toLowerCase();
        return name.includes(searchQuery);
    });
    return limit ? results.slice(0, limit) : results;
}
function getCitiesNearCoordinates(options, countryId, stateId) {
    const { latitude, longitude, radius = 50 } = options;
    let cities = (0, loader_1.getCitiesData)();
    if (countryId) {
        cities = cities.filter(city => city.country_id === countryId);
    }
    if (stateId) {
        cities = cities.filter(city => city.state_id === stateId);
    }
    return cities.filter(city => {
        const cityLat = parseFloat(city.latitude);
        const cityLon = parseFloat(city.longitude);
        const distance = (0, distance_1.calculateDistance)(latitude, longitude, cityLat, cityLon);
        return distance <= radius;
    });
}
function getCityByName(name, countryCode, stateCode) {
    let cities = (0, loader_1.getCitiesData)();
    if (countryCode) {
        cities = cities.filter(city => city.country_code === countryCode.toUpperCase());
    }
    if (stateCode) {
        cities = cities.filter(city => city.state_code === stateCode.toUpperCase());
    }
    return cities.find(city => city.name.toLowerCase() === name.toLowerCase());
}
//# sourceMappingURL=cities.js.map