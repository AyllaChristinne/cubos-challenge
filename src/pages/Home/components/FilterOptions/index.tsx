import { useEffect, useRef, useState } from "react";

import { useGenres } from "@/context/GenreContext";
import { IMovieGenre, IMovieFilters } from "@/types/movies";
import { ratingOptions } from "@/constants/rating";
import { SearchIcon } from "@/icons/Search";
import { Input } from "../Input";
import { Dropdown } from "../Dropdown";
import { Button } from "@/components/Button";
import { FilterIcon } from "@/icons/Filters";
import "./index.scss";

interface IFilterOptionsProps {
  onFiltersChange: (newFilters: IMovieFilters) => void;
}

export function FilterOptions({ onFiltersChange }: IFilterOptionsProps) {
  const [showMoreFilters, setShowMoreFilters] = useState<boolean>(false);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [genre, setGenre] = useState<IMovieGenre | undefined>(undefined);
  const [rating, setRating] = useState<
    { value: number; label: string } | undefined
  >(undefined);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const genres = useGenres();

  function toggleFilters() {
    setShowMoreFilters(!showMoreFilters);
  }

  const filtersNotEmpty = Object.entries({
    query: search || undefined,
    genre,
    rating: rating?.value,
  }).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, string | number | IMovieGenre>);

  useEffect(() => {
    onFiltersChange(filtersNotEmpty);
  }, [search, genre, rating]);

  return (
    <section className="filters_section">
      <div className="filters_header">
        <Input
          ref={searchInputRef}
          onChange={(value) => {
            setSearch(value);
          }}
          name="Movie Search"
          placeholder="Pesquise por filmes"
          value={search || undefined}
          icon={<SearchIcon className="search_icon" />}
          type="search"
        />
        <Button
          onClick={toggleFilters}
          ariaLabel="Mostrar mais filtros"
          className="filters_headerButton"
          icon={<FilterIcon className="filters_icon" />}
          variant="secondary"
        />
      </div>
      {showMoreFilters && (
        <div className="filters_more">
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
    </section>
  );
}
