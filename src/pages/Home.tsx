import { useEffect, useState } from 'react';
import {
    fetchTrendingMovies,
    fetchTopRatedMovies,
    fetchUpcomingMovies,
    fetchNowPlayingMovies
} from '../services/movieService';
import type { Movie } from '../types/movie';
import MovieSection from '../components/MovieSection';

const Home = () => {
    const [trending, setTrending] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [upcoming, setUpcoming] = useState<Movie[]>([]);
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);

    const loadMovies = async () => {
        try {
            const [trendingRes, topRatedRes, upcomingRes, nowPlayingRes] = await Promise.all([
                fetchTrendingMovies(),
                fetchTopRatedMovies(),
                fetchUpcomingMovies(),
                fetchNowPlayingMovies()
            ]);

            setTrending(trendingRes.data.results);
            setTopRated(topRatedRes.data.results);
            setUpcoming(upcomingRes.data.results);
            setNowPlaying(nowPlayingRes.data.results);
        } catch (error) {
            console.error('Failed to load movies:', error);
        }
    };

    useEffect(() => {
        loadMovies();
    }, []);

    return (
        <div className="p-6 space-y-10">
            <h1 className='font-bold text-3xl'>Cinemania</h1>
            <MovieSection title="Trending" movies={trending} />
            <MovieSection title="Now Playing" movies={nowPlaying} />
            <MovieSection title="Top Rated" movies={topRated} />
            <MovieSection title="Upcoming" movies={upcoming} />
        </div>
    );
};

export default Home;