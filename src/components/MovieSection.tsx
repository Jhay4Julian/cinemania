import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

interface MovieSectionProps {
    title: string;
    movies: Movie[];
}

const MovieSection = ({ title, movies }: MovieSectionProps) => {
    if (!movies || movies.length === 0) return null;

    return (
        <section>
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <div className="flex overflow-x-auto overflow-y-hidden gap-4 scrollbar-hide">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </section>
    )
}

export default MovieSection;