import * as React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="flex relative flex-col px-0.5 pt-12 w-full text-sm leading-6 text-center min-h-[119px] text-stone-300 max-md:max-w-full">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/804faabcad3196fcb8727790ec2997e1962cf3a305d64f289a1eb5edd1ef16e0?placeholderIfAbsent=true"
        alt="Footer background"
        className="object-cover absolute inset-0 size-full"
      />
      <div className="relative px-16 py-6 bg-neutral-900 max-md:px-5 max-md:max-w-full">
        © 2023 All rights reserved. Developed at XeonWare. Build with XeonWare.
      </div>
    </footer>
  );
};
