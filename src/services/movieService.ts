import axios from "axios"

const API_BASE_URL = 'https://api.themoviedb.org/3'

const movieApi = axios.create({
    baseURL: API_BASE_URL,
    params: {
        api_key: import.meta.env.VITE_MOVIE_API_KEY,
        language: 'en-US'
    },
    timeout: 10000
});

export const fetchTrendingMovies = () => movieApi.get('/trending/movie/week');
export const fetchTopRatedMovies = () => movieApi.get('/movie/top_rated');
export const fetchUpcomingMovies = () => movieApi.get('/movie/upcoming');
export const fetchNowPlayingMovies = () => movieApi.get('/movie/now_playing');
export const fetchMovieById = (movieId: string) => movieApi.get(`movie/${movieId}`);
export const fetchMovieTrailer = (movieId: string) => movieApi.get(`movie/${movieId}/videos`);

export const fetchPopularShows = () => movieApi.get('/tv/popular');
export const fetchTopRatedShows = () => movieApi.get('/tv/top_rated');
export const fetchShowById = (showId: string) => movieApi.get(`tv/${showId}`);
export const fetchShowTrailer = (showId: string) => movieApi.get(`tv/${showId}/videos`);
export const fetchShowCredits = (showId: string) => movieApi.get(`tv/${showId}/credits`)

export const searchMulti = async (query: string) => {
    if (!query.trim()) return [];
    const response = await movieApi.get("/search/multi",{
        params: { query },
    });

    interface MultiItemType {
        media_type: string;
    }

    return response.data.results.filter(
        (item: MultiItemType) => item.media_type === "movie" || item.media_type === "tv"
    )
}