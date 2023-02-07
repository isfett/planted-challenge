/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import Project from './Project';
import { ProjectWithDistanceType } from '../types/Project';

test('renders project', () => {
  const project: ProjectWithDistanceType = {
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
    "distance": 191105.85790405006
  }
  render(<Project {...project} />);
  
  const projectName = screen.getByText(/Pflanzung mit Jugendlichen im Holter Wald/i);
  expect(projectName).toBeInTheDocument();
  const distance = screen.getByText(/191 km entfernt/i);
  expect(distance).toBeInTheDocument();
});
