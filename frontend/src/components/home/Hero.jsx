
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const images = [
  "/images/banner4.jpg",
  "/images/banner2.jpg",
  "/images/banner3.jpg",
  "/images/banner1.jpg",
];

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="relative isolate min-h-[540px] overflow-hidden bg-slate-950 sm:min-h-[600px] lg:min-h-[660px]">
      {/* Background carousel */}
      {images.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            current === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        >
          <img
            src={img}
            alt=""
            fetchPriority={index === 0 ? "high" : "auto"}
            className={`h-full w-full object-cover transition-transform duration-[6000ms] ease-out ${
              current === index ? "scale-105" : "scale-100"
            }`}
          />
        </div>
      ))}

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-slate-950/10" />

      {/* Decorative glow */}
      <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[#4361EE]/20 blur-[110px]" />

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex min-h-[540px] max-w-7xl items-center px-5 py-16 sm:min-h-[600px] sm:px-8 lg:min-h-[660px] lg:px-12">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-md">
            <Sparkles size={16} className="text-indigo-300" />
            <span>Discover your next favorite</span>
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
        </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Shop the Latest
            <span className="mt-2 block bg-gradient-to-r from-indigo-300 via-[#7C91FF] to-white bg-clip-text text-transparent">
              Products & Trends
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
            Discover handpicked electronics, fashion, and everyday essentials.
            Find what you love and make every purchase count.
          </p>

          {/* Actions */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/products"
              className="group inline-flex items-center gap-3 rounded-xl bg-[#4361EE] px-7 py-4 font-semibold text-white shadow-xl shadow-[#4361EE]/30 transition duration-300 hover:-translate-y-0.5 hover:bg-[#3A56D4] hover:shadow-2xl hover:shadow-[#4361EE]/40 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Explore Products
              <ArrowRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur-sm transition duration-300 hover:border-white/60 hover:bg-white/15"
            >
              Discover More
            </Link>
          </div>

          {/* Bottom content */}
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/20 pt-6">
            <div>
              <p className="text-sm font-semibold text-white">
                Easy Shopping
              </p>
              <p className="mt-1 text-xs text-slate-300">
                A seamless experience
              </p>
            </div>

            <div className="hidden h-9 w-px bg-white/20 sm:block" />

            <div>
              <p className="text-sm font-semibold text-white">
                Great Finds
              </p>
              <p className="mt-1 text-xs text-slate-300">
                Products for every day
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel controls */}
      <div className="absolute bottom-7 right-5 z-20 flex items-center gap-3 sm:bottom-9 sm:right-10 lg:right-14">
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-md transition hover:bg-white hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-2.5 backdrop-blur-md">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={current === index ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ${
                current === index
                  ? "w-7 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-md transition hover:bg-white hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-10 left-5 z-10 hidden items-center gap-3 text-white/80 sm:left-8 sm:flex lg:left-12">
        <span className="text-2xl font-semibold tabular-nums text-white">
          {String(current + 1).padStart(2, "0")}
        </span>
        <span className="h-px w-8 bg-white/40" />
        <span className="text-sm tabular-nums">
          {String(images.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}

export default Hero;