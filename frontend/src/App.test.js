import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Add Client heading', () => {
  render(<App />);
  const headings = screen.getAllByText(/add client/i);

  expect(headings[0]).toBeInTheDocument();
});
