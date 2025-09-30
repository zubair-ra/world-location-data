import { City, SearchOptions, CoordinateOptions } from './types';
import { getCitiesData } from './data/loader';
import { calculateDistance } from './utils/distance';

export function getAllCities(): City[] {
  return getCitiesData();
}

export function getCityById(id: number): City | undefined {
  return getCitiesData().find(city => city.id === id);
}

export function getCitiesByCountryId(countryId: number): City[] {
  return getCitiesData().filter(city => city.country_id === countryId);
}

export function getCitiesByCountryCode(countryCode: string): City[] {
  return getCitiesData().filter(
    city => city.country_code === countryCode.toUpperCase()
  );
}

export function getCitiesByStateId(stateId: number): City[] {
  return getCitiesData().filter(city => city.state_id === stateId);
}

export function getCitiesByStateCode(stateCode: string, countryCode?: string): City[] {
  const upperStateCode = stateCode.toUpperCase();
  let cities = getCitiesData().filter(city => city.state_code === upperStateCode);

  if (countryCode) {
    cities = cities.filter(city => city.country_code === countryCode.toUpperCase());
  }

  return cities;
}

export function searchCities(
  options: SearchOptions,
  countryId?: number,
  stateId?: number
): City[] {
  const { query, limit, caseSensitive = false } = options;
  let cities = getCitiesData();

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

export function getCitiesNearCoordinates(
  options: CoordinateOptions,
  countryId?: number,
  stateId?: number
): City[] {
  const { latitude, longitude, radius = 50 } = options;
  let cities = getCitiesData();

  if (countryId) {
    cities = cities.filter(city => city.country_id === countryId);
  }

  if (stateId) {
    cities = cities.filter(city => city.state_id === stateId);
  }

  return cities.filter(city => {
    const cityLat = parseFloat(city.latitude);
    const cityLon = parseFloat(city.longitude);
    const distance = calculateDistance(latitude, longitude, cityLat, cityLon);
    return distance <= radius;
  });
}

export function getCityByName(
  name: string,
  countryCode?: string,
  stateCode?: string
): City | undefined {
  let cities = getCitiesData();

  if (countryCode) {
    cities = cities.filter(city => city.country_code === countryCode.toUpperCase());
  }

  if (stateCode) {
    cities = cities.filter(city => city.state_code === stateCode.toUpperCase());
  }

  return cities.find(city => city.name.toLowerCase() === name.toLowerCase());
}
