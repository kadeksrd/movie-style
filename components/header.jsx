"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "@api/axios";

export default function Navbar() {
  const [show, handleShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const baseUrl = "https://image.tmdb.org/t/p/w200";

  const search_api = `/search/multi?query=${searchTerm}&include_adult=false&language=en-US&page=1`;

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    performSearch();
  };

  const TransitionNavbar = () => {
    if (window.scrollY > 50) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  // Mendapatkan URL saat ini
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";

  useEffect(() => {
    window.addEventListener("scroll", TransitionNavbar);
    return () => window.removeEventListener("scroll", TransitionNavbar);
  });

  const handleSearch = () => {
    setShowSearch(!showSearch);
  };

  const performSearch = async () => {
    try {
      const response = await axios.get(search_api);

      if (response.status === 200) {
        const data = response.data;
        setSearchResults(data.results);
      } else {
        console.error("Request failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const RenderResultsHome = () => {
    return (
      <div
        className={`w-full ${
          show ? "bg-black px-7" : "backdrop-blur-lg px-14"
        } text-white py-3`}
        style={{ overflowY: "auto", maxHeight: 1000 }}>
        <ul className=''>
          {searchResults.map((result) => (
            <Link
              key={result.id}
              href={`/detail/${
                result.media_type === "movie" || !result.media_type
                  ? "movie"
                  : "tv"
              }/${result.id}`}
              target='_blank'>
              <li className='hover:bg-gray-500/50 divide-y'>
                <div className='hidden md:block lg:block md:flex lg:flex px-4'>
                  <img
                    src={`${baseUrl}${result.poster_path}`}
                    alt=''
                    width={140}
                    height={180}
                    className='rounded-xl py-2'
                  />
                  <div className='grid px-3'>
                    <h4 className='text-xl'>
                      {(result && result.name) || result.title}
                    </h4>
                    <p className=''>{result.overview}</p>
                  </div>
                </div>
                <div className='block md:hidden lg:hidden px-2 flex'>
                  <img
                    src={`${baseUrl}${result.poster_path}`}
                    alt=''
                    width={70}
                    height={120}
                    className='rounded-xl py-2'
                  />
                  <div className='grid px-3'>
                    <h4 className='text-base flex items-center'>
                      {(result && result.name) || result.title}
                    </h4>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
  };

  const RenderResultsAll = () => {
    return (
      <div
        className={`w-full bg-transparent  px-7
         text-white py-3`}
        style={{ overflowY: "auto", maxHeight: 1000 }}>
        <ul>
          {searchResults.map((result) => (
            <Link
              key={result.id}
              href={`/detail/${
                result.media_type === "movie" || !result.media_type
                  ? "movie"
                  : "tv"
              }/${result.id}`}
              target='_blank'>
              <li className='hover:bg-gray-500/50 divide-y'>
                <div className='hidden md:block px-4 flex'>
                  <img
                    src={`${baseUrl}${result.poster_path}`}
                    alt=''
                    width={140}
                    height={180}
                    className='rounded-xl py-2'
                  />
                  <div className='grid px-3'>
                    <h4 className='text-xl'>
                      {(result && result.name) || result.title}
                    </h4>
                    <p className=''>{result.overview}</p>
                  </div>
                </div>
                <div className='block md:hidden lg:hidden px-2 flex'>
                  <img
                    src={`${baseUrl}${result.poster_path}`}
                    alt=''
                    width={70}
                    height={120}
                    className='rounded-xl py-2'
                  />
                  <div className='grid px-3'>
                    <h4 className='text-base flex items-center'>
                      {(result && result.name) || result.title}
                    </h4>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
  };
  return (
    <>
      {currentPath == "/" ? (
        <nav
          className={`nav fixed w-full py-6 mx-auto z-10 ${
            show ? "bg-black" : "bg-transparent"
          }`}>
          <div
            className={`${
              show ? `px-14 lg:px-5 md:px-5 scale-x-5` : `px-14`
            } grid grid-cols-2`}>
            <div className='logo'>
              <Link
                className='text-3xl font-bold text-white'
                href={`/`}>
                Movie<span className='text-red-600'>Style</span>
              </Link>
            </div>
            <div className='flex justify-end items-center space-x-8 font-semibold'>
              {[
                ["Home", "/"],
                ["Discover", "/discover"],
                ["Movie", "#movie"],
                ["Series", "#series"],
              ].map(([title, url]) => (
                <Link
                  className={`hover:text-slate-300 text-white hidden md:block lg:block ${
                    currentPath === url ? "text-slate-300" : ""
                  }`}
                  key={title}
                  href={url}>
                  {title}
                </Link>
              ))}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                fill='currentColor'
                className='bi bi-search hover:scale-125'
                viewBox='0 0 16 16'
                onClick={handleSearch}
                style={{ cursor: "pointer" }}>
                <path
                  d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'
                  fill='white'
                />
              </svg>
            </div>
          </div>
          {showSearch && (
            <form className={`${show ? "px-6" : "px-12"} mt-4`}>
              <input
                className='w-full px-5 py-3 rounded-xl'
                type='text'
                placeholder='Search...'
                value={searchTerm}
                onChange={handleChange}
              />
            </form>
          )}
          {showSearch && <RenderResultsHome />}
        </nav>
      ) : (
        <nav className={`nav fixed w-full py-4 mx-auto bg-black z-20`}>
          <div className={`px-5 scale-x-5 grid grid-cols-2`}>
            <div className='logo'>
              <Link
                className='text-3xl font-bold text-white'
                href={`/`}>
                Movie<span className='text-red-600'>Style</span>
              </Link>
            </div>
            <div className='flex justify-end items-center space-x-8 font-semibold'>
              {[
                ["Home", "/"],
                ["Discover", ""],
                ["Movie", "/movie"],
                ["Series", "/series"],
              ].map(([title, url]) => (
                <Link
                  className={`hover:text-slate-300 text-white hidden md:block lg:block ${
                    currentPath === url ? "text-slate-300" : ""
                  }`}
                  key={title}
                  href={url}>
                  {title}
                </Link>
              ))}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                fill='currentColor'
                className='bi bi-search hover:scale-125'
                viewBox='0 0 16 16'
                onClick={handleSearch}
                style={{ cursor: "pointer" }}>
                <path
                  d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'
                  fill='white'
                />
              </svg>
            </div>
          </div>
          {showSearch && (
            <form className={`${show ? "px-6" : "px-12"} mt-4`}>
              <input
                className='w-full px-5 py-3 rounded-xl'
                type='text'
                placeholder='Search...'
                value={searchTerm}
                onChange={handleChange}
              />
            </form>
          )}
          {showSearch && <RenderResultsAll />}
        </nav>
      )}
    </>
  );
}
