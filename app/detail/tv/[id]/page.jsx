"use client";

import axios from "@api/axios";
import Link from "next/link";
import { useState, useEffect } from "react";

const Details = ({ params }) => {
  const [movie, setMovie] = useState(null);
  const [video, setVideo] = useState(null);

  // Membuat URL untuk mengambil detail film berdasarkan ID dari params
  const movieUrl = `/tv/${params.id}?language=en-US`;
  const videosUrl = `/tv/${params.id}/videos?language=en-US`;

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
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }
    fetchData();
  }, [movieUrl]);

  console.log(movie);

  // Menampilkan judul film jika data sudah tersedia
  return (
    <section className='pt-20 bg-black text-white'>
      {movie ? (
        <div className='mx-3 mx-5 p-8 bg-gray-800/50 bg-opacity-5 rounded-lg'>
          <h1 className='text-4xl text-center mb-8'>{movie.original_name}</h1>
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
            <div className='card w-full mx-5 px-5 mt-5 pt-2  pb-5 mb-0 bg-gray-400/25 rounded-xl'>
              <div className='imdb-rate flex justify-between py-4 items-center gap-5'>
                <h3 className='text-2xl'>People Rates</h3>
                <div className='justify-self-end'>
                  <div className='relative w-16 h-16'>
                    <svg
                      className='absolute inset-0'
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
      ) : (
        <div className='flex justify-center align-center relative'>
          <h1>Loading...</h1>
        </div>
      )}
    </section>
  );
};

export default Details;
