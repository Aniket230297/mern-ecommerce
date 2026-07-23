import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <App />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#fff",
              color: "#111827",
              borderRadius: "10px",
              padding: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            },
          }}
        />
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>,
);
6