import locations from '../data/customerLocations.json';

import { LocationType } from '../types/Location';

export function findLocation(searchInput: string): LocationType {
    const foundLocation = locations.find((location) => location.name.toLowerCase().includes(searchInput.toLowerCase()));
    return foundLocation as LocationType;
}

export function getAllLocationNames(): string[] {
    return locations.map((location) => location.name);
}
