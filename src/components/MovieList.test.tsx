import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieList from './MovieList';
import { Movie } from '../types/Movie';

const mockMovies: Movie[] = [
  { id: '1', title: 'Movie A', releaseYear: 2021, genre: 'Action', rating: 8, coverImageUrl: '', review: 'Great movie!' },
  { id: '2', title: 'Movie B', releaseYear: 2019, genre: 'Drama', rating: 7, coverImageUrl: '', review: 'Interesting plot.' },
  { id: '3', title: 'Movie C', releaseYear: 2020, genre: 'Comedy', rating: 6, coverImageUrl: '', review: 'Funny scenes.' },
];

describe('MovieList Component', () => {
  beforeEach(() => {
    render(<MovieList movies={mockMovies} />);
  });

  it('renders without crashing', () => {
    expect(screen.getByText('All Genres')).toBeInTheDocument();
  });

  it('filters movies by genre', () => {
    fireEvent.change(screen.getByRole('combobox', { name: /Filter by Genre/i }), { target: { value: 'Action' } });
    expect(screen.getByText('Movie A')).toBeInTheDocument();
    expect(screen.queryByText('Movie B')).not.toBeInTheDocument();
    expect(screen.queryByText('Movie C')).not.toBeInTheDocument();
  });

  it('sorts movies by title', () => {
    fireEvent.change(screen.getByRole('combobox', { name: /Sort By/i }), { target: { value: 'title' } });
    const titles = screen.getAllByRole('heading', { level: 3 }).map((title) => title.textContent);
    expect(titles).toEqual(['Movie A', 'Movie B', 'Movie C']);
  });

  it('sorts movies by release year', () => {
    fireEvent.change(screen.getByRole('combobox', { name: /Sort By/i }), { target: { value: 'releaseYear' } });
    const titles = screen.getAllByRole('heading', { level: 3 }).map((title) => title.textContent);
    expect(titles).toEqual(['Movie A', 'Movie C', 'Movie B']);
  });

  it('sorts movies by rating', () => {
    fireEvent.change(screen.getByRole('combobox', { name: /Sort By/i }), { target: { value: 'rating' } });
    const titles = screen.getAllByRole('heading', { level: 3 }).map((title) => title.textContent);
    expect(titles).toEqual(['Movie A', 'Movie B', 'Movie C']);
  });

  it('filters movies by search input', () => {
    fireEvent.change(screen.getByPlaceholderText('Search by title...'), { target: { value: 'Movie B' } });
    expect(screen.getByText('Movie B')).toBeInTheDocument();
    expect(screen.queryByText('Movie A')).not.toBeInTheDocument();
    expect(screen.queryByText('Movie C')).not.toBeInTheDocument();
  });

  it('displays "No movies found" message when movie list is empty', () => {
    render(<MovieList movies={[]} />);
    expect(screen.getByText('No movies found')).toBeInTheDocument();
  });
});
