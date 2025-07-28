import type { Movie } from "./movie";

export interface Board {
    id: string;
    name:string;
    movies: Movie[];
}