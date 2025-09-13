import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_TOKEN as string;

interface fetchMovesProps {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export async function fetchMovies(query: string): Promise<fetchMovesProps> {
    const { data } = await axios.get<fetchMovesProps>(`${BASE_URL}/search/movie`, {
        params: {
            query,
        },
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    });
    return data;
}