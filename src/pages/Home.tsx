import { useEffect, useState } from 'react';
import {
    fetchTrendingMovies,
    fetchTopRatedMovies,
    fetchUpcomingMovies,
    fetchNowPlayingMovies,
    fetchPopularShows,
    fetchTopRatedShows
} from '../services/movieService';
import type { Movie } from '../types/movie';
import MovieSection from '../components/MovieSection';
import { clsx as cn } from 'clsx';
import ShowSection from '../components/ShowSection';
import type { Show } from '../types/show';

const Home = () => {
    const [trending, setTrending] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [upcoming, setUpcoming] = useState<Movie[]>([]);
    const [type, setType] = useState<"movie" | "show">("movie");
    const [popularShow, setPopularShow] = useState<Show[]>([]);
    const [ratedShow, setRatedShow] = useState<Show[]>([]);

    const loadMovies = async () => {
        try {
            const [trendingRes, topRatedRes, upcomingRes] = await Promise.all([
                fetchTrendingMovies(),
                fetchTopRatedMovies(),
                fetchUpcomingMovies(),
                fetchNowPlayingMovies()
            ]);

            setTrending(trendingRes.data.results);
            setTopRated(topRatedRes.data.results);
            setUpcoming(upcomingRes.data.results);
        } catch (error) {
            console.error('Failed to load movies:', error);
        }
    };

    const loadShows = async () => {
        try {
            const [popularRes, topRatedRes] = await Promise.all([
                fetchPopularShows(),
                fetchTopRatedShows(),
            ]);

            setPopularShow(popularRes.data.results);
            setRatedShow(topRatedRes.data.results);
        } catch (error) {
            console.error('Failed to load tv shows:', error);
        }
    }

    useEffect(() => {
        loadMovies();
        loadShows();
    }, []);



    return (
        <div className="p-6 space-y-10">
            <div className='flex flex-row justify-center gap-4'>
                <button
                    onClick={() => setType("movie")}
                    className={cn(
                        "px-4 py-2 rounded cursor-pointer",
                        type === "movie" ? "bg-blue-600 text-white" : "bg-gray-200"
                    )}>
                    Movies
                </button>
                <button
                    onClick={() => setType("show")}
                    className={cn(
                        "px-4 py-2 rounded cursor-pointer",
                        type === "show" ? "bg-blue-600 text-white" : "bg-gray-200"
                    )}>
                    Shows
                </button>
            </div>

            {type === "movie" ? (
                <>
                    <div className='mb-9'></div>
                    <MovieSection title="Trending" movies={trending} />
                    <MovieSection title="Top Rated" movies={topRated} />
                    <MovieSection title="Upcoming" movies={upcoming} />
                </>
            ) : (
                <>
                    <ShowSection title='Popular' shows={popularShow} />
                    <ShowSection title='Top Rated' shows={ratedShow} />
                </>
            )}
        </div>
    );
};

export default Home;