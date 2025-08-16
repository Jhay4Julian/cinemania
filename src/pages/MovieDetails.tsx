import { useEffect, useState } from "react";
import { fetchMovieById, fetchMovieTrailer } from "../services/movieService";
import type { Movie } from "../types/movie";
import { Link, useParams } from "react-router-dom";

const MovieDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [trailerKey, setTrailerKey] = useState<String | null>(null);

    useEffect(() => {
        const getMovie = async () => {
            if (id) {
                const res = await fetchMovieById(id);
                setMovie(res.data);
                setLoading(false);
            }
        };
        getMovie();
    }, [id]);

    useEffect(() => {
        const fetchTrailer = async () => {
            if (id) {
                try {
                    const res = await fetchMovieTrailer(id);
                    console.log("Trailer API response:", res.data);
                    const trailers = res.data.results;
                    const trailer = trailers.find((vid: any) =>
                        vid.site === "YouTube" && vid.type === "Trailer"
                    );
                    if (trailer) {
                        setTrailerKey(trailer.key);
                    }
                    console.log("Trailer key:", trailer?.key)
                } catch (err) {
                    console.error("Error fetching trailer:", err);
                }
            }
        };
        fetchTrailer();
    }, [id]);

    if (loading) return <p className="p-6">Loading...</p>
    if (!movie) return <p className="p-6">Movie not found.</p>

    const imageUrl = `http://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

    return (
        // <div className="p-6 max-w-4xl mx-auto">
        <div className="relative w-full h-full min-h-screen text-white">

            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${backdropUrl})` }}
            >
                <div className="absolute inset-0 bg-black/50 backdrop-blur"></div>
            </div>


            <div className="p-6 mr-10">
                <Link to="/" className="relative text-blue-400 text-lg font-bold hover:underline">&larr; Back</Link>

                <div className="relative z-10 mt-6 flex flex-col md:flex-row gap-6">
                    <img src={imageUrl} alt={movie.title} className="rounded-lg w-full md:w-64" />

                    <div>
                        <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
                        <p className=" text-sm mb-4">
                            Release Date: {movie.release_date} | Rating:  {movie.vote_average}⭐
                        </p>
                        <p className="text-lg">{movie.overview}</p>
                    </div>
                </div>

                {trailerKey && (
                    <div className="relative">
                        <h1 className="text-xl font-bold mb-2 mt-4">Watch Trailer</h1>
                        <iframe
                            className="rounded-xl"
                            src={`https://www.youtube.com/embed/${trailerKey}`}
                            width="100%"
                            height="400"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default MovieDetails;