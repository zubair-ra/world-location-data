import { Country, State, City } from '../types';
import * as path from 'path';
import * as fs from 'fs';

let countriesCache: Country[] | null = null;
let statesCache: State[] | null = null;
let citiesCache: City[] | null = null;

const dataPath = path.join(__dirname, '../../public/data');

export function getCountriesData(): Country[] {
  if (!countriesCache) {
    const filePath = path.join(dataPath, 'countries.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    countriesCache = JSON.parse(data);
  }
  return countriesCache!;
}

export function getStatesData(): State[] {
  if (!statesCache) {
    const filePath = path.join(dataPath, 'states.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    statesCache = JSON.parse(data);
  }
  return statesCache!;
}

export function getCitiesData(): City[] {
  if (!citiesCache) {
    const filePath = path.join(dataPath, 'cities.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    citiesCache = JSON.parse(data);
  }
  return citiesCache!;
}

export function clearCache(): void {
  countriesCache = null;
  statesCache = null;
  citiesCache = null;
}
