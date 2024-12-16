import React from "react";
import profile from "../assets/profile.png";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <div className="flex h-[100vh] w-[100vw] justify-center items-center bg-gray-100">
      <div className="flex flex-col">
        <div className="flex flex-col justify-center items-center mb-32">
          <div className="text-5xl font-semibold text-black">Welcome to</div>
          <div className="text-6xl font-bold text-[#6358DC]">Unstop</div>
        </div>
        <div className="border border-gray-200 bg-white py-4 px-16 rounded-2xl">
          <div className="flex flex-col justify-center items-center">
            <img
              src={profile}
              alt="profile image"
              className="rounded-full h-28"
            />
            <div className="text-[#6358DC] text-lg font-bold pt-4">
              Michael Dam
            </div>
            <div className="pt-2 text-sm">example@gmail.com</div>
            <div className="text-sm">Female</div>
            <button
              className="bg-[#6358DC] text-gray-100 font-semibold py-3 px-14 rounded-2xl mt-4 mb-1"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
