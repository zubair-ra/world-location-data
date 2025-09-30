import { Country, FilterOptions, SearchOptions, CoordinateOptions } from './types';
import { getCountriesData } from './data/loader';
import { calculateDistance } from './utils/distance';

export function getAllCountries(): Country[] {
  return getCountriesData();
}

export function getCountryById(id: number): Country | undefined {
  return getCountriesData().find(country => country.id === id);
}

export function getCountryByCode(code: string): Country | undefined {
  const upperCode = code.toUpperCase();
  return getCountriesData().find(
    country => country.iso2 === upperCode || country.iso3 === upperCode
  );
}

export function getCountryByName(name: string, exact: boolean = false): Country | undefined {
  const countries = getCountriesData();
  if (exact) {
    return countries.find(country => country.name === name);
  }
  const lowerName = name.toLowerCase();
  return countries.find(country => country.name.toLowerCase() === lowerName);
}

export function searchCountries(options: SearchOptions): Country[] {
  const { query, limit, caseSensitive = false } = options;
  const countries = getCountriesData();
  const searchQuery = caseSensitive ? query : query.toLowerCase();

  const results = countries.filter(country => {
    const name = caseSensitive ? country.name : country.name.toLowerCase();
    const native = caseSensitive ? country.native : country.native.toLowerCase();
    const capital = caseSensitive ? country.capital : country.capital.toLowerCase();

    return (
      name.includes(searchQuery) ||
      native.includes(searchQuery) ||
      capital.includes(searchQuery) ||
      country.iso2.toLowerCase().includes(searchQuery) ||
      country.iso3.toLowerCase().includes(searchQuery)
    );
  });

  return limit ? results.slice(0, limit) : results;
}

export function filterCountries(filters: FilterOptions): Country[] {
  let countries = getCountriesData();

  if (filters.region) {
    countries = countries.filter(
      country => country.region.toLowerCase() === filters.region!.toLowerCase()
    );
  }

  if (filters.subregion) {
    countries = countries.filter(
      country => country.subregion.toLowerCase() === filters.subregion!.toLowerCase()
    );
  }

  if (filters.currency) {
    countries = countries.filter(
      country => country.currency.toLowerCase() === filters.currency!.toLowerCase()
    );
  }

  if (filters.phonecode) {
    countries = countries.filter(country => country.phonecode === filters.phonecode);
  }

  if (filters.timezone) {
    countries = countries.filter(country =>
      country.timezones.some(tz => tz.zoneName === filters.timezone)
    );
  }

  return countries;
}

export function getCountriesByRegion(region: string): Country[] {
  return getCountriesData().filter(
    country => country.region.toLowerCase() === region.toLowerCase()
  );
}

export function getCountriesBySubregion(subregion: string): Country[] {
  return getCountriesData().filter(
    country => country.subregion.toLowerCase() === subregion.toLowerCase()
  );
}

export function getCountriesByCurrency(currency: string): Country[] {
  return getCountriesData().filter(
    country => country.currency.toLowerCase() === currency.toLowerCase()
  );
}

export function getCountryByPhoneCode(phonecode: string): Country[] {
  return getCountriesData().filter(country => country.phonecode === phonecode);
}

export function getCountriesNearCoordinates(options: CoordinateOptions): Country[] {
  const { latitude, longitude, radius = 500 } = options;
  const countries = getCountriesData();

  return countries.filter(country => {
    const countryLat = parseFloat(country.latitude);
    const countryLon = parseFloat(country.longitude);
    const distance = calculateDistance(latitude, longitude, countryLat, countryLon);
    return distance <= radius;
  });
}

export function getAllRegions(): string[] {
  const regions = new Set(getCountriesData().map(country => country.region));
  return Array.from(regions).sort();
}

export function getAllSubregions(): string[] {
  const subregions = new Set(getCountriesData().map(country => country.subregion));
  return Array.from(subregions).sort();
}

export function getAllCurrencies(): Array<{ code: string; name: string; symbol: string }> {
  const currenciesMap = new Map<string, { code: string; name: string; symbol: string }>();

  getCountriesData().forEach(country => {
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
