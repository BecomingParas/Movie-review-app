import React from "react";
import { SectionHeader } from "../common/SectionHeader";

/**
 * UpcomingMovies Component
 *
 * @component
 * @description Showcases upcoming movie releases with a featured movie
 * and side thumbnails for additional previews.
 *
 * @example
 * ```tsx
 * <UpcomingMovies />
 * ```
 *
 * Features:
 * - Large featured movie preview
 * - Side thumbnails for additional movies
 * - Movie details overlay
 * - Partner logos section
 *
 * Layout:
 * - 12-column grid on large screens
 * - Stacked layout on mobile
 * - Responsive images and text
 *
 * Accessibility:
 * - Alt text for all images
 * - Proper heading hierarchy
 * - Semantic HTML structure
 */
export const UpcomingMovies = () => {
  return (
    <section className="py-8 sm:py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Upcoming Movies"
          showMore
          onShowMore={() => console.log("Show more clicked")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8">
          <div className="lg:col-span-8">
            <div className="relative h-[300px] sm:h-[562px] overflow-hidden rounded-lg">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/41b1779ae6672e933ccb4af54f892cd023d7226b99ef329ff7744aeadf139a64?placeholderIfAbsent=true"
                alt="Kung Fu Panda 4"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-10 bg-gradient-to-t from-black/80">
                <h3 className="text-xl sm:text-2xl text-white font-normal mb-2">
                  Kung Fu Panda 4
                </h3>
                <p className="text-white/90 text-sm sm:text-base mb-4 max-w-2xl line-clamp-3 sm:line-clamp-none">
                  Po must train a new warrior when he's chosen to become the
                  spiritual leader of the Valley of Peace. However, when a
                  powerful shape-shifting sorceress sets her eyes on his Staff
                  of Wisdom,
                </p>
                <div className="flex items-center gap-2 text-white">
                  <span className="text-sm sm:text-base font-semibold">
                    2hr 10min
                  </span>
                  <span className="text-lg sm:text-xl">·</span>
                  <span className="text-sm sm:text-base font-semibold text-red-500">
                    Action
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-3 sm:space-y-6">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/ca9f759666c8e3b88f1cbf9073226c292b3730d335f3e0eb54338fcdca42f328?placeholderIfAbsent=true"
              alt="Upcoming 1"
              className="w-full aspect-[1.84] object-cover rounded-lg"
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/fb47d13edf41ab922e9b3ba4d3bf1fac2d6f288157ea6cea7578aa443935cab0?placeholderIfAbsent=true"
              alt="Upcoming 2"
              className="w-full aspect-[1.84] object-cover rounded-lg"
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/63a6ad5ffeda6740ef3bc6133fe5e02bd04f21286bd7cc78bc383ceeda394da0?placeholderIfAbsent=true"
              alt="Upcoming 3"
              className="w-full aspect-[1.84] object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center sm:justify-between items-center mt-8 gap-4">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/629ce1a3b8607aef7edc95612f5bd0adfb98537662f2003ad26fbc9a0d0f792b?placeholderIfAbsent=true"
            alt="Partner 1"
            className="h-20 sm:h-32 object-contain"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/127ec57dc3030a335113aacf40b1ab462eaa99df777dc0afe63db58d287cde7d?placeholderIfAbsent=true"
            alt="Partner 2"
            className="h-20 sm:h-32 object-contain"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/7ab1576baf3360b1bc9c4a2924f31f45defac0cb841c0430bd67365a5d7b5906?placeholderIfAbsent=true"
            alt="Partner 3"
            className="h-20 sm:h-32 object-contain"
          />
        </div>
      </div>
    </section>
  );
};
