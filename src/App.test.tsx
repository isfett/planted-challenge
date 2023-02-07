/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders headline', () => {
  render(<App />);
  const headline = screen.getByText(/Planted Coding Challenge/i);
  expect(headline).toBeInTheDocument();
});

test('renders searchfield', () => {
  render(<App />);
  const searchField = screen.getByRole("textbox");
  expect(searchField).toBeInTheDocument();
  expect(searchField).not.toHaveValue();
});

test('not renders hint when searchfield is empty', () => {
  render(<App />);
  const hint = screen.queryByText(/Ort nicht gefunden. Benutze bitte einen dieser Orte:/i);
  expect(hint).not.toBeInTheDocument();
});

test('not renders hint when searchfield contains one empty space', () => {
  render(<App />);
  const hint = screen.queryByText(/Ort nicht gefunden. Benutze bitte einen dieser Orte:/i);
  expect(hint).not.toBeInTheDocument();
});

test('renders hint when searchfield is not empty and location is not found', async () => {
  const {container} = render(<App />);
  const inputElement = container.querySelector("input[type='text']") as HTMLInputElement;
  fireEvent.change(inputElement, {target: {value: "Foo"} });
  expect(inputElement?.value).toEqual("Foo");
  const hint = await screen.findByText(/Ort nicht gefunden. Benutze bitte einen dieser Orte: Neu-Ulm, Koblenz am Rhein, Ilmenau, Potsdam, Saarbrücken, Königstein im Taunus, Bad Kreuznach, Krebeck, Bergisch Gladbach, Wetzlar/i);
  expect(hint).toBeInTheDocument();
});

test('not renders hint when searchfield is not empty and location is found', async () => {
  const {container} = render(<App />);
  const inputElement = container.querySelector("input[type='text']") as HTMLInputElement;
  fireEvent.change(inputElement, {target: {value: "Ilmenau"} });
  expect(inputElement?.value).toEqual("Ilmenau");
  const hint = await screen.queryByText(/Ort nicht gefunden. Benutze bitte einen dieser Orte:/i);
  expect(hint).not.toBeInTheDocument();
});

test('not renders hint when searchfield contains one empty space and location Bad Kreuznach is found', async () => {
  const {container} = render(<App />);
  const inputElement = container.querySelector("input[type='text']") as HTMLInputElement;
  fireEvent.change(inputElement, {target: {value: " "} });
  expect(inputElement?.value).toEqual(" ");
  const hint = await screen.queryByText(/Ort nicht gefunden. Benutze bitte einen dieser Orte:/i);
  expect(hint).not.toBeInTheDocument();
});

test('not render results when searchfield is empty', () => {
  render(<App />);
  const hint = screen.queryByText(/km entfernt/i);
  expect(hint).not.toBeInTheDocument();
});

test('not render results when searchfield is not empty and location is not found', async () => {
  const {container} = render(<App />);
  const inputElement = container.querySelector("input[type='text']") as HTMLInputElement;
  fireEvent.change(inputElement, {target: {value: "Foo"} });
  expect(inputElement?.value).toEqual("Foo");
  const result = await screen.queryByText(/Foo:/i);
  expect(result).not.toBeInTheDocument();
});

test('not render results when searchfield contains one empty space and location Bad Kreuznach is found', async () => {
  const {container} = render(<App />);
  const inputElement = container.querySelector("input[type='text']") as HTMLInputElement;
  fireEvent.change(inputElement, {target: {value: " "} });
  expect(inputElement?.value).toEqual(" ");
  const result = await screen.queryByText(/Bad Kreuznach:/i);
  expect(result).not.toBeInTheDocument();
});

test('render results when searchfield is not empty and location is found', async () => {
  const {container} = render(<App />);
  const inputElement = container.querySelector("input[type='text']") as HTMLInputElement;
  fireEvent.change(inputElement, {target: {value: "Ilmenau"} });
  expect(inputElement?.value).toEqual("Ilmenau");

  const result = await screen.findByText(/Ilmenau/i);
  expect(result).toBeInTheDocument();

  const projectName1 = await screen.findByText(/Bäume pflanzen im Sauerland/i);
  expect(projectName1).toBeInTheDocument();
  const distance1 = await screen.findByText(/191 km entfernt/i);
  expect(distance1).toBeInTheDocument();
  
  const projectName2 = await screen.findByText(/Wella Firmenwald/i);
  expect(projectName2).toBeInTheDocument();
  const distance2 = await screen.findByText(/202 km entfernt/i);
  expect(distance2).toBeInTheDocument();
  
  const projectName3 = await screen.findByText(/Pflanzung Hohe Wurzel \(Bereich A\)/i);
  expect(projectName3).toBeInTheDocument();
  const distance3 = await screen.findByText(/206 km entfernt/i);
  expect(distance3).toBeInTheDocument();
});
