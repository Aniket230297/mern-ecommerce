function Hero() {
  return (
    <section className="bg-blue-600 text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Discover Amazing Products
            </h1>

            <p className="mt-6 text-lg text-blue-100">
              Shop electronics, fashion, accessories and much more with the best prices.
            </p>

            <button className="mt-8 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Shop Now
            </button>

          </div>

          <div className="hidden md:flex justify-center">

            <img
              src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=800"
              alt="Shopping"
              className="rounded-xl shadow-lg"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;