import { City, SearchOptions, CoordinateOptions } from './types';
export declare function getAllCities(): City[];
export declare function getCityById(id: number): City | undefined;
export declare function getCitiesByCountryId(countryId: number): City[];
export declare function getCitiesByCountryCode(countryCode: string): City[];
export declare function getCitiesByStateId(stateId: number): City[];
export declare function getCitiesByStateCode(stateCode: string, countryCode?: string): City[];
export declare function searchCities(options: SearchOptions, countryId?: number, stateId?: number): City[];
export declare function getCitiesNearCoordinates(options: CoordinateOptions, countryId?: number, stateId?: number): City[];
export declare function getCityByName(name: string, countryCode?: string, stateCode?: string): City | undefined;
//# sourceMappingURL=cities.d.ts.map