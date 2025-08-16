import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchShowById, fetchShowCredits, fetchShowTrailer } from "../services/movieService";


interface Genre {
    id: number;
    name: string;
}

interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

interface ShowDetailsData {
    id: number;
    name: string;
    overview: string;
    genres: Genre[];
    cast: CastMember[];
    backdrop_path: string;
    poster_path: string;
    first_air_date: string;
    number_of_seasons: number;
    number_of_episodes: number;
    vote_average: number;
}

const ShowDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [show, setShow] = useState<ShowDetailsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [trailerKey, setTrailerKey] = useState<String | null>(null);
    const [credits, setCredits] = useState<CastMember[]>([]);

    const fetchShowDetails = async () => {
        if (id) {
            try {
                const [showRes, creditRes, trailerRes] = await Promise.all([
                    fetchShowById(id),
                    fetchShowCredits(id),
                    fetchShowTrailer(id),
                ]);

                const trailers = trailerRes.data.results;
                const trailer = trailers.find((vid: any) =>
                    vid.site === "YouTube" && vid.type === "Trailer"
                );
                if (trailer) { setTrailerKey(trailer.key) }


                setShow(showRes.data);
                setLoading(false);
                setCredits(creditRes.data.cast);

            } catch (error) {
                console.log('Failed to load:', error);
            }
        }
    }

    useEffect(() => {
        fetchShowDetails();
    }, []);

    if (loading) return <p className="p-6 text-center">Loading...</p>
    if (!show) return <p className="p-6 text-center">Show not found.</p>

    const imageUrl = `http://image.tmdb.org/t/p/w500${show.poster_path}`;
    const backdropUrl = `https://image.tmdb.org/t/p/original${show.backdrop_path}`;

    return (
        <div className="relative w-full h-full min-h-screen text-white">

            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${backdropUrl})` }}
            >
                <div className="absolute inset-0 bg-black/50 backdrop-blur"></div>
            </div>


            <div className="relative p-6">
                <Link to="/" className="text-blue-600 hover:underline">&larr; Back</Link>

                <div className="mt-6 flex flex-col md:flex-row gap-6">
                    <img src={imageUrl} alt={show.name} className="rounded-lg w-60 md:w-64 h-60" />

                    <div className="">
                        <h2 className="text-3xl font-bold mb-2">{show.name}</h2>
                        <p className="text-sm mb-4">
                            First aired: {show.first_air_date} | Rating: ⭐ {show.vote_average}
                        </p>

                        {/**Genre */}
                        <div className="flex gap-2 mt-3 mb-3 flex-wrap">
                            {show.genres.map((g) => (
                                <span
                                    key={g.id}
                                    className="bg-red-600 px-3 py-1 rounded-full text-sm"
                                >
                                    {g.name}
                                </span>
                            ))}
                        </div>

                        <p className="text-lg">{show.overview}</p>
                        <p className=" text-lg mt-4">
                            Seasons: {show.number_of_seasons} | Episodes: {show.number_of_episodes}
                        </p>
                    </div>
                </div>

                {/* <div className="my-5">
                    <h2 className="text-xl font-bold mb-3">Top Cast</h2>
                    <div className="flex gap-4 overflow-x-auto">
                        {credits.map(member => (
                            <div key={member.name} className="min-w-[120px] text-center">
                                <img
                                    src={
                                        member.profile_path
                                            ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                                            : "/placeholder.jpg"
                                    }
                                    alt={member.name}
                                    className="w-28 h-40 object-cover rounded"
                                />
                                <p className="mt-2 font-semibold">{member.name}</p>
                                <p className="text-sm text-gray-400">{member.character}</p>
                            </div>
                        ))}
                    </div>
                </div> */}

                <div className="grid grid-cols-2 gap-3">
                    {trailerKey && (
                    <div>
                        <h1 className="text-xl font-bold mb-2 mt-4">Watch Trailer</h1>
                        <iframe
                            className="rounded-xl"
                            src={`https://www.youtube.com/embed/${trailerKey}`}
                            width="100%"
                            height="250"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}

                <div className="my-5">
                    <h2 className="text-xl font-bold mb-2">Top Cast</h2>
                    <div className="flex gap-4 overflow-x-auto">
                        {credits.map(member => (
                            <div key={member.name} className="min-w-[120px] text-center">
                                <img
                                    src={
                                        member.profile_path
                                            ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                                            : "/placeholder.jpg"
                                    }
                                    alt={member.name}
                                    className="w-28 h-40 object-cover rounded-xl"
                                />
                                <p className="mt-2 font-semibold">{member.name}</p>
                                <p className="text-sm text-gray-400">{member.character}</p>
                            </div>
                        ))}
                    </div>
                </div>

                </div>
                
            </div>
        </div>
    )
}

export default ShowDetails;