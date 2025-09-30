import { Country, FilterOptions, SearchOptions, CoordinateOptions } from './types';
export declare function getAllCountries(): Country[];
export declare function getCountryById(id: number): Country | undefined;
export declare function getCountryByCode(code: string): Country | undefined;
export declare function getCountryByName(name: string, exact?: boolean): Country | undefined;
export declare function searchCountries(options: SearchOptions): Country[];
export declare function filterCountries(filters: FilterOptions): Country[];
export declare function getCountriesByRegion(region: string): Country[];
export declare function getCountriesBySubregion(subregion: string): Country[];
export declare function getCountriesByCurrency(currency: string): Country[];
export declare function getCountryByPhoneCode(phonecode: string): Country[];
export declare function getCountriesNearCoordinates(options: CoordinateOptions): Country[];
export declare function getAllRegions(): string[];
export declare function getAllSubregions(): string[];
export declare function getAllCurrencies(): Array<{
    code: string;
    name: string;
    symbol: string;
}>;
//# sourceMappingURL=countries.d.ts.map