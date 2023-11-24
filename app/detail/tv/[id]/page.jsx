"use client";

import request from "@api/api";
import axios from "@api/axios";
import Overview from "@components/Overview/overview";
import Cast from "@components/cast/cast";
import Detail from "@components/details/detail";
import Loading from "@components/loading";
import Row from "@components/row";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const Details = ({ params }) => {
  const [movie, setMovie] = useState(null);
  const [video, setVideo] = useState(null);
  const [casts, setCasts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Membuat URL untuk mengambil detail film berdasarkan ID dari params
  const movieUrl = `/tv/${params.id}?language=en-US`;
  const videosUrl = `/tv/${params.id}/videos?language=en-US`;
  const castUrl = `/tv/${params.id}/credits?language=en-US`;

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
        setLoading(false);
        setCasts(castResponse.data.cast); // Mengambil properti cast dari respons API
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }
    fetchData();
  }, [movieUrl, videosUrl, castUrl]);

  return (
    <section className='pt-20 bg-black text-white'>
      {loading ? (
        <div className='mx-3 md:mx-8 md:p-8 bg-gray-800/50 bg-opacity-5 rounded-lg py-4'>
          <Loading
            count={3}
            height={30}
            className={"mt-3"}
          />
        </div>
      ) : (
        <div className='mx-3 md:mx-8 md:p-8 bg-gray-800/50 bg-opacity-5 rounded-lg py-3'>
          <Detail
            movie={movie}
            video={video}
          />
          <Cast
            casts={casts}
            loading={loading}
          />
          <Row
            title='Recommendation'
            fetchUrl={request.popularSeries}
            isLargeRow
            slide
          />{" "}
        </div>
      )}
    </section>
  );
};
export default Details;
