import { Dispatch, useMemo } from "react";

import { Button } from "@/components/Button";
import { ChevronLeftIcon } from "@/components/icons/ChevronLeft";
import { ChevronRightIcon } from "@/components/icons/ChevronRight";
import "./index.scss";

interface IPaginationProps {
  currentPage: number;
  setCurrentPage: Dispatch<React.SetStateAction<number>>;
  total_results: number;
}

export function Pagination({
  currentPage,
  setCurrentPage,
  total_results,
}: IPaginationProps) {
  const range = window.innerWidth < 575 ? 1 : 2;
  const totalPages = Math.ceil(total_results / 10);
  const rangeStart = useMemo(() => {
    const start = currentPage - range;
    return start > 0 ? start : 1;
  }, [currentPage]);

  const rangeEnd = useMemo(() => {
    const end = currentPage + range;
    return end < totalPages ? end : totalPages;
  }, [currentPage]);

  const pages = useMemo(() => {
    return Array.from({ length: rangeEnd }, (_, index) => index + 1).slice(
      rangeStart - 1
    );
  }, [rangeStart, rangeEnd]);

  return (
    <div className="pagination_container">
      <Button
        ariaLabel="Previous page"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage == 1}
        className="pagination_previous"
        icon={<ChevronLeftIcon />}
      />
      {pages.map((num) => {
        return (
          <Button
            key={num}
            onClick={() => setCurrentPage(num)}
            ariaLabel={`Ir para página ${num}`}
            label={String(num)}
            disabled={currentPage === num}
            className="pagination_button"
          />
        );
      })}
      <Button
        ariaLabel="Previous page"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage == totalPages}
        className="pagination_next"
        icon={<ChevronRightIcon />}
      />
    </div>
  );
}
