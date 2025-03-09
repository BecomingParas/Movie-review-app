import * as React from "react";

export const Navigation: React.FC = () => {
  return (
    <nav className="flex flex-wrap gap-5 justify-between self-stretch w-full text-sm font-semibold tracking-widest leading-none max-w-[1268px] max-md:max-w-full">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/a8a5dc41e8d040d4cca9d38a1dc94f8242644a4105ba5b533d386e4cee4aa1bc?placeholderIfAbsent=true"
        alt="Logo"
        className="object-contain shrink-0 aspect-[0.92] w-[85px]"
      />
      <div className="flex gap-6 my-auto max-md:max-w-full">
        <a href="#" className="grow text-rose-600">
          Home
        </a>
        <a href="#" className="basis-auto">
          Distributions
        </a>
        <a href="#">Production</a>
        <a href="#">About Us</a>
        <a href="#">Contact Us</a>
      </div>
    </nav>
  );
};
