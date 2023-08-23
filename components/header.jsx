"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [show, handleShow] = useState("");

  const TransitionNavbar = () => {
    if (window.scrollY > 300) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", TransitionNavbar);
    return () => window.removeEventListener("scroll", TransitionNavbar);
  }, []);

  return (
    <nav
      className={`nav w-11/12 py-4 mx-auto
        inset-0 bg-transparent absolute z-10`}>
      <div className='grid grid-cols-2'>
        <div className='logo'>
          <h2 className='text-3xl font-bold'>
            Movie<span className='text-red-600'>Style</span>
          </h2>
        </div>
        <div className='flex justify-end items-center space-x-8 font-semibold'>
          {[
            ["Home", "/"],
            ["Discover", "/discover"],
            ["Movie", "/movie"],
            ["Series", "/series"],
          ].map(([title, url]) => (
            <Link
              className='hover:text-slate-300'
              key={title}
              href={url}>
              {title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
