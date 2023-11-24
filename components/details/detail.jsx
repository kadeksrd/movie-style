import request from "@api/api";
import Overview from "@components/Overview/overview";
import Cast from "@components/cast/cast";
import Row from "@components/row";
import React from "react";

function Detail({ movie, video }) {
  return (
    <>
      {movie && (
        <div className='tv-section p-2'>
          <h1 className='py-2 md:py-0 text-2xl md:text-4xl text-center mb-8'>
            {movie.original_name || movie.title}
          </h1>
          <div className='block md:flex lg:flex'>
            {video && (
              <div className='py-1 md:py-5'>
                <iframe
                  title={video.name}
                  width='800'
                  height='500'
                  src={`https://www.youtube.com/embed/${video.key}`}
                  frameBorder='0'
                  allowFullScreen
                  className='rounded-lg hidden md:block lg:block'></iframe>

                <iframe
                  title={video.name}
                  src={`https://www.youtube.com/embed/${video.key}`}
                  frameBorder='0'
                  width={`100%`}
                  height={300}
                  allowFullScreen
                  style={{ minWidth: "300", minHeight: "300" }}
                  className='rounded-lg block md:hidden lg:hidden'></iframe>
              </div>
            )}
            <Overview movie={movie} />
          </div>
        </div>
      )}
    </>
  );
}

export default Detail;
