"use client";

import request from "@api/api";
import axios from "@api/axios";
import Row from "@components/LandingPage/row/row";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const Details = ({ params }) => {
  const [movie, setMovie] = useState(null);
  const [video, setVideo] = useState(null);
  const [casts, setCasts] = useState([]);

  const movieUrl = `/movie/${params.id}?language=en-US`;
  const castUrl = `/movie/${params.id}/credits?language=en-US`;
  const videosUrl = `/movie/${params.id}/videos?language=en-US`;

  useEffect(() => {
    async function fetchData() {
      try {
        const movieResponse = await axios.get(movieUrl);
        setMovie(movieResponse.data);

        const videosResponse = await axios.get(videosUrl);
        const trailer = videosResponse.data.results.find(
          (video) => video.type === "Trailer"
        );
        if (trailer) {
          setVideo(trailer);
        }

        const castResponse = await axios.get(castUrl);
        setCasts(castResponse.data.cast); // Mengambil properti cast dari respons API
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [movieUrl, videosUrl, castUrl]);

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

  console.log(handlePagination());

  return (
    <section className='pt-20 bg-black text-white'>
      {movie ? (
        <div className='mx-3 mx-5 p-8 bg-gray-800/50 bg-opacity-5 rounded-lg'>
          <div className='movie-section '>
            <h1 className='text-4xl text-center mb-8'>{movie.title}</h1>
            <div className='flex'>
              {video && (
                <div className='py-5'>
                  <iframe
                    title={video.name}
                    width='800'
                    height='500'
                    src={`https://www.youtube.com/embed/${video.key}`}
                    frameBorder='0'
                    allowFullScreen
                    className='rounded-lg'></iframe>
                </div>
              )}
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
                            strokeDashoffset:
                              100 - Math.round(movie.vote_average * 10),
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
            </div>
          </div>
          <div className='cast-section my-20  mb-5 px-3 divide-y'>
            <div className='px-2 py-2 text-2xl'>Cast</div>
            <div className='flex items-center pt-8'>
              <button
                className='text-gray-500 mx-2 text-4xl rounded-xl'
                onClick={() => handlePagination("left")}>
                {"<"}
              </button>
              <div
                className='cast-list flex overflow-x-scroll gap-3'
                ref={cardRef}
                style={{ overflowX: "hidden" }}>
                {casts.map((actor) => (
                  <div
                    key={actor.id}
                    className='cast-item'>
                    {actor.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                        alt={actor.name}
                        className='cast-image w-40 h-40 rounded-xl flex-shrink-0'
                        style={{ maxWidth: "max-content" }}
                      />
                    ) : (
                      <div className='cast-image no-image w-32 h-32 rounded-full flex items-center justify-center'>
                        No Image Available
                      </div>
                    )}
                    <p className='text-white text-center mt-2'>{actor.name}</p>
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
          <div className='Recommendation'>
            <Row
              title='Recommendation'
              fetchUrl={request.popularMovie}
              isLargeRow
              slide
            />
          </div>
        </div>
      ) : (
        <div className='flex justify-center align-center relative'>
          <h1>Loading...</h1>
        </div>
      )}
    </section>
  );
};

export default Details;
