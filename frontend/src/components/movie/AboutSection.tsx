import * as React from "react";

export const AboutSection: React.FC = () => {
  return (
    <section className="flex relative flex-col mt-0 min-h-[605px] max-md:max-w-full">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/f4dd6425d1911fec133fdce9912bd75d083898a3a94ddfd9b14c20073c3e9447?placeholderIfAbsent=true"
        alt="Background"
        className="object-cover absolute inset-0 size-full"
      />
      <div className="flex relative z-10 flex-col items-center px-16 pt-24 pb-40 -mt-1 w-full bg-neutral-900 max-md:px-5 max-md:pb-24 max-md:max-w-full">
        <div className="mb-0 w-full max-w-[1118px] max-md:mb-2.5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="w-[62%] max-md:ml-0 max-md:w-full">
              <div className="max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                  <div className="w-2/5 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col items-start w-full text-white max-md:mt-4">
                      <div className="flex gap-2.5 text-2xl font-medium leading-tight">
                        <h2 className="grow">About us</h2>
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/ffc5ce2cec03e37b09113a5530a06ea4853934e298588f021f3a4be5dde10492?placeholderIfAbsent=true"
                          alt="Decoration"
                          className="object-contain shrink-0 self-end mt-6 aspect-[30.3] w-[60px]"
                        />
                      </div>
                      <p className="self-stretch mt-9 text-base leading-7">
                        Atiframe is one of the best website builders that let
                        you made a stunning website without coding knowledge. 20
                        design versions available to install in 1 click!
                      </p>
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/fb0fb847b922376510bf99cf74531949a4fc4edd9e0a0e6b6def5987b3cd3e6d?placeholderIfAbsent=true"
                        alt="Logo"
                        className="object-contain mt-10 max-w-full rounded-none aspect-[3.5] w-[140px]"
                      />
                    </div>
                  </div>
                  <div className="ml-5 w-3/5 max-md:ml-0 max-md:w-full">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/ad34604308deba804936a833f8c7478719b004cb219210911866e8b1d7df8c29?placeholderIfAbsent=true"
                      alt="About illustration"
                      className="object-contain mt-12 w-full bg-blend-lighten aspect-[1.85] max-md:mt-10"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-5 w-[38%] max-md:ml-0 max-md:w-full">
              <div className="flex grow gap-5 justify-between max-md:mt-10">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/602b756567a5c7650cf1edc84408de66e0aaed9cc8ec4b87e20affc23dc15967?placeholderIfAbsent=true"
                  alt="Partner logo"
                  className="object-contain shrink-0 max-w-full aspect-[0.62] w-[171px]"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/f5b7a7c10eb9908d798b39dff0c90efce3d4e4bfdf80c1b067a0cf7932762b90?placeholderIfAbsent=true"
                  alt="Partner logo"
                  className="object-contain shrink-0 max-w-full aspect-[0.51] w-[140px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
