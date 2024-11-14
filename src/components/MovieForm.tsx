import React, { useState } from 'react';
import { Movie, Genre } from '../types/Movie';

interface MovieFormProps {
  onAddMovie: (movie: Movie) => void;
}

const genres: Genre[] = ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Horror'];

const MovieForm: React.FC<MovieFormProps> = ({ onAddMovie }) => {
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState<number | ''>('');
  const [genre, setGenre] = useState<Genre | ''>('');  
  const [rating, setRating] = useState<number | ''>('');
  const [coverImageUrl, setCoverImageUrl] = useState<string>('');
  const [review, setReview] = useState('');
  const [yearError, setYearError] = useState<string | null>(null); 
  const [showPopup, setShowPopup] = useState(false); 

  const validateForm = (): boolean => {
    if (!title || !releaseYear || !genre || rating === '' || rating < 1 || rating > 10) {
      return false;
    }
    if (releaseYear < 1888 || releaseYear > new Date().getFullYear()) {
      setYearError("Please enter a valid release year (between 1888 and the current year).");
      return false;
    }
    setYearError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newMovie: Movie = {
      id: Date.now().toString(),
      title,
      releaseYear: Number(releaseYear),
      genre: genre as Genre,
      rating: Number(rating),
      created_at: new Date(),
      coverImageUrl,
      review,
    };

    onAddMovie(newMovie);
    setShowPopup(true); 

    setTitle('');
    setReleaseYear('');
    setGenre('');
    setRating('');
    setCoverImageUrl('');
    setReview('');
    setYearError(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Movie Title" required />
        <input
          type="number"
          value={releaseYear}
          onChange={(e) => {
            setReleaseYear(Number(e.target.value));
            if (yearError) setYearError(null);
          }}
          placeholder="Release Year"
          required
        />
        {yearError && <p style={{ color: 'red', fontSize: '0.9rem' }}>{yearError}</p>}
        
        <select value={genre} onChange={(e) => setGenre(e.target.value as Genre)} required>
          <option value="">Select Genre</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        
        <input
          type="number"
          min={1}
          max={10}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          placeholder="Rating (1-10)"
          required
        />
        
        <input type="url" value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)} placeholder="Cover Image URL (optional)" />
        <textarea maxLength={300} value={review} onChange={(e) => setReview(e.target.value)} placeholder="Short Review (optional)" />
        <button type="submit">Add Movie</button>
      </form>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>Movie added successfully!</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieForm;
