export interface Movie {
    id: string;
    title: string;
    releaseYear: number;
    genre: Genre;
    rating: number;
    coverImageUrl?: string;
    review?: string;
  }
  
  export type Genre = 'Action' | 'Drama' | 'Comedy' | 'Sci-Fi' | 'Horror';
  