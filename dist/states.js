"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStates = getAllStates;
exports.getStateById = getStateById;
exports.getStateByCode = getStateByCode;
exports.getStatesByCountryId = getStatesByCountryId;
exports.getStatesByCountryCode = getStatesByCountryCode;
exports.searchStates = searchStates;
exports.getStatesNearCoordinates = getStatesNearCoordinates;
exports.getStatesByType = getStatesByType;
const loader_1 = require("./data/loader");
const distance_1 = require("./utils/distance");
function getAllStates() {
    return (0, loader_1.getStatesData)();
}
function getStateById(id) {
    return (0, loader_1.getStatesData)().find(state => state.id === id);
}
function getStateByCode(code, countryCode) {
    const upperCode = code.toUpperCase();
    const states = (0, loader_1.getStatesData)();
    if (countryCode) {
        return states.find(state => (state.iso2 === upperCode || state.iso3166_2 === upperCode) &&
            state.country_code === countryCode.toUpperCase());
    }
    return states.find(state => state.iso2 === upperCode || state.iso3166_2 === upperCode);
}
function getStatesByCountryId(countryId) {
    return (0, loader_1.getStatesData)().filter(state => state.country_id === countryId);
}
function getStatesByCountryCode(countryCode) {
    return (0, loader_1.getStatesData)().filter(state => state.country_code === countryCode.toUpperCase());
}
function searchStates(options, countryId) {
    const { query, limit, caseSensitive = false } = options;
    let states = (0, loader_1.getStatesData)();
    if (countryId) {
        states = states.filter(state => state.country_id === countryId);
    }
    const searchQuery = caseSensitive ? query : query.toLowerCase();
    const results = states.filter(state => {
        const name = caseSensitive ? state.name : state.name.toLowerCase();
        const native = caseSensitive ? state.native : state.native.toLowerCase();
        return (name.includes(searchQuery) ||
            native.includes(searchQuery) ||
            state.iso2.toLowerCase().includes(searchQuery));
    });
    return limit ? results.slice(0, limit) : results;
}
function getStatesNearCoordinates(options, countryId) {
    const { latitude, longitude, radius = 100 } = options;
    let states = (0, loader_1.getStatesData)();
    if (countryId) {
        states = states.filter(state => state.country_id === countryId);
    }
    return states.filter(state => {
        const stateLat = parseFloat(state.latitude);
        const stateLon = parseFloat(state.longitude);
        const distance = (0, distance_1.calculateDistance)(latitude, longitude, stateLat, stateLon);
        return distance <= radius;
    });
}
function getStatesByType(type, countryId) {
    let states = (0, loader_1.getStatesData)();
    if (countryId) {
        states = states.filter(state => state.country_id === countryId);
    }
    return states.filter(state => state.type.toLowerCase() === type.toLowerCase());
}
//# sourceMappingURL=states.js.map