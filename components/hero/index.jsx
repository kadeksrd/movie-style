import request from "@api/api";
import axios from "@api/axios";
import { lazy, useEffect, useState } from "react";
import "./hero.css";
import Loading from "@components/loading";
const Link = lazy(() => import("next/link"));

export default function Hero() {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const requests = await axios.get(request.hero);
      setIsLoading(false);
      setMovie(requests.data.results[length]);
      return requests;
    }
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading
          count={1}
          height={100}
        />
      ) : (
        <header
          className='hero'
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          }}>
          <div className='hero-overlay relative bg-black opacity-50'></div>{" "}
          <div className='absolute inset-0 flex items-center'>
            <div className='px-5 md:px-16 lg:px-16 mx-auto text-white text-left'>
              <h1 className='py-2 text-xl md:text-4xl lg:text-4xl font-bold mb-4'>
                {movie?.title || movie?.name || movie?.original_name}
              </h1>
              <p className='py-3 lg:w-1/2 text-sm md:text-lg lg:text-lg mb-4'>
                {movie.overview}
              </p>
              <Link
                href={`/detail/${
                  movie.media_type === "movie" || !movie.media_type
                    ? "movie"
                    : "tv"
                }/${movie.id}`}
                className='mt-6 bg-red-600 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-700'>
                Play Now
              </Link>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
