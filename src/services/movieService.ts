import axios from "axios";
import type { fetchMovesProps } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_TOKEN as string;



export async function fetchMovies(query: string, page: number = 1): Promise<fetchMovesProps> {
    const { data } = await axios.get<fetchMovesProps>(`${BASE_URL}/search/movie`, {
        params: {
            query,
            page
        },
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    });
    return data;
}

