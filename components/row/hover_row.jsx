import Link from "next/link";
import React from "react";

function Hover({ movie, hoveredMovie, isLargeRow }) {
  return (
    <>
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
              ? `${movie.overview.substring(0, isLargeRow ? 150 : 40)}...`
              : movie.overview}
          </p>

          {/* ${(clicked == movie) ? "movie" : "series"} */}
          <Link
            href={`/detail/${
              movie.media_type === "movie" || !movie.media_type ? "movie" : "tv"
            }/${movie.id}`}
            className='view-more-button bg-red-600 px-3 text-sm py-1 rounded-lg hover:bg-red-900'>
            View More
          </Link>
        </div>
      )}
    </>
  );
}

export default Hover;
