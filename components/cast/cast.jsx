import Link from "next/link";
import React, { useRef } from "react";

function Cast({ casts }) {
  const cardRef = useRef(null);

  const handlePagination = (direction) => {
    if (cardRef.current !== null) {
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
    }
  };

  return (
    <div className='cast-section my-20  mb-5 px-3 divide-y'>
      <div className='px-2 py-2 text-2xl '>Cast</div>
      <div className='flex items-center pt-8'>
        <button
          className='text-gray-500 mx-2 text-4xl rounded-xl'
          onClick={() => handlePagination("left")}>
          {"<"}
        </button>
        <div
          className='cast-list flex overflow-x-scroll gap-5'
          ref={cardRef}
          style={{ overflow: "hidden" }}>
          {casts.map((actor) => (
            <div
              key={actor.id}
              className='cast-item hover:scale-125 mr-1'>
              {actor.profile_path ? (
                <Link
                  href={`https://www.google.com/search?q=${actor.name}`}
                  target='_blank'>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    alt={actor.name}
                    className='cast-image w-45 h-40 rounded-xl flex-shrink-0'
                    style={{ maxWidth: "max-content" }}
                  />
                </Link>
              ) : (
                <div className='cast-image no-image w-32 h-32 rounded-full flex items-center justify-center'>
                  No Image Available
                </div>
              )}
              <p className='text-white text-center mt-2'>{actor.name}</p>
              <p className='text-gray-200/25 text-sm text-center mt-2 font-light'>
                {actor.character}
              </p>
            </div>
          ))}
        </div>
        <button
          className='text-gray-500 mx-2 text-4xl'
          onClick={() => handlePagination("right")}>
          {">"}
        </button>
      </div>
    </div>
  );
}

export default Cast;
