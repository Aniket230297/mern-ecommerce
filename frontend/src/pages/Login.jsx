import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate(user.role === "admin" ? "/admin" : "/", {
        replace: true,
      });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", form);

      login(data.user, data.token);

      toast.success("Login Successful");

      navigate(data.user.role === "admin" ? "/admin" : "/", {
        replace: true,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] bg-slate-100 flex items-center justify-center px-4 overflow-hidden">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-[42%_58%]">
        {/* Left */}

        <div className="hidden lg:flex flex-col justify-center items-center bg-blue-50 px-10">
          <h2 className="text-4xl font-bold text-slate-800">Welcome Back!</h2>

          <p className="text-slate-600 text-center mt-4 max-w-sm">
            Login to continue shopping your favourite products.
          </p>

          <img
            src="/images/login-banner.svg"
            alt="Shopping"
            className="w-full max-w-sm h-auto object-contain mt-8"
          />
        </div>

        {/* Right */}

        <div className="flex items-center justify-center px-10">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold text-center mb-8">Login</h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 font-medium">Email Address</label>

                <div className="flex items-center border rounded-xl px-4">
                  <FaEnvelope className="text-gray-400" />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full py-3 px-3 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">Password</label>

                <div className="flex items-center border rounded-xl px-4">
                  <FaLock className="text-gray-400" />

                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full py-3 px-3 outline-none"
                  />
                </div>
              </div>

              <div className="text-right">
                <button
                  type="button"
                  className="text-blue-600 text-sm hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8]  text-white py-3 rounded-xl font-semibold"
              >
                Login
              </button>

              {/* <div className="flex items-center gap-3">

                <hr className="flex-1" /> */}

              {/* <span className="text-gray-400">
                  OR
                </span>

                <hr className="flex-1" /> */}

              {/* </div> */}

              {/* <button
                type="button"
                className="w-full border rounded-xl py-4 hover:bg-gray-50"
              >
                Continue with Google
              </button> */}
            </form>

            <p className="text-center mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 font-semibold">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
