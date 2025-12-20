import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from '../assets/Lixiphile.png'

function Profile() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: storedUser.name,
    email: storedUser.email
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    const res = await axios.put(
      `https://vocabbackend-5h4t.onrender.com/users/${storedUser.id}`,
      { ...storedUser, ...form }
    );

    localStorage.setItem("user", JSON.stringify(res.data));
    alert("Profile Updated!");
    navigate("/");
  };

  return (
    <div >

      {/* Header */}
      <div className="relative h-24 bg-[#2563eb] flex justify-center items-center shadow-lg">
        <h1 className="text-3xl italic font-semibold text-white">
          Profile
          <img
            src={logo}
            alt="App Logo"
            className="absolute
                      left-4
                      bottom-2
                      h-25 w-60"
          />

        </h1>

        <Link
          to="/dashboard"
          className="absolute left-6 bottom-2
                     bg-white text-[#2563eb]
                     px-4 py-2 rounded-xl
                     border border-[#3b82f6]
                     shadow-md hover:bg-blue-100 transition">
          ← Back
        </Link>
      </div>

      {/* Profile Card */}
      <div className="max-w-xl mx-auto mt-20 p-10
                      bg-white rounded-3xl shadow-2xl">

        <p className="text-center italic text-gray-600 mb-8">
          Keep your profile updated — it helps personalize your learning journey!
        </p>

        <div className="space-y-6">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border-2 p-3 rounded-xl
                       focus:outline-none focus:border-[#2563eb]"
            placeholder="Name"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border-2 p-3 rounded-xl
                       focus:outline-none focus:border-[#2563eb]"
            placeholder="Email"
          />

          <button
            onClick={updateProfile}
            className="block mx-auto mt-4
                       px-8 py-2 rounded-3xl
                       bg-[#2563eb] text-white
                       border-2 border-black
                       hover:bg-[#1d4ed8] transition"
          >
            Update Profile
          </button>
        </div>

      </div>

    </div>
  );
}

export default Profile;
