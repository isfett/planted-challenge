export type ProjectType = {
    id: number;
    type: string;
    projectName: string;
    status: string;
    forestOwnership: string;
    forestOwner: string;
    treeQuantity: number;
    location: string;
    coordinatesUrl: string;
    latitude: number;
    longitude: number;
    startId: number;
    endId: number;
    startDate: string;
    comment: string;
    area: string;
}

export type ProjectWithDistanceType = ProjectType & {
    distance: number;
} 
