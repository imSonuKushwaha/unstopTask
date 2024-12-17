import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginSide from "../assets/loginSide.png";
import googleLogo from "../assets/googleLogo.png";
import facebookLogo from "../assets/facebookLogo.png";
import userLogo from "../assets/userLogo.png";
import emailLogo from "../assets/emailLogo.png";
import keyLogo from "../assets/keyLogo.png";
import eyeLogo from "../assets/eyeLogo.png";
import eyeClosedLogo from "../assets/eyeClosedLogo.png";

const LoginPage = () => {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Check if user is already logged in
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      navigate("/main");
    }
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on input change
  };

  // Validate the form
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Username validation
    if (formData.username !== "emilys") {
      newErrors.username = "Username doesn't exist.";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Password validation
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          // email: formData.email,
          // expiresInMins: 30,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();

      localStorage.setItem("userData", JSON.stringify(data));

      navigate("/main");
    } catch (error) {
      console.error(error.message);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-around items-center h-full w-full bg-gray-100">
      <div className="h-[100vh] w-2/5 lg:flex justify-center items-center hidden">
        <img src={loginSide} alt="image" className="h-1/2" />
      </div>
      <div className="h-[100vh] w-3/4 lg:w-1/2 flex justify-center items-center">
        <div className="border border-gray-200 rounded-lg bg-white p-4 w-full 2xl:w-2/3">
          <div className="flex flex-col justify-start items-start">
            <div className="text-3xl font-semibold text-black">Welcome to</div>
            <div className="text-4xl font-bold text-[#6358DC]">Unstop</div>
            <div className="flex flex-col justify-between items-center gap-3 my-6 w-full">
              <button className="border border-gray-200 rounded-lg py-3 flex justify-center items-center w-full">
                <img src={googleLogo} alt="google Logo" className="h-6 mx-3" />
                <div className="text-sm font-semibold ">Login with Google</div>
              </button>
              <button className="border border-gray-200 rounded-lg py-3 flex justify-center items-center w-full">
                <img
                  src={facebookLogo}
                  alt="google Logo"
                  className="h-6 mx-3"
                />
                <div className="text-sm font-semibold ">
                  Login with Facebook
                </div>
              </button>
            </div>
            <div className="flex flex-row justify-between items-center w-full">
              <div className="border-t-2 flex-grow border-gray-300"></div>
              <div className="px-4 text-xs">OR</div>
              <div className="border-t-2 flex-grow border-gray-300"></div>
            </div>
            <form
              className="flex flex-col justify-between items-center gap-3 mt-6 w-full"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-row justify-start items-center bg-gray-100 border border-gray-200 rounded-lg p-2 w-full">
                <img src={userLogo} alt="userlogo" className="h-5 m-2" />
                <div className="flex flex-col">
                  <div className="text-xs ml-1">User name</div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className=" p-y0.5 px-1 rounded-lg focus:outline-none text-sm font-bold bg-gray-100 w-full"
                    placeholder="username"
                    required
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.username}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-row justify-start items-center bg-gray-100 border border-gray-200 rounded-lg p-2 w-full">
                <img src={emailLogo} alt="userlogo" className="h-5 m-2" />
                <div className="flex flex-col">
                  <div className="text-xs ml-1">Email</div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className=" p-y0.5 px-1 rounded-lg focus:outline-none text-sm font-bold bg-gray-100 w-full"
                    placeholder="email"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-row justify-between items-center bg-gray-100 border border-gray-200 rounded-lg p-2 w-full">
                <div className="flex flex-row justify-start items-center">
                  <img src={keyLogo} alt="userlogo" className="h-5 m-2" />
                  <div className="flex flex-col">
                    <div className="text-xs ml-1">Password</div>
                    <input
                      type={visible ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className=" p-y0.5 px-1 rounded-lg focus:outline-none text-sm font-bold bg-gray-100 w-full"
                      placeholder="password"
                      required
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>
                <button type="button" onClick={() => setVisible(!visible)}>
                  <img
                    src={visible ? eyeClosedLogo : eyeLogo}
                    alt="userlogo"
                    className="h-5 m-2"
                  />
                </button>
              </div>

              <div className="flex flex-row justify-between items-center w-full px-1 mt-4">
                <div className="flex flex-row">
                  <input
                    type="checkbox"
                    className="border-none bg-gray-400 mt-0.5"
                  />
                  <div className="ml-2 text-sm text-gray-700"> Remember me</div>
                </div>
                <a
                  href="/forgot-password"
                  className="text-blue-500 text-sm hover:text-blue-600 transition duration-200"
                >
                  Forgot Password?
                </a>
              </div>
              <button
                className="w-full bg-[#6358DC] rounded-lg py-4 mt-4 text-gray-100"
                type="submit"
              >
                Login
              </button>
            </form>
            <div className="flex flex-row text-sm justify-center items-center w-full mt-4 mb-2">
              <div className="pr-1">Don't have an account? </div>
              <a
                href="/forgot-password"
                className="text-blue-500 hover:text-blue-600 transition duration-200"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
