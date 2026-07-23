import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { useLocation } from "react-router-dom";

function Layout({ children }) {
  const { pathname } = useLocation();

  const hideFooter =
    pathname === "/login" ||
    pathname === "/register";

  return (
    <>
      <Navbar />

      <main>
        {children}
      </main>

      {!hideFooter && <Footer />}
    </>
  );
}

export default Layout;