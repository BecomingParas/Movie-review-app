import React from "react";

/**
 * AboutSection Component
 *
 * @component
 * @description Company information section with features and partner logos.
 *
 * @example
 * ```tsx
 * <AboutSection />
 * ```
 *
 * Features:
 * - Company description
 * - Feature highlights
 * - Partner logos
 * - Background image with overlay
 *
 * Layout:
 * - Two-column grid on desktop
 * - Single column on mobile
 * - Responsive images
 *
 * Styling:
 * - Custom background
 * - Responsive spacing
 * - Flexible grid system
 *
 * Accessibility:
 * - Alt text for images
 * - Semantic HTML
 * - Proper heading hierarchy
 */
export const AboutSection = () => {
  return (
    <section className="relative py-12 sm:py-24 overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/ceb28d0c4858ab79239b5dadd24b81ae8975f08f307d56ac93ad4a447a537d6d?placeholderIfAbsent=true)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <div className="flex items-center gap-2 mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl text-white font-medium">
                    About us
                  </h2>
                  <div className="w-[40px] sm:w-[60px] h-[2px] bg-red-500 mt-2" />
                </div>

                <p className="text-white/90 text-sm sm:text-base leading-relaxed sm:leading-7 mb-6 sm:mb-8">
                  Atiframe is one of the best website builders that let you made
                  a stunning website without coding knowledge. 20 design
                  versions available to install in 1 click!
                </p>

                <img
                  src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/e743ff0bd30177c23a5c2645d11b1f3f1880913c9b6e143d3fb12898a642567c?placeholderIfAbsent=true"
                  alt="About Feature"
                  className="w-[100px] sm:w-[140px]"
                />
              </div>

              <div className="hidden sm:block">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/ad34604308deba804936a833f8c7478719b004cb219210911866e8b1d7df8c29?placeholderIfAbsent=true"
                  alt="About Image"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row justify-between gap-6">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/602b756567a5c7650cf1edc84408de66e0aaed9cc8ec4b87e20affc23dc15967?placeholderIfAbsent=true"
              alt="Feature 1"
              className="h-[120px] sm:h-[171px] object-contain"
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/f5b7a7c10eb9908d798b39dff0c90efce3d4e4bfdf80c1b067a0cf7932762b90?placeholderIfAbsent=true"
              alt="Feature 2"
              className="h-[100px] sm:h-[140px] object-contain"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mt-8 sm:mt-12">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/b298085c271b3a151d22b629a97f5fcffffbaef3efc75af8180823a524bf242f?placeholderIfAbsent=true"
            alt="Partner 1"
            className="w-full"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/568d84cc2b0e847272060e34485559922b7bbae72101849297b16228d7edb14d?placeholderIfAbsent=true"
            alt="Partner 2"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
};
