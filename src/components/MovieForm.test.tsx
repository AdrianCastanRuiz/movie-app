import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieForm from './MovieForm';

describe('MovieForm Component', () => {
  const mockOnAddMovie = jest.fn();
  const validMovieData = {
    title: 'Test Movie',
    releaseYear: '2022',
    genre: 'Action',
    rating: '8',
    coverImageUrl: 'https://example.com/image.jpg',
    review: 'Great movie!',
  };

  beforeEach(() => {
    render(<MovieForm onAddMovie={mockOnAddMovie} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields correctly', () => {
    expect(screen.getByPlaceholderText('Movie Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Release Year')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Rating (1-10)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Cover Image URL (optional)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Short Review (optional)')).toBeInTheDocument();
    expect(screen.getByText('Select Genre')).toBeInTheDocument();
  });

  it('displays an error when release year is invalid', () => {
    fireEvent.change(screen.getByPlaceholderText('Movie Title'), { target: { value: validMovieData.title } });
    fireEvent.change(screen.getByPlaceholderText('Release Year'), { target: { value: '1700' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: validMovieData.genre } });
    fireEvent.change(screen.getByPlaceholderText('Rating (1-10)'), { target: { value: validMovieData.rating } });
  
    fireEvent.click(screen.getByText('Add Movie'));

    expect(screen.getByText('Please enter a valid release year (between 1888 and the current year).')).toBeInTheDocument();
  });

  it('submits form correctly with valid data', () => {
    fireEvent.change(screen.getByPlaceholderText('Movie Title'), { target: { value: validMovieData.title } });
    fireEvent.change(screen.getByPlaceholderText('Release Year'), { target: { value: validMovieData.releaseYear } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: validMovieData.genre } });
    fireEvent.change(screen.getByPlaceholderText('Rating (1-10)'), { target: { value: validMovieData.rating } });
    fireEvent.change(screen.getByPlaceholderText('Cover Image URL (optional)'), { target: { value: validMovieData.coverImageUrl } });
    fireEvent.change(screen.getByPlaceholderText('Short Review (optional)'), { target: { value: validMovieData.review } });

    fireEvent.click(screen.getByText('Add Movie'));

    expect(mockOnAddMovie).toHaveBeenCalledWith({
      id: expect.any(String),
      title: validMovieData.title,
      releaseYear: parseInt(validMovieData.releaseYear, 10),
      genre: validMovieData.genre,
      rating: parseInt(validMovieData.rating, 10),
      coverImageUrl: validMovieData.coverImageUrl,
      review: validMovieData.review,
    });

    expect(screen.getByText('Movie added successfully!')).toBeInTheDocument();
  });

  it('closes the popup when the close button is clicked', () => {
    fireEvent.change(screen.getByPlaceholderText('Movie Title'), { target: { value: validMovieData.title } });
    fireEvent.change(screen.getByPlaceholderText('Release Year'), { target: { value: validMovieData.releaseYear } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: validMovieData.genre } });
    fireEvent.change(screen.getByPlaceholderText('Rating (1-10)'), { target: { value: validMovieData.rating } });
    fireEvent.click(screen.getByText('Add Movie'));

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(screen.queryByText('Movie added successfully!')).not.toBeInTheDocument();
  });

  it('prevents submission if rating is empty', () => {
    fireEvent.change(screen.getByPlaceholderText('Movie Title'), { target: { value: validMovieData.title } });
    fireEvent.change(screen.getByPlaceholderText('Release Year'), { target: { value: validMovieData.releaseYear } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: validMovieData.genre } });

    fireEvent.click(screen.getByText('Add Movie'));

    expect(mockOnAddMovie).not.toHaveBeenCalled();
    expect(screen.getByPlaceholderText('Rating (1-10)')).toBeInvalid();
  });
});

