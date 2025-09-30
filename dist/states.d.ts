import { State, SearchOptions, CoordinateOptions } from './types';
export declare function getAllStates(): State[];
export declare function getStateById(id: number): State | undefined;
export declare function getStateByCode(code: string, countryCode?: string): State | undefined;
export declare function getStatesByCountryId(countryId: number): State[];
export declare function getStatesByCountryCode(countryCode: string): State[];
export declare function searchStates(options: SearchOptions, countryId?: number): State[];
export declare function getStatesNearCoordinates(options: CoordinateOptions, countryId?: number): State[];
export declare function getStatesByType(type: string, countryId?: number): State[];
//# sourceMappingURL=states.d.ts.map