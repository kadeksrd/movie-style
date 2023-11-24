import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Loading({ count, height, className, duration }) {
  return (
    <div className=''>
      <Skeleton
        baseColor='#807e7e'
        count={count}
        height={height}
        className={className}
        duration={duration}
      />
    </div>
  );
}

export default Loading;
