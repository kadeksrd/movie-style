import request from "@api/api";
import axios from "@api/axios";
import { useEffect, useState } from "react";
import "./hero.css";

export default function Hero() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const requests = await axios.get(request.hero);
      setMovie(requests.data.results[length]);
      return requests;
    }
    fetchData();
  }, []);
  console.log(movie);

  const playMovieHero = (usr) => {
    if (usr) {
      return console.log("ok");
    }
  };

  return (
    <header
      className='hero w-screen h-screen'
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}>
      <div className='hero-overlay absolute inset-0 bg-black opacity-50'></div>{" "}
      <div className='absolute inset-0 flex items-center'>
        <div className='w-11/12 mx-auto text-white text-left'>
          <h1 className='py-2 text-4xl font-bold mb-4'>
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <p className='py-2 w-1/2 text-lg mb-4'>{movie.overview}</p>
          <button className='mt-4 bg-red-600 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-700'>
            Tonton Sekarang
          </button>
        </div>
      </div>
    </header>
  );
}
