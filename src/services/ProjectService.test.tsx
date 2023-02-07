/**
 * @group unit
 */
import { findNumberOfProjectsByDistanceAsc, sortByDistanceAsc, calculateDistanceOfProjectToCoordinates } from './ProjectService';
import { ProjectType, ProjectWithDistanceType } from '../types/Project';

test('findNumberOfProjectsByDistanceAsc from Ilmenau', () => {
  const latitude = 50.6833;
  const longitude = 10.9;

  const result = findNumberOfProjectsByDistanceAsc(5, latitude, longitude);
  expect(result).toHaveLength(5);
  expect(result[0].projectName).toEqual("Bäume pflanzen im Sauerland");
  expect(result[0].distance).toEqual(191105.85790405006);
  expect(result[1].projectName).toEqual("Wella Firmenwald");
  expect(result[1].distance).toEqual(201602.82481781748);
  expect(result[2].projectName).toEqual("Pflanzung Hohe Wurzel (Bereich A)");
  expect(result[2].distance).toEqual(205904.4809469632);
  expect(result[3].projectName).toEqual("Pflanzung Hohe Wurzel (Bereich B)");
  expect(result[3].distance).toEqual(205980.97516713964);
  expect(result[4].projectName).toEqual("Pflanzung mit Jugendlichen im Holter Wald");
  expect(result[4].distance).toEqual(208235.1869925911);
});

test('calculateDistanceOfProjectToCoordinates from Ilmenau to Holter Wald', () => {
  const project: ProjectType = {
    "id": 28,
    "type": "B2C",
    "projectName": "Pflanzung mit Jugendlichen im Holter Wald",
    "status": "planted",
    "forestOwnership": "private",
    "forestOwner": "Privatwald",
    "treeQuantity": 1750,
    "location": "Holter Wald bei Bielefeld",
    "coordinatesUrl": "https://goo.gl/maps/9TqG6noG2PSRUN7V6",
    "latitude": 51.891210,
    "longitude": 8.611472,
    "startId": 12560,
    "endId": 14309,
    "startDate": "Frühjahr '21",
    "comment": "",
    "area": "Bielefeld"
  }
  const latitude = 50.6833;
  const longitude = 10.9;

  const result = calculateDistanceOfProjectToCoordinates(project, latitude, longitude);
  expect(result.distance).toEqual(208235.1869925911);
  expect((result.distance / 1000).toFixed(0)).toEqual("208");
});

test('sortByDistanceAsc', () => {
  const project1: ProjectWithDistanceType = {
    "id": 28,
    "type": "B2C",
    "projectName": "Pflanzung mit Jugendlichen im Holter Wald",
    "status": "planted",
    "forestOwnership": "private",
    "forestOwner": "Privatwald",
    "treeQuantity": 1750,
    "location": "Holter Wald bei Bielefeld",
    "coordinatesUrl": "https://goo.gl/maps/9TqG6noG2PSRUN7V6",
    "latitude": 51.891210,
    "longitude": 8.611472,
    "startId": 12560,
    "endId": 14309,
    "startDate": "Frühjahr '21",
    "comment": "",
    "area": "Bielefeld",
    "distance": 208235.1869925911
  }
  const project2: ProjectWithDistanceType = {
    "id": 24,
    "type": "B2C",
    "projectName": "Pflanzung Hohe Wurzel",
    "status": "planted",
    "forestOwnership": "public",
    "forestOwner": "Bundesland Hessen",
    "treeQuantity": 800,
    "location": "Hohe Wurzel im Taunus",
    "coordinatesUrl": "https://goo.gl/maps/Z5Su9zWZKwY1pnjE8",
    "latitude": 50.109313,
    "longitude": 8.136902,
    "startId": 8760,
    "endId": 9559,
    "startDate": "Frühjahr '21",
    "comment": "",
    "area": "Taunus",
    "distance": 205980.97516713964
  }
  const project3: ProjectWithDistanceType = {
    "id": 20,
    "type": "CNT",
    "projectName": "Bäume pflanzen im Kottenforst",
    "status": "planted",
    "forestOwnership": "public",
    "forestOwner": "Nordrhein-Westfalen",
    "treeQuantity": 330,
    "location": "Kottenforst bei Bonn",
    "coordinatesUrl": "https://goo.gl/maps/hR7xev5P7fTyQ6uo9",
    "latitude": 50.666974,
    "longitude": 7.045081,
    "startId": 6230,
    "endId": 6559,
    "startDate": "Frühjahr '22",
    "comment": "",
    "area": "Bonn",
    "distance": 271616.39914460765
  }
  const projects: ProjectWithDistanceType[] = [project1, project2, project3];

  const result = sortByDistanceAsc(projects);
  expect(result).toHaveLength(3);
  expect(result[0].projectName).toEqual("Pflanzung Hohe Wurzel");
  expect(result[0].distance).toEqual(205980.97516713964);
  expect(result[1].projectName).toEqual("Pflanzung mit Jugendlichen im Holter Wald");
  expect(result[1].distance).toEqual(208235.1869925911);
  expect(result[2].projectName).toEqual("Bäume pflanzen im Kottenforst");
  expect(result[2].distance).toEqual(271616.39914460765);
});
