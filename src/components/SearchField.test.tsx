/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import SearchField from './SearchField';

test('renders searchfield with empty value', () => {
  render(<SearchField value="" onChange={()=>{}} />);
  
  const searchField = screen.getByRole("textbox");
  expect(searchField).toBeInTheDocument();
});
