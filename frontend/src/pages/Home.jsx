import Layout from "../components/layout/Layout";

import Hero from "../components/home/Hero";
import CategorySection from "../components/home/CategorySection";
import FeaturedProducts from "../components/home/FeaturedProducts";

function Home() {
  return (
    <Layout>

      <Hero />

      <CategorySection />

      <FeaturedProducts />

    </Layout>
  );
}

export default Home;