import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/common/Loader";

import { getProfile, updateProfile } from "../services/user.service";

function Profile() {
  const [loading, setLoading] = useState(true);
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        setForm({
          name: data.user.name,
          email: data.user.email,
          password: "",
        });
      } catch (error) {
        toast.error("Unable to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProfile(form);

      localStorage.setItem("user", JSON.stringify(res.user));

      setUser(res.user);

      toast.success("Profile Updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update Failed");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-8 space-y-5"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-3 rounded"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-3 rounded"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="New Password (optional)"
          className="w-full border p-3 rounded"
        />

        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;
