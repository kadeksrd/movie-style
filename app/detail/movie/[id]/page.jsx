"use client";

import request from "@api/api";
import axios from "@api/axios";
import Overview from "@components/Overview/overview";
import Cast from "@components/cast/cast";
import Detail from "@components/details/detail";
import Row from "@components/row/Row";
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
      <div className='mx-3 mx-5 p-8 bg-gray-800/50 bg-opacity-5 rounded-lg'>
        <Detail
          movie={movie}
          video={video}
        />
        <Cast casts={casts} />
        <Row
          title='Recommendation'
          fetchUrl={request.popularSeries}
          isLargeRow
          slide
        />
      </div>
    </section>
  );
};

export default Details;
