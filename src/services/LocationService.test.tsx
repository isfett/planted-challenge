/**
 * @group unit
 */
import { findLocation, getAllLocationNames } from './LocationService';

test('findLocation with existing Location', () => {
  const result = findLocation('Ilmenau');
  expect(result.name).toEqual('Ilmenau');
  expect(result.latitude).toEqual(50.6833);
  expect(result.longitude).toEqual(10.9);
});

test('findLocation with non existing Location', () => {
  const result = findLocation('Foo');
  expect(result).toBeUndefined();
});

test('getAllLocationNames with location names provided', () => {
  const results = getAllLocationNames();
  const expectedResults: string[] = [
    'Neu-Ulm',
    'Koblenz am Rhein',
    'Ilmenau',
    'Potsdam',
    'Saarbrücken',
    'Königstein im Taunus',
    'Bad Kreuznach',
    'Krebeck',
    'Bergisch Gladbach',
    'Wetzlar'
  ];
  expect(results).not.toHaveLength(0);
  expect(results).toHaveLength(expectedResults.length);
  expect(results).toMatchObject(expectedResults);
});
