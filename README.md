# world-location-data

A comprehensive npm package providing detailed location data for 250+ countries, 5,000+ states/provinces, and 150,000+ cities worldwide. Perfect for building location-based features, dropdowns, search systems, and geographic applications.

## Features

- **250+ Countries** with rich metadata
- **5,000+ States/Provinces** with administrative details
- **150,000+ Cities** - Most comprehensive dataset available
- **Zero Dependencies** - Pure JSON data
- **TypeScript Support** - Full type definitions included
- **Tree-shakeable** - Import only what you need
- **Lazy Loading** - Efficient memory usage with data caching
- **Rich Metadata** including:
  - ISO codes (ISO2, ISO3)
  - Phone codes
  - Currencies with symbols
  - Timezones with GMT offsets
  - Coordinates (latitude/longitude)
  - Translations in 15+ languages
  - Population & GDP data
  - Regions & subregions
  - Native names

## Installation

```bash
npm install world-location-data
```

## Quick Start

```typescript
import {
  getAllCountries,
  getCountryByCode,
  getStatesByCountryCode,
  getCitiesByCountryCode,
} from 'world-location-data';

// Get all countries
const countries = getAllCountries();

// Get a specific country by ISO code
const usa = getCountryByCode('US');
console.log(usa.name); // "United States"
console.log(usa.capital); // "Washington"
console.log(usa.currency); // "USD"

// Get states/provinces for a country
const usStates = getStatesByCountryCode('US');

// Get cities for a country
const usCities = getCitiesByCountryCode('US');
```

## API Reference

### Countries

#### `getAllCountries(): Country[]`
Get all countries with complete metadata.

```typescript
const countries = getAllCountries();
```

#### `getCountryById(id: number): Country | undefined`
Get a country by its numeric ID.

```typescript
const country = getCountryById(231); // United States
```

#### `getCountryByCode(code: string): Country | undefined`
Get a country by ISO2 or ISO3 code.

```typescript
const usa = getCountryByCode('US');
const usaAlt = getCountryByCode('USA');
```

#### `getCountryByName(name: string, exact?: boolean): Country | undefined`
Get a country by name (case-insensitive by default).

```typescript
const country = getCountryByName('United States');
```

#### `searchCountries(options: SearchOptions): Country[]`
Search countries by name, capital, or ISO codes.

```typescript
const results = searchCountries({
  query: 'united',
  limit: 10,
  caseSensitive: false
});
```

#### `filterCountries(filters: FilterOptions): Country[]`
Filter countries by multiple criteria.

```typescript
const europeanCountries = filterCountries({
  region: 'Europe',
  currency: 'EUR'
});
```

#### `getCountriesByRegion(region: string): Country[]`
Get all countries in a specific region.

```typescript
const asianCountries = getCountriesByRegion('Asia');
```

#### `getCountriesBySubregion(subregion: string): Country[]`
Get all countries in a specific subregion.

```typescript
const southeastAsian = getCountriesBySubregion('South-Eastern Asia');
```

#### `getCountriesByCurrency(currency: string): Country[]`
Get all countries using a specific currency.

```typescript
const euroCountries = getCountriesByCurrency('EUR');
```

#### `getCountryByPhoneCode(phonecode: string): Country[]`
Get countries by phone code.

```typescript
const countries = getCountryByPhoneCode('+1');
```

#### `getCountriesNearCoordinates(options: CoordinateOptions): Country[]`
Find countries near specific coordinates.

```typescript
const nearbyCountries = getCountriesNearCoordinates({
  latitude: 40.7128,
  longitude: -74.0060,
  radius: 500 // kilometers
});
```

#### `getAllRegions(): string[]`
Get a list of all unique regions.

```typescript
const regions = getAllRegions();
// ["Africa", "Americas", "Asia", "Europe", "Oceania"]
```

#### `getAllSubregions(): string[]`
Get a list of all unique subregions.

```typescript
const subregions = getAllSubregions();
```

#### `getAllCurrencies(): Array<{code: string, name: string, symbol: string}>`
Get a list of all currencies.

```typescript
const currencies = getAllCurrencies();
```

### States

#### `getAllStates(): State[]`
Get all states/provinces.

```typescript
const states = getAllStates();
```

#### `getStateById(id: number): State | undefined`
Get a state by its numeric ID.

```typescript
const state = getStateById(1416);
```

#### `getStateByCode(code: string, countryCode?: string): State | undefined`
Get a state by ISO code, optionally filtered by country.

```typescript
const california = getStateByCode('CA', 'US');
```

#### `getStatesByCountryId(countryId: number): State[]`
Get all states for a specific country ID.

```typescript
const states = getStatesByCountryId(231);
```

#### `getStatesByCountryCode(countryCode: string): State[]`
Get all states for a specific country code.

```typescript
const usStates = getStatesByCountryCode('US');
```

#### `searchStates(options: SearchOptions, countryId?: number): State[]`
Search states by name.

```typescript
const results = searchStates(
  { query: 'new', limit: 5 },
  231 // USA
);
```

#### `getStatesNearCoordinates(options: CoordinateOptions, countryId?: number): State[]`
Find states near specific coordinates.

```typescript
const nearbyStates = getStatesNearCoordinates({
  latitude: 40.7128,
  longitude: -74.0060,
  radius: 100
}, 231);
```

#### `getStatesByType(type: string, countryId?: number): State[]`
Get states by administrative type (province, state, etc.).

```typescript
const provinces = getStatesByType('province', 38); // Canadian provinces
```

### Cities

#### `getAllCities(): City[]`
Get all cities (150K+ cities - use with caution).

```typescript
const cities = getAllCities();
```

#### `getCityById(id: number): City | undefined`
Get a city by its numeric ID.

```typescript
const city = getCityById(1840);
```

#### `getCitiesByCountryId(countryId: number): City[]`
Get all cities for a specific country ID.

```typescript
const usCities = getCitiesByCountryId(231);
```

#### `getCitiesByCountryCode(countryCode: string): City[]`
Get all cities for a specific country code.

```typescript
const usCities = getCitiesByCountryCode('US');
```

#### `getCitiesByStateId(stateId: number): City[]`
Get all cities for a specific state ID.

```typescript
const californiaCities = getCitiesByStateId(1416);
```

#### `getCitiesByStateCode(stateCode: string, countryCode?: string): City[]`
Get all cities for a specific state code.

```typescript
const californiaCities = getCitiesByStateCode('CA', 'US');
```

#### `searchCities(options: SearchOptions, countryId?: number, stateId?: number): City[]`
Search cities by name.

```typescript
const results = searchCities(
  { query: 'los', limit: 10 },
  231, // USA
  1416  // California
);
```

#### `getCitiesNearCoordinates(options: CoordinateOptions, countryId?: number, stateId?: number): City[]`
Find cities near specific coordinates.

```typescript
const nearbyCities = getCitiesNearCoordinates({
  latitude: 34.0522,
  longitude: -118.2437,
  radius: 50
}, 231, 1416);
```

#### `getCityByName(name: string, countryCode?: string, stateCode?: string): City | undefined`
Get a specific city by name.

```typescript
const la = getCityByName('Los Angeles', 'US', 'CA');
```

### Utilities

#### `calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number`
Calculate distance between two coordinates using the Haversine formula. Returns distance in kilometers.

```typescript
import { calculateDistance } from 'world-location-data';

const distance = calculateDistance(40.7128, -74.0060, 34.0522, -118.2437);
console.log(distance); // Distance in kilometers
```

#### `clearCache(): void`
Clear cached data to free memory.

```typescript
import { clearCache } from 'world-location-data';

clearCache();
```

## TypeScript Types

```typescript
interface Country {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phonecode: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  population: number;
  gdp: number | null;
  region: string;
  region_id: number;
  subregion: string;
  subregion_id: number;
  nationality: string;
  timezones: Timezone[];
  translations: Translations;
  latitude: string;
  longitude: string;
  emoji?: string;
  emojiU?: string;
}

interface State {
  id: number;
  name: string;
  country_id: number;
  country_code: string;
  country_name: string;
  iso2: string;
  iso3166_2: string;
  fips_code: string;
  type: string;
  level: string | null;
  parent_id: number | null;
  native: string;
  latitude: string;
  longitude: string;
  timezone: string;
}

interface City {
  id: number;
  name: string;
  state_id: number;
  state_code: string;
  state_name: string;
  country_id: number;
  country_code: string;
  country_name: string;
  latitude: string;
  longitude: string;
  timezone: string | null;
  wikiDataId: string;
}
```

## Use Cases

### Country Selector Dropdown
```typescript
import { getAllCountries } from 'world-location-data';

const countries = getAllCountries();
const countryOptions = countries.map(c => ({
  value: c.iso2,
  label: c.name,
  flag: c.emoji
}));
```

### Hierarchical Location Picker
```typescript
import {
  getCountryByCode,
  getStatesByCountryCode,
  getCitiesByStateCode
} from 'world-location-data';

// User selects country
const country = getCountryByCode('US');

// Load states for that country
const states = getStatesByCountryCode('US');

// User selects state
const cities = getCitiesByStateCode('CA', 'US');
```

### Phone Number Input with Country Code
```typescript
import { getAllCountries } from 'world-location-data';

const phoneCodeOptions = getAllCountries().map(c => ({
  code: c.phonecode,
  country: c.name,
  flag: c.emoji
}));
```

### Currency Converter
```typescript
import { getAllCurrencies, getCountriesByCurrency } from 'world-location-data';

const currencies = getAllCurrencies();
const euroCountries = getCountriesByCurrency('EUR');
```

### Location-based Search
```typescript
import { getCitiesNearCoordinates } from 'world-location-data';

// Find cities near user's location
navigator.geolocation.getCurrentPosition(position => {
  const nearbyCities = getCitiesNearCoordinates({
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    radius: 50
  });
});
```

## Performance Tips

1. **Lazy Loading**: Data is automatically cached on first access. Only call the functions you need.

2. **Filter Before Loading**: Use specific queries instead of loading all data:
   ```typescript
   // Good
   const californiaCities = getCitiesByStateCode('CA', 'US');

   // Avoid (150K+ cities)
   const allCities = getAllCities();
   ```

3. **Tree Shaking**: Import only what you need:
   ```typescript
   import { getCountryByCode } from 'world-location-data';
   ```

4. **Clear Cache**: Free memory when done with large datasets:
   ```typescript
   import { clearCache } from 'world-location-data';
   clearCache();
   ```

## Data Sources

This package uses data from the [dr5hn/countries-states-cities-database](https://github.com/dr5hn/countries-states-cities-database) repository, which is regularly maintained and updated.

## License

MIT License - see LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Repository

https://github.com/zubair-ra/world-location-data

## Support

For issues, questions, or suggestions, please open an issue on GitHub
