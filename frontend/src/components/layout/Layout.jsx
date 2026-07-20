import Navbar from "../layout/Navbar"
import Footer from "../layout/Footer";

function Layout({ children }) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {children}
      </main>

      <Footer />
    </>
  );
}

export default Layout;