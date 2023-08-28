import React, { useEffect, useState, useRef } from "react";
import axios from "@api/axios";
import "./row.css";
import Image from "next/image";
import Fire from "@app/assets/img/fire.svg";
import Link from "next/link";

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

    const startTime = Date.now();
    const startScroll = cardRef.current.scrollLeft;

    function scrollStep() {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const targetScroll = startScroll + (scrollAmount * elapsedTime) / 500; // Adjust the divisor to control speed

      cardRef.current.scrollLeft = targetScroll;

      if (elapsedTime < 500) {
        requestAnimationFrame(scrollStep);
      }
    }

    scrollStep();
  };

  useEffect(() => {
    let interval;
    if (slide) {
      interval = setInterval(() => {
        setScrollX((prevScrollX) => prevScrollX + 1);
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

  const handleViewMoreClick = (movie) => {
    // Lakukan tindakan yang Anda inginkan dengan ID film di sini
    console.log(movie);
    // Misalnya, Anda bisa memicu perutean ke halaman detail film menggunakan ID ini.
  };

  return (
    <div className='px-7 mx-auto row my-3 mt-8 row'>
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
        className={`flex overflow-hidden`} // Updated class here
        style={{ overflowY: "hidden" }}
        ref={cardRef}>
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <div // Wrapping each movie content in a div
                key={movie.id}
                className={`relative mr-2 ${
                  slide && isLargeRow ? "row-poster--left" : ""
                } ${isLargeRow ? "row-poster-large" : ""}`}
                onMouseEnter={() => handleHover(movie)}
                onMouseLeave={handleHoverOut}>
                <img
                  className={`row-poster rounded-xl`}
                  src={`${baseUrl}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                  width={400}
                  height={200}
                />
                {hoveredMovie === movie && (
                  <div
                    className={`hover-content relative bottom-0 left-0 w-full p-2 bg-black bg-opacity-50 text-white rounded-xl flex flex-col items-center justify-center ${
                      isLargeRow ? "h-full top-0" : ""
                    }`}>
                    <h3 className={`poster-title ${isLargeRow ? "py-3" : ""}`}>
                      {isLargeRow
                        ? movie.title || movie.name
                        : movie.title || movie.name.length > 30
                        ? `${movie.title.substring(0, 20)}...`
                        : movie.title || movie.name}
                    </h3>
                    <p
                      className={`${
                        isLargeRow ? "text-sm py-2" : "text-xs py-1"
                      } text-center`}>
                      {movie.overview.length > (isLargeRow ? 50 : 30)
                        ? `${movie.overview.substring(
                            0,
                            isLargeRow ? 150 : 40
                          )}...`
                        : movie.overview}
                    </p>

                    {/* ${(clicked == movie) ? "movie" : "series"} */}
                    <Link
                      href={`/detail/${
                        movie.media_type === "movie" || !movie.media_type
                          ? "movie"
                          : "tv"
                      }/${movie.id}`}
                      className='view-more-button bg-red-600 px-3 text-sm py-1 rounded-lg hover:bg-red-900'
                      onClick={() => handleViewMoreClick(movie.id)}>
                      View More
                    </Link>
                    {/* <button
                      className='view-more-button bg-red-600 px-3 text-sm py-1 rounded-lg'
                      onClick={() => handleViewMoreClick(movie)}>
                      View More
                    </button> */}
                  </div>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Row;
