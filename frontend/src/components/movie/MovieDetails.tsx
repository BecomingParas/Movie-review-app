import * as React from "react";

export const MovieDetails: React.FC = () => {
  return (
    <section className="flex z-10 flex-col px-20 mt-16 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="w-full max-w-[1036px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="w-[58%] max-md:ml-0 max-md:w-full">
            <h1 className="text-9xl font-semibold tracking-tighter leading-none text-white max-md:mt-10 max-md:max-w-full max-md:text-4xl">
              Avatar 2
            </h1>
          </div>
          <div className="ml-5 w-[42%] max-md:ml-0 max-md:w-full">
            <div className="flex grow gap-4 mt-20 text-2xl font-semibold tracking-wide leading-10 text-white max-md:mt-10">
              <h2 className="flex-auto">Distributions Countries</h2>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/ffc5ce2cec03e37b09113a5530a06ea4853934e298588f021f3a4be5dde10492?placeholderIfAbsent=true"
                alt="Distribution indicator"
                className="object-contain shrink-0 self-end mt-8 aspect-[30.3] w-[60px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-10 items-start mt-5 max-w-full w-[941px]">
        <div className="flex flex-1 gap-10 self-start text-xl font-semibold leading-6 text-white whitespace-nowrap">
          <span className="px-2 py-1.5 my-auto border border-solid border-stone-50">
            PG-18
          </span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/40fbfe0a55fdeb9683e06a914ffdba3d32de501feab23cfd2bce3fb83d61546f?placeholderIfAbsent=true"
            alt="Rating"
            className="object-contain shrink-0 aspect-[1.97] w-[65px]"
          />
        </div>
        <div className="flex flex-1 gap-2 self-end mt-6 text-sm leading-6 text-gray-500">
          <p className="flex-auto">Trusted by the world's leading Theatres</p>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/f1d6e642f34ee89d70f028775f7b37bf733170b04664119a7abd7c7c66310286?placeholderIfAbsent=true"
            alt="Trust indicator"
            className="object-contain shrink-0 my-auto w-2 aspect-square"
          />
        </div>
      </div>
      <div className="flex gap-9 items-start self-center mt-2.5 w-full max-w-[1244px] max-md:max-w-full">
        <p className="grow shrink self-stretch text-base tracking-wide leading-7 text-white w-[587px] max-md:max-w-full">
          Eight thieves take hostages and lock themselves in the Royal Mint of
          Spain as a criminal mastermind manipulates the police to carry out his
          plan.
        </p>
        {/* Distribution flags section */}
        <div className="flex gap-4">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/1f79712daf91a702e4bdc0094f12be3d764ebdb7da42d6e6afa819c36b057d22?placeholderIfAbsent=true"
            alt="Flag"
            className="object-contain shrink-0 mt-3.5 w-16 aspect-[1.49]"
          />
          <div className="mt-3.5 bg-white">
            <div className="flex shrink-0 bg-green-700 h-[13px]" />
            <div className="flex shrink-0 bg-sky-700 h-[11px]" />
            <div className="flex shrink-0 bg-red-700 h-[13px]" />
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/14af78e3fd5217f8fd1a5079214caa9b6963c70146244a84c5998a375d27232b?placeholderIfAbsent=true"
            alt="Flag"
            className="object-contain shrink-0 mt-3.5 aspect-[1.51] w-[65px]"
          />
          <div className="flex gap-5 mt-3.5 bg-yellow-300">
            <div className="flex shrink-0 bg-rose-700 h-[43px] w-[22px]" />
            <div className="flex shrink-0 bg-lime-600 h-[43px] w-[22px]" />
          </div>
          <div className="flex gap-6 mt-3.5 bg-white">
            <div className="flex shrink-0 bg-sky-700 h-[43px] w-[21px]" />
            <div className="flex shrink-0 bg-rose-700 h-[43px] w-[21px]" />
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/cd361bc7fe9b1a27bb175f4911d7333b53a38e9761ebe45a2d89113dc7844b61?placeholderIfAbsent=true"
            alt="Flag"
            className="object-contain shrink-0 mt-3.5 w-16 aspect-[1.49]"
          />
        </div>
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/127ec57dc3030a335113aacf40b1ab462eaa99df777dc0afe63db58d287cde7d?placeholderIfAbsent=true"
        alt="Decoration"
        className="object-contain self-center mt-32 ml-10 max-w-full aspect-[1.52] w-[300px] max-md:mt-10"
      />
    </section>
  );
};
