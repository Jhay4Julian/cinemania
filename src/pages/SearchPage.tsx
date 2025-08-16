import { useEffect, useState } from "react";
import { searchMulti } from "../services/movieService";
import { Link } from "react-router-dom";

interface SearchResult {
    id: number;
    title?: string;
    name?: string;
    poster_path?: string;
    backdrop_path?: string;
    media_type: "movie" | "tv";
}

const SearchPage = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const delayDebounce = setTimeout(async () => {
            setLoading(true);
            const data = await searchMulti(query);
            setResults(data);
            setLoading(false);
        }, 500);

        // clear timer if query changes before 500ms
        return () => clearTimeout(delayDebounce);
    }, [query]);

    return (
        <div className="p-4 text-white">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies..."
                className="flex-1 rounded p-2 text-black border border-gray-300"
            />
            <button
                type="submit"
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
            >
                Search
            </button>

            {/* Skeleton Loader */}
            {loading && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-gray-300 h-64 rounded animate-pulse" />
                    ))}
                </div>
            )}

            {/* No Results */}
            {!loading && results.length === 0 && query && (
                <p>No results found for "{query}"</p>
            )}


            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-5">
                {results.map((item) => (
                    <Link key={item.id} to={`/${item.media_type}/${item.id}`}>
                        <div
                            key={item.id}
                            className="bg-gray-600 rounded p-2 shadow hover:scale-105 transition-transform"
                        >
                            <img
                                src={item.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                    : item.backdrop_path
                                        ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                                        : "/placeholder.jpg"
                                }
                                alt={item.title || item.name}
                                className="rounded"
                            />
                            <p className="mt-2 text-sm">{item.title || item.name}</p>
                            <p className="mt-1 text-xs text-gray-4004">
                                {item.media_type === "tv" ? "TV Show" : "Movie"}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
};
export default SearchPage;