import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[520px] overflow-hidden">
      {/* Images */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            current === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Shop the Latest Products
          </h1>

          <p className="mt-6 text-xl text-gray-200">
            Discover the best electronics, fashion and accessories at unbeatable
            prices.
          </p>

         <Link
  to="/products"
  className="inline-block mt-6 bg-[#4361EE] hover:bg-[#3A56D4] text-white px-8 py-3 rounded-xl font-semibold transition"
>
  Shop Now
</Link>

          {/* Dots */}
          <div className="flex gap-3 mt-8">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full transition ${
                  current === i ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
