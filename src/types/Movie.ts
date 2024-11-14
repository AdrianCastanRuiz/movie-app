export interface Movie {
    id: string;
    title: string;
    releaseYear: number;
    genre: Genre;
    rating: number;
    created_at: Date,
    coverImageUrl?: string;
    review?: string;
  }
  
  export type Genre = 'Action' | 'Drama' | 'Comedy' | 'Sci-Fi' | 'Horror';
  