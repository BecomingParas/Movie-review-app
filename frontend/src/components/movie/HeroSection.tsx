"use client";
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-[852px] max-md:h-auto max-md:pb-20">
      <div className="absolute top-60 left-[120px] max-md:static max-md:px-5 max-md:mt-10">
        <div className="flex items-center p-1.5 h-9 bg-white opacity-10 rounded-[200px] w-[329px] max-md:w-full">
          <span className="px-2.5 py-1.5 text-xs font-semibold tracking-widest text-white bg-rose-600 rounded-[200px]">
            NEW
          </span>
          <span className="ml-4 text-xs text-white opacity-80">
            Best of 2022
          </span>
        </div>
      </div>

      <h1 className="absolute top-80 text-9xl font-semibold tracking-tighter text-white left-[117px] max-md:static max-md:px-5 max-md:text-6xl max-md:mt-8">
        Avatar 2
      </h1>

      <div className="flex absolute gap-5 items-center left-[117px] top-[403px] max-md:static max-md:px-5 max-md:mt-6 max-md:flex-wrap">
        <div className="px-4 py-1.5 text-xl font-semibold text-white border border-solid border-stone-50">
          PG-18
        </div>
        <span className="text-lg font-semibold text-white opacity-[0.67]">
          3hr 10min
        </span>
        <div className="flex gap-1.5 items-center text-xl text-white">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/acc4d578b72dab60a84c14b42fc781f958869b91"
            alt="IMDb"
            className="h-[22px] w-[51px]"
          />
          <span>8.5</span>
        </div>
        <span className="text-xl text-white">2020</span>
      </div>

      <p className="absolute text-base leading-7 text-white opacity-50 left-[117px] top-[503px] w-[600px] max-md:static max-md:px-5 max-md:w-full max-md:mt-6">
        The Way of Water is a 2022 American epic science fiction film
        co-produced and directed by James Cameron, who co-wrote the screenplay
        with Rick Jaffa
      </p>

      <button className="absolute left-[117px] top-[602px] bg-[#FB1351] text-white w-[159px] h-[56px] flex items-center justify-center max-md:static max-md:mx-5 max-md:mt-8">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 6L14 10L8 14V6Z" fill="white" />
        </svg>
        <span className="ml-2 font-semibold tracking-wider">Watch Now</span>
      </button>

      <div className="absolute h-[324px] right-[99px] top-[287px] w-[562px] max-md:static max-md:w-full max-md:px-5 max-md:mt-12 max-md:h-[200px]">
        <div className="relative w-full h-full bg-black/50 rounded-xl cursor-pointer">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/168707785d6d2488dbdc66f00572884070871a8a"
            alt="Movie Trailer"
            className="w-full h-full object-cover rounded-xl opacity-50"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <svg
              width="60"
              height="60"
              viewBox="0 0 91 91"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="max-md:w-12 max-md:h-12"
            >
              <circle cx="45.5" cy="45.5" r="45.5" fill="white" />
              <path d="M34 28L66 45.5L34 63V28Z" fill="#FB1351" />
            </svg>
            <span className="mt-4 text-white text-sm opacity-80">
              Watch Trailer
            </span>
          </div>
        </div>
      </div>

      <div className="flex absolute left-10 justify-between px-10 py-0 w-full top-[420px] max-md:hidden">
        <button className="text-white cursor-pointer">
          <svg
            width="20"
            height="30"
            viewBox="0 0 20 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5455 29.0909L0 14.5455L14.5455 3.62396e-05L20 5.45458L10.9091 14.5455L20 23.6364L14.5455 29.0909Z"
              fill="white"
            />
          </svg>
        </button>
        <button className="text-white cursor-pointer">
          <svg
            width="20"
            height="30"
            viewBox="0 0 20 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.45455 -1.2716e-06L20 14.5455L5.45454 29.0909L-2.06636e-06 23.6364L9.09091 14.5455L-4.76851e-07 5.45454L5.45455 -1.2716e-06Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
