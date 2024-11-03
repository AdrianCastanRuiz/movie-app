import React, { useState } from 'react';
import MovieForm from './components/MovieForm';
import MovieList from './components/MovieList';
import { Movie } from './types/Movie';
import "./App.css"

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const addMovie = (movie: Movie) =>{
    setMovies([...movies, movie]);
  } 

  return (
    <div>
      <h1>Movie Recommendation App</h1>
      <MovieForm onAddMovie={addMovie} />
      <MovieList movies={movies} />
    </div>
  );
};

export default App;
