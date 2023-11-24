"use client";

import request from "@api/api";
import axios from "@api/axios";
import Cast from "@components/cast/cast";
import Detail from "@components/details/detail";
import Loading from "@components/loading";
import Row from "@components/row";
import { useState, useEffect } from "react";

const Details = ({ params }) => {
  const [movie, setMovie] = useState(null);
  const [video, setVideo] = useState(null);
  const [casts, setCasts] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setCasts(castResponse.data.cast);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // Set loading to false after a delay
        setTimeout(() => {
          setLoading(false);
        }, 1000); // Adjust the delay as needed
      }
    }
    fetchData();
  }, [movieUrl, videosUrl, castUrl]);

  return (
    <section className='pt-20 bg-black text-white'>
      {loading ? (
        <div className='mx-3 md:mx-8 md:p-8 bg-gray-800/50 bg-opacity-5 rounded-lg py-4'>
          <Loading
            count={4}
            height={20}
            className={"mt-4"}
          />
        </div>
      ) : (
        <div className='mx-3 md:mx-8 md:p-8 bg-gray-800/50 bg-opacity-5 rounded-lg py-4'>
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
          />
        </div>
      )}
    </section>
  );
};

export default Details;
