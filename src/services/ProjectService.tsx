import projects from '../data/plantationProjects.json';

import { ProjectType, ProjectWithDistanceType } from '../types/Project';

export function findNumberOfProjectsByDistanceAsc(count: number, latitude: number, longitude: number): ProjectWithDistanceType[] {
    const calculatedProjects: ProjectWithDistanceType[] = [];
    projects.forEach(project => {
        const calculatedProject = calculateDistanceOfProjectToCoordinates(project as unknown as ProjectType, latitude, longitude);
        calculatedProjects.push(calculatedProject);
    });

    return sortByDistanceAsc(calculatedProjects).slice(0, count);
}

export function sortByDistanceAsc(projects: ProjectWithDistanceType[]): ProjectWithDistanceType[] {
    projects = projects.sort((a: ProjectWithDistanceType, b: ProjectWithDistanceType) => {
        if  (a.distance > b.distance) {
            return 1;
        }
        return -1;
    });

    return projects;
}

export function calculateDistanceOfProjectToCoordinates(project: ProjectType, latitude: number, longitude: number): ProjectWithDistanceType {
    // code from https://www.movable-type.co.uk/scripts/latlong.html
    
    const R = 6371e3; // metres, radius of earth
    const φ1 = latitude * Math.PI/180; // φ, λ in radians
    const φ2 = project.latitude * Math.PI/180;
    const Δφ = (project.latitude-latitude) * Math.PI/180;
    const Δλ = (project.longitude-longitude) * Math.PI/180;
    
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    const d = R * c; // in metres

    const projectWithDistance = project as ProjectWithDistanceType;
    projectWithDistance.distance = d;
    return projectWithDistance;
}
