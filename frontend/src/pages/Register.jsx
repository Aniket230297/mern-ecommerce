import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
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
      setLoading(true);

      const { data } = await API.post("/auth/register", form);

      login(data.user, data.token);

      toast.success("Registration Successful");

      navigate("/");
    } catch (error) {
      toast.error (error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#F8FAFC] px-4 py-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-2">
        {/* Left Side */}

        <div className="hidden lg:flex flex-col justify-center items-center bg-[#EEF2FF] p-8">
          <img
            src="/images/login-banner.svg"
            alt="Register"
            className="w-full max-w-sm object-contain"
          />

          <h2 className="text-4xl font-bold text-slate-800 mt-6">
            Join ShopSphere
          </h2>

          <p className="text-slate-600 text-center mt-3 max-w-sm">
            Create your account and start shopping thousands of amazing
            products.
          </p>
        </div>

        {/* Right Side */}

        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-[320px] mx-auto">
            <h1 className="text-4xl font-bold text-slate-900 text-center">
              Create Account
            </h1>

            <p className="text-center text-slate-500 mt-2">
              Welcome! Please fill in your details.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Name */}

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Full Name
                </label>

                <div className="mt-2 flex items-center bg-slate-50 border rounded-xl px-4">
                  <FaUser className="text-slate-400" />

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent px-3 py-2.5 outline-none"
                  />
                </div>
              </div>

              {/* Email */}

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Email
                </label>

                <div className="mt-2 flex items-center bg-slate-50 border rounded-xl px-4">
                  <FaEnvelope className="text-slate-400" />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent px-3 py-2.5 outline-none"
                  />
                </div>
              </div>

              {/* Password */}

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>

                <div className="mt-2 flex items-center bg-slate-50 border rounded-xl px-4">
                  <FaLock className="text-slate-400" />

                  <input
                    type="password"
                    name="password"
                    placeholder="Minimum 6 characters"
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full bg-transparent px-3 py-2.5 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#4361EE] hover:bg-[#3A56D4] text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center mt-8 text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#4361EE] font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
