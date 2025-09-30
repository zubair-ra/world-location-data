export interface Timezone {
    zoneName: string;
    gmtOffset: number;
    gmtOffsetName: string;
    abbreviation: string;
    tzName: string;
}
export interface Translations {
    br?: string;
    ko?: string;
    'pt-BR'?: string;
    pt?: string;
    nl?: string;
    hr?: string;
    fa?: string;
    de?: string;
    es?: string;
    fr?: string;
    ja?: string;
    it?: string;
    'zh-CN'?: string;
    tr?: string;
    ru?: string;
    uk?: string;
    pl?: string;
    [key: string]: string | undefined;
}
export interface Country {
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
export interface State {
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
export interface City {
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
export interface FilterOptions {
    region?: string;
    subregion?: string;
    currency?: string;
    phonecode?: string;
    timezone?: string;
}
export interface SearchOptions {
    query: string;
    limit?: number;
    caseSensitive?: boolean;
}
export interface CoordinateOptions {
    latitude: number;
    longitude: number;
    radius?: number;
}
//# sourceMappingURL=index.d.ts.map