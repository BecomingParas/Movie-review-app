import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="px-0 pt-16 pb-0 bg-neutral-900">
      <div className="flex justify-around px-32 py-0 mb-16 max-md:px-5 max-md:flex-col max-md:gap-12">
        <section className="max-w-[275px] max-md:max-w-full max-md:text-center">
          <h2 className="text-2xl font-semibold text-white">About us</h2>
          <div className="mx-5 my-0 h-0.5 bg-white w-[60px] max-md:mx-auto" />
          <p className="text-white opacity-70 mt-4">
            Atiframe is one of the best website builders that let you made a
            stunning website without coding knowledge. 20 design versions
            available to install in 1 click!
          </p>
          <div className="flex gap-2.5 mt-5 max-md:justify-center">
            {["facebook", "linkedin", "twitter"].map((social) => (
              <button
                key={social}
                className="flex justify-center items-center w-10 h-10 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors"
                aria-label={`Follow us on ${social}`}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M14.1667 1.66675V5.00008H12.5C11.925 5.00008 11.6667 5.67508 11.6667 6.25008V8.33342H14.1667V11.6667H11.6667V18.3334H8.33333V11.6667H5.83333V8.33342H8.33333V5.00008C8.33333 4.11603 8.68452 3.26818 9.30964 2.64306C9.93476 2.01794 10.7826 1.66675 11.6667 1.66675H14.1667Z"
                    fill="white"
                  />
                </svg>
              </button>
            ))}
          </div>
        </section>

        <section className="max-md:text-center">
          <h2 className="text-2xl font-semibold text-white">Company</h2>
          <nav className="mt-8 flex flex-col gap-4">
            {[
              "What We Do",
              "Our Core Values",
              "Services",
              "Testimonials",
              "Recent News",
              "Contact Us",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white opacity-70 hover:opacity-100 transition-opacity"
              >
                {item}
              </a>
            ))}
          </nav>
        </section>

        <section className="max-md:text-center">
          <h2 className="text-2xl font-semibold text-white">Useful</h2>
          <nav className="mt-8 flex flex-col gap-4">
            {[
              "Support",
              "FAQ",
              "Live chat",
              "Privacy Policy",
              "Terms of use",
              "Sitemap",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white opacity-70 hover:opacity-100 transition-opacity"
              >
                {item}
              </a>
            ))}
          </nav>
        </section>
      </div>

      <div className="px-5 py-6 text-sm text-center bg-neutral-900 text-stone-300 border-t border-white/10">
        © 2023 All rights reserved. Developed at XeonWare. Build with XeonWare.
      </div>
    </footer>
  );
};

export default Footer;
