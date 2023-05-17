import { render, screen } from '@testing-library/react';
import {
  AccountSettings,
  Login,
  Home,
  Profile,
  Register,
  Search,
} from '../pages';

test('renders login page', () => {
  render(<Login />);
  const linkElement = screen.getByTestId('login');
  expect(linkElement).toBeInTheDocument();
});

test('renders register page', () => {
  render(<Register />);
  const linkElement = screen.getByTestId('register');
  expect(linkElement).toBeInTheDocument();
});

test('renders home page', () => {
  render(<Home />);
  const linkElement = screen.getByTestId('home');
  expect(linkElement).toBeInTheDocument();
});

test('renders profile page', () => {
  render(<Profile />);
  const linkElement = screen.getByTestId('profile');
  expect(linkElement).toBeInTheDocument();
});

test('renders search', () => {
  render(<Search />);
  const linkElement = screen.getByTestId('search');
  expect(linkElement).toBeInTheDocument();
});

test('renders account settings page', () => {
  render(<AccountSettings />);
  const linkElement = screen.getByTestId('accountSettings');
  expect(linkElement).toBeInTheDocument();
});
