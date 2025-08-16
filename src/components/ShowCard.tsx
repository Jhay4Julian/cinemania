import { Link } from "react-router-dom";
import type { Show } from "../types/show";

interface ShowCardProps {
    show: Show;
}

const ShowCard = ({ show }: ShowCardProps) => {
    const imageUrl = `https://image.tmdb.org/t/p/w300${show.poster_path}`;

    return (
        <Link to={`/tv/${show.id}`} className="min-w-[160px] hover:scale-105 transition-transform">
            <img
                src={imageUrl}
                alt={show.name}
                className="rounded-lg w-full object-cover" />
            <p className="mt-2 text-sm font-black overflow-clip">{show.name}</p>
        </Link>
    )
}

export default ShowCard;