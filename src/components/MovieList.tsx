import React, { useState } from 'react';
import { Movie, Genre } from '../types/Movie';

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const [filter, setFilter] = useState<Genre | ''>('');
  const [sortKey, setSortKey] = useState<keyof Movie | ''>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

 const formatDate = (date: Date ) =>{
  const day = date.getDay().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString()

  return `${day}/${month}/${year}`
 }

  const filteredMovies = movies
    .filter((movie) => 
      (!filter || movie.genre === filter) &&
      (!searchQuery || movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (!sortKey) return 0;
      if (typeof a[sortKey] === 'string') {
        return String(a[sortKey]).localeCompare(String(b[sortKey]));
      }
      return Number(b[sortKey]) - Number(a[sortKey]);
    });

  return (
    <div className="movie-list-container">
      <div className="filter-container">
        <input 
          type="text" 
          placeholder="Search by title..." 
          aria-label="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select aria-label='filter by genre' onChange={(e) => setFilter(e.target.value as Genre)} value={filter}>
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Horror">Horror</option>
        </select>
        <select aria-label='sort by' onChange={(e) => setSortKey(e.target.value as keyof Movie)} value={sortKey}>
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="releaseYear">Release Year</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {filteredMovies.length === 0 && <p>No movies found</p>}

      <div className="movie-grid">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movie-item">
            {movie.coverImageUrl && <img src={movie.coverImageUrl} alt={`${movie.title} cover`} /> }
            <div className="movie-details">
              <h3>{movie.title}</h3>
              <p>{movie.releaseYear} | {movie.genre} | Rating: {movie.rating}</p>
              <p>Created at: {formatDate(movie.created_at)}</p>
              {movie.review && <p className="movie-review">Review: {movie.review}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;

