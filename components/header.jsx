"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [show, handleShow] = useState(false);

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
  }, [currentPath == "/"]);

  return (
    <>
      {currentPath == "/" ? (
        <nav
          className={`nav fixed w-full py-6 mx-auto z-10 ${
            show ? "bg-black" : "bg-transparent"
          }`}>
          <div
            className={`${show ? `px-5 scale-x-5` : `px-14`} grid grid-cols-2`}>
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
                ["Movie", "/movie"],
                ["Series", "/series"],
              ].map(([title, url]) => (
                <Link
                  className={`hover:text-slate-300 text-white ${
                    currentPath === url ? "text-slate-300" : ""
                  }`}
                  key={title}
                  href={url}>
                  {title}
                </Link>
              ))}
            </div>
          </div>
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
                ["Discover", "/discover"],
                ["Movie", "/movie"],
                ["Series", "/series"],
              ].map(([title, url]) => (
                <Link
                  className={`hover:text-slate-300 text-white ${
                    currentPath === url ? "text-slate-300" : ""
                  }`}
                  key={title}
                  href={url}>
                  {title}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
