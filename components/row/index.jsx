import React, { useEffect, useState, useRef } from "react";
import axios from "@api/axios";
import "./row.css";
import RowImage from "./Row_Image";
import Skeleton from "react-loading-skeleton";
import Loading from "@components/loading";

function Row({ title, fetchUrl, isLargeRow, slide }) {
  const [movies, setMovies] = useState([]);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const baseUrl = "https://image.tmdb.org/t/p/w200";
  const cardRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setIsLoading(false);
      setMovies(request.data.results);

      return request;
    }

    fetchData();
  }, [fetchUrl]);

  const handlePagination = (direction) => {
    const scrollAmount = direction === "left" ? -200 : 200;

    const startTime = Date.now();
    const startScroll = cardRef.current.scrollLeft;

    function scrollStep() {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const targetScroll = startScroll + (scrollAmount * elapsedTime) / 500;

      cardRef.current.scrollLeft = targetScroll;

      if (elapsedTime < 500) {
        requestAnimationFrame(scrollStep);
      }
    }

    scrollStep();
  };

  const handleHover = (movie) => {
    setHoveredMovie(movie);
  };

  const handleHoverOut = () => {
    setHoveredMovie(null);
  };

  return (
    <div className='px-7 mx-auto row my-3 mt-8 row'>
      {isLoading ? (
        <Loading
          count={1}
          height={60}
        />
      ) : (
        <>
          <div className='flex items-center justify-between'>
            <h2
              className={`text-white ${
                isLargeRow
                  ? "text-center text-2xl font-semibold py-4"
                  : "text-xl font-semibold"
              }`}>
              {title}
            </h2>
            {!isLargeRow && (
              <div className='pagination py-3'>
                <button
                  className='text-white pagination-button text-2xl px-2'
                  onClick={() => handlePagination("left")}>
                  {"< "}
                </button>
                <button
                  className='pagination-button text-2xl bg-red-600 text-white hover:bg-red-900 px-3 rounded-full'
                  onClick={() => handlePagination("right")}>
                  {" >"}
                </button>
              </div>
            )}
          </div>
          <div
            className={`flex overflow-hidden bg-dark`}
            style={{ overflowY: "hidden" }}
            ref={cardRef}>
            {movies.map(
              (movie) =>
                ((isLargeRow && movie.poster_path) ||
                  (!isLargeRow && movie.backdrop_path)) && (
                  <RowImage
                    key={movie.id}
                    movie={movie}
                    handleHover={handleHover}
                    handleHoverOut={handleHoverOut}
                    slide={slide}
                    isLargeRow={isLargeRow}
                    baseUrl={baseUrl}
                    hoveredMovie={hoveredMovie}
                  />
                )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Row;
