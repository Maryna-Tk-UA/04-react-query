import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../../services/movieService";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { Movie } from "../../types/movie";
import MovieModal from "../MovieModal/MovieModal";
import ReactPaginate from "react-paginate";
import css from "./App.module.css";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [page, setPage] = useState<number>(1);

  const handleSearch = (query: string) => {
    setSearchValue(query);
    setPage(1); // це я відкотила на першу сторінку запит
    setSelectedMovie(null);
  };

  const handleselected = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => setSelectedMovie(null);

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["movie", searchValue, page],
    queryFn: () => fetchMovies(searchValue, page),
    enabled: Boolean(searchValue),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isSuccess && data.total_results === 0) {
      toast.error("No movies found for your request.", {
        position: "top-center",
        duration: 2500,
      });
    }
  }, [data?.total_results, isSuccess]);

  const totalPages = data?.total_pages ?? 0;
  const hasResults = (data?.results?.length ?? 0) > 0;

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {hasResults && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {data?.results && (
        <MovieGrid onSelect={handleselected} movies={data.results} />
      )}
      {selectedMovie && (
        <MovieModal onClose={closeModal} movie={selectedMovie} />
      )}
    </div>
  );
}



























