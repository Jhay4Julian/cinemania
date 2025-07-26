import { Link } from "react-router-dom";
import type { Movie } from "../types/movie"

interface MovieCardProps {
    movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
    const imageUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;

    return (
        <Link to={`/movie/${movie.id}`} className="min-w-[160px] hover:scale-105 transition-transform">
            <img
                src={imageUrl}
                alt={movie.title}
                className="rounded-lg w-full object-cover"
            />
            <p className="mt-2 text-sm font-medium overflow-clipped">{movie.title}</p>
        </Link>
    )
}

export default MovieCard;