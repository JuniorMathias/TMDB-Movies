import type { Genre, Movie } from "@/shared/types/types";

export type FilterProps = {
  value: string;
  onChange: (value: string) => void;
};

export type SearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export type GenreProps = {
  genres: Genre[];
  selectedGenres: number[];
  onToggleGenre: (id: number) => void;
};

export type TableProps = {
  value: Movie[];
  onChange: (value: number) => void;
};
