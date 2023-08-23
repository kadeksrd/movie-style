import React, { useEffect, useState, useRef } from "react";
import axios from "@api/axios";
import "./row.css";
import Image from "next/image";
import Fire from "@app/assets/img/fire.svg";

const Card = () => {
  return (
    <div
      className={`flex mt-5 row-posters`}
      style={{ overflowY: "hidden" }}
      ref={cardRef}>
      {movies.map(
        (movie) =>
          ((isLargeRow && movie.poster_path) ||
            (!isLargeRow && movie.backdrop_path)) && (
            <div
              className='row-poster-wrapper'
              key={movie.id}>
              <img
                className={`row-poster mr-2 rounded-xl ${
                  slide && isLargeRow ? "row-poster--left" : ""
                } ${isLargeRow ? "row-poster-large" : ""}`}
                src={`${baseUrl}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
              <div className='poster-info'>
                <h3 className='poster-title'>{movie.title || movie.name}</h3>
                <button className='view-more-button'>View More</button>
              </div>
            </div>
          )
      )}
    </div>
  );
};

function Row({ title, fetchUrl, isLargeRow, slide, trending }) {
  const [movies, setMovies] = useState([]);
  const baseUrl = "https://image.tmdb.org/t/p/w200";
  const [hoveredMovie, setHoveredMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  const cardRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);

  const handleScroll = (e) => {
    cardRef.current.scrollLeft += e.deltaY;
  };

  const handlePagination = (direction) => {
    const scrollAmount = direction === "left" ? -200 : 200;
    cardRef.current.scrollLeft += scrollAmount;
  };

  useEffect(() => {
    let interval;
    if (slide) {
      interval = setInterval(() => {
        setScrollX(scrollX + 1);
        cardRef.current.scrollLeft = scrollX;
      }, 100);
    }

    return () => {
      clearInterval(interval);
    };
  }, [slide, scrollX]);

  const handleHover = (movie) => {
    setHoveredMovie(movie);
  };

  const handleHoverOut = () => {
    setHoveredMovie(null);
  };

  return (
    <div className='px-5 mx-auto row my-3 px-2 mt-8'>
      <div className='flex items-center justify-between'>
        <h2
          className={`${
            isLargeRow
              ? "text-center text-2xl font-semibold py-4"
              : "text-xl font-semibold"
          }`}>
          {title}
        </h2>
        {!isLargeRow && (
          <div className='pagination py-3'>
            <button
              className='pagination-button text-2xl px-2'
              onClick={() => handlePagination("left")}>
              {"< "}
            </button>
            <button
              className='pagination-button text-2xl bg-red-600 text-white hover:bg-red-300 px-3 rounded-full'
              onClick={() => handlePagination("right")}>
              {" >"}
            </button>
          </div>
        )}
      </div>
      <div
        className={`flex`}
        style={{ overflowY: "hidden" }}
        ref={cardRef}>
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <>
                <img
                  key={movie.id}
                  className={`row-poster mr-2 rounded-xl ${
                    slide && isLargeRow ? "row-poster--left" : ""
                  } ${isLargeRow ? "row-poster-large" : ""}`}
                  src={`${baseUrl}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                />
                {hoveredMovie === movie && (
                  <div className='hover-content'>
                    <h3 className='poster-title'>
                      {movie.title || movie.name}
                    </h3>
                    <button className='view-more-button'>View More</button>
                  </div>
                )}
              </>
            )
        )}
      </div>
    </div>
  );
}

export default Row;
