import Link from "next/link";
import React from "react";

function Overview({movie}) {
  return (
    <div className='card w-full mx-5 px-5 mt-5 pt-2 pb-5 mb-0 bg-gray-400/25 rounded-xl'>
      <div className='imdb-rate flex justify-between py-4 items-center gap-5'>
        <h3 className='text-2xl'>People Rates</h3>
        <div className='justify-self-end'>
          <div className='relative w-16 h-16'>
            <svg
              className='absolute inset-0 z-0'
              viewBox='0 0 36 36'>
              <circle
                className='circle-bg'
                cx='18'
                cy='18'
                r='16'
                style={{
                  backgroundColor: "white",
                }}
              />
              <circle
                className='circle-fill bg-red-200'
                cx='18'
                cy='18'
                r='16'
                strokeDasharray='100'
                style={{
                  strokeDashoffset: 100 - Math.round(movie.vote_average * 10),
                  stroke: "#4285F4", // Warna lingkaran mengisi
                }}
              />
            </svg>
            <div className='w-full h-full flex items-center justify-center'>
              {" "}
              {/* Warna teks */}
              <h2 className='text-white z-10'>
                {Math.round(movie.vote_average * 10)}%
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className='overview divide-y my-3'>
        <h2 className='text-xl py-2 text-start'>Movie Overview</h2>
        <p className='text-justify py-2 text-sm'>{movie.overview}</p>
      </div>
      <div className='genre divide-y'>
        <h2 className='text-xl py-2 text-start'>Genre</h2>
        <p className='text-start py-2'>
          {movie.genres.map((g) => g.name).join(" , ")}
        </p>
      </div>
      <Link
        href={movie.homepage}
        className='view-more-button bg-red-600 text-xl text-center py-2 mt-20 w-full block rounded-lg hover:bg-red-900'>
        Play Now{" "}
      </Link>
    </div>
  );
}

export default Overview;
