import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div
      className='bg-black px-3 w-full'
      style={{ marginTop: 80 }}>
      <div className='bg-black/25 px-3 py-10 md:flex lg:flex md:justify-between lg:justify-between'>
        <div>
          <Link
            className='text-4xl font-bold text-white px-2 md:px-5'
            href={`/`}>
            Movie<span className='text-red-600'>Style</span>
          </Link>
        </div>
        <div className='description divide-y mx-2 md:w-3/4 md:flex lg:flex md:justify-end lg:justify-end gap-5 py-7 md:py-0 lg:py-0'>
          <p className='text-base md:text-justify text-gray-200/75 leading-normal'>
            Embark on a cinematic journey with MovieStyle, a project that
            leverages the TMDB API to provide a comprehensive platform for
            exploring movies and TV shows you can easily access the movie
            description. thank you for viewing our website Greetings Kadek Surya
            Rena Dwipayana
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
