import React from "react";
import Hover from "./hover_row";

function RowImage({
  handleHover,
  handleHoverOut,
  movie,
  slide,
  isLargeRow,
  baseUrl,
  hoveredMovie,
}) {
  return (
    <div // Wrapping each movie content in a div
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
      <Hover
        movie={movie}
        hoveredMovie={hoveredMovie}
        isLargeRow={isLargeRow}
      />
    </div>
  );
}

export default RowImage;
