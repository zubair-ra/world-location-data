import { State, SearchOptions, CoordinateOptions } from './types';
import { getStatesData } from './data/loader';
import { calculateDistance } from './utils/distance';

export function getAllStates(): State[] {
  return getStatesData();
}

export function getStateById(id: number): State | undefined {
  return getStatesData().find(state => state.id === id);
}

export function getStateByCode(code: string, countryCode?: string): State | undefined {
  const upperCode = code.toUpperCase();
  const states = getStatesData();

  if (countryCode) {
    return states.find(
      state =>
        (state.iso2 === upperCode || state.iso3166_2 === upperCode) &&
        state.country_code === countryCode.toUpperCase()
    );
  }

  return states.find(state => state.iso2 === upperCode || state.iso3166_2 === upperCode);
}

export function getStatesByCountryId(countryId: number): State[] {
  return getStatesData().filter(state => state.country_id === countryId);
}

export function getStatesByCountryCode(countryCode: string): State[] {
  return getStatesData().filter(
    state => state.country_code === countryCode.toUpperCase()
  );
}

export function searchStates(options: SearchOptions, countryId?: number): State[] {
  const { query, limit, caseSensitive = false } = options;
  let states = getStatesData();

  if (countryId) {
    states = states.filter(state => state.country_id === countryId);
  }

  const searchQuery = caseSensitive ? query : query.toLowerCase();

  const results = states.filter(state => {
    const name = caseSensitive ? state.name : state.name.toLowerCase();
    const native = caseSensitive ? state.native : state.native.toLowerCase();

    return (
      name.includes(searchQuery) ||
      native.includes(searchQuery) ||
      state.iso2.toLowerCase().includes(searchQuery)
    );
  });

  return limit ? results.slice(0, limit) : results;
}

export function getStatesNearCoordinates(
  options: CoordinateOptions,
  countryId?: number
): State[] {
  const { latitude, longitude, radius = 100 } = options;
  let states = getStatesData();

  if (countryId) {
    states = states.filter(state => state.country_id === countryId);
  }

  return states.filter(state => {
    const stateLat = parseFloat(state.latitude);
    const stateLon = parseFloat(state.longitude);
    const distance = calculateDistance(latitude, longitude, stateLat, stateLon);
    return distance <= radius;
  });
}

export function getStatesByType(type: string, countryId?: number): State[] {
  let states = getStatesData();

  if (countryId) {
    states = states.filter(state => state.country_id === countryId);
  }

  return states.filter(state => state.type.toLowerCase() === type.toLowerCase());
}
