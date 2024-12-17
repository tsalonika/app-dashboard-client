import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignInIllustrator from "../assets/images/sign-in-illustrator.png";
import { CustomButton } from "../components";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3030/api/users/login",
        {
          username,
          password,
        }
      );
      console.log(response);
      localStorage.setItem("successLogin", "true");
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || "An error occurred during login");
      } else {
        setError("An error occurred during login");
      }
    }
  };

  return (
    <div className="flex w-full" style={{ height: "100vh" }}>
      <div className="w-1/2 bg-[#237D31] h-full flex items-center justify-center flex-col py-10">
        <img src={SignInIllustrator} className="w-40" alt="illustrator" />
        <p className="text-white text-xl font-bold">
          Pusat Riset Siber dan Analisis Informasi (PRISAI)
        </p>
        <p className="text-black font-bold text-3xl w-3/4 mt-32 text-center">
          Solusi Tepat Menganalisa Pengaruh{" "}
          <span className="text-white">
            Akun, Hashtag & Fake Account (Avatar) Media Sosial
          </span>
        </p>
      </div>
      <div className="w-1/2 py-14 px-11">
        <p className="text-[#237D31] font-bold text-3xl">Sign In</p>
        <p className="text-black text-xl font-bold">
          New User? Please, Join Us and Enjoy our Service
        </p>
        {error && <p className="text-red-500">{error}</p>}
        <form
          className="flex flex-col gap-10 mt-16"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-4">
            <span className="text-sm text-gray-600 font-semibold">
              Username
            </span>
            <input
              type="text"
              placeholder="Masukkan username"
              className="p-2 border-gray-300 border rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-sm text-gray-600 font-semibold">
              Password
            </span>
            <input
              type="password"
              placeholder="Masukkan password"
              className="p-2 border-gray-300 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <CustomButton handleOnClick={handleLogin}>Sign In</CustomButton>
        </form>
      </div>
    </div>
  );
};

export default Login;
