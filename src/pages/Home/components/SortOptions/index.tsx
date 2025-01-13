import { useCallback, useEffect, useRef, useState } from "react";

import { useGenres } from "@/context/GenreContext";
import { IMovieGenre, IMovieFilters } from "@/types/movies";
import { ratingOptions } from "@/constants/rating";
import { SearchIcon } from "@/icons/Search";
import { Input } from "../Input";
import { Dropdown } from "../Dropdown";
import "./index.scss";

interface ISortOptionsProps {
  onFiltersChange: (newFilters: IMovieFilters) => void;
}

export const SortOptions = ({ onFiltersChange }: ISortOptionsProps) => {
  const [showMoreFilters, setShowMoreFilters] = useState<boolean>(false);
  const [search, setSearch] = useState<string | undefined>("");
  const [genre, setGenre] = useState<IMovieGenre | undefined>(undefined);
  const [rating, setRating] = useState<
    { value: number; label: string } | undefined
  >(undefined);
  const [releaseYear, setReleaseYear] = useState<string | undefined>(undefined);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const releaseYearInputRef = useRef<HTMLInputElement>(null);
  const genres = useGenres();

  function toggleFilters() {
    setShowMoreFilters(!showMoreFilters);
  }

  useEffect(() => {
    onFiltersChange({
      query: search,
      genre,
      rating: rating?.value,
      release_date: releaseYear,
    });
  }, [search, genre, rating, releaseYear]);

  return (
    <div>
      <div>
        <Input
          ref={searchInputRef}
          onChange={(value) => {
            setSearch(value);
          }}
          name="Movie Search"
          placeholder="Pesquise por filmes"
          value={search || ""}
          icon={<SearchIcon className="search_icon" />}
          type="search"
        />
        <button onClick={toggleFilters}>toggle filters</button>
      </div>
      {showMoreFilters && (
        <div>
          Gênero
          <Dropdown
            items={genres}
            value={genre}
            onChange={(value) => {
              setGenre(value);
            }}
            itemLabel={(item) => item?.name || ""}
            itemValue={(item) => item?.id || ""}
            placeholder="Selecione um gênero"
          />
          Avaliação
          <Dropdown
            items={ratingOptions}
            value={rating}
            onChange={(value) => {
              setRating(value);
            }}
            itemLabel={(item) => item?.label || ""}
            itemValue={(item) => item?.value || ""}
            placeholder="Selecione uma nota"
          />
        </div>
      )}
    </div>
  );
};
