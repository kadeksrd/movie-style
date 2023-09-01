import request from "@api/api";
import Overview from "@components/Overview/overview";
import Cast from "@components/cast/cast";
import Row from "@components/row";
import React from "react";

function Detail({ movie, video, casts }) {
  return (
    <>
      {movie ? (
        <div className='tv-section'>
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
            <Overview movie={movie} />
          </div>
        </div>
      ) : (
        <div className='flex justify-center align-center relative h-100'>
          <div
            class='inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]'
            role='status'>
            <span class='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
              Loading...
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default Detail;
