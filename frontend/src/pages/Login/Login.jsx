import React, { useState, useContext, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeOff } from "react-icons/hi"; 
import restaurantBg from "../../assets/images/restaurant.jpg";
import { FoodContext } from "../../context/FoodContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [showPassword, setShowPassword] = useState(false); 
  const { token, setToken, navigate, url } = useContext(FoodContext);

  // Form States
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        // Fixed: Ensuring the endpoint points to your Render URL via context
        const response = await axios.post(`${url}/api/user/register`, { name, email, password });
          
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Account created successfully!");
        } else {
          toast.error(response.data.message);
        }
      } else {
        // FIXED: Removed the double dollar sign typo ($$url)
        const response = await axios.post(`${url}/api/user/login`, {
          email,
          password,
        });
        
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Welcome back!");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Auth Error:", error);
      const errorMsg = error.response?.data?.message;

      if (currentState === "Login") {
        if (errorMsg === "User doesn't exist" || errorMsg === "Invalid credentials") {
          toast.error("Invalid email or password");
        } else {
          toast.error(errorMsg || "Login failed. Please try again.");
        }
      } else {
        toast.error(errorMsg || "Registration failed. Please check your details.");
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4 bg-cover bg-center bg-no-repeat relative bg-slate-900"
      style={{ backgroundImage: `url(${restaurantBg})` }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px]"></div>

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center w-full max-w-[400px] m-auto gap-4 text-gray-800 bg-white/95 p-10 rounded-3xl shadow-2xl relative z-10 border border-white/20"
      >
        <div className="flex flex-col items-center gap-1 mb-4">
          <p className="text-4xl font-black text-orange-600 tracking-tight uppercase italic">
            {currentState}
          </p>
          <div className="h-1.5 w-12 bg-orange-600 rounded-full"></div>
        </div>

        {currentState === "Sign Up" && (
          <div className="w-full">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-white"
              placeholder="Full Name"
              required
            />
          </div>
        )}

        <div className="w-full">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-white"
            placeholder="Email address"
            required
          />
        </div>

        <div className="w-full relative">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={showPassword ? "text" : "password"}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-white"
            placeholder="Password"
            required
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-orange-600 transition-colors"
          >
            {showPassword ? <HiEyeOff size={22} /> : <HiEye size={22} />}
          </div>
        </div>

        <div className="w-full flex justify-between text-sm text-gray-500 px-1">
          <p className="cursor-pointer hover:text-orange-600 transition-colors font-medium">
            Forgot Password?
          </p>
          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer hover:text-orange-600 font-black uppercase tracking-tighter"
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer hover:text-orange-600 font-black uppercase tracking-tighter"
            >
              Login Here
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 text-white font-black py-4 rounded-xl hover:bg-orange-700 active:scale-95 transition-all mt-4 text-lg shadow-lg uppercase tracking-widest"
        >
          {currentState === "Login" ? "Sign In" : "Join Now"}
        </button>

        <div className="flex items-center w-full my-4">
          <div className="flex-1 h-[1px] bg-gray-200"></div>
          <p className="px-4 text-gray-400 text-[10px] font-black uppercase tracking-widest leading-none">
            Or connect with
          </p>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>

        <button
          type="button"
          className="flex items-center justify-center w-full gap-3 border-2 border-gray-100 py-3 rounded-xl hover:bg-gray-50 transition-all font-bold text-gray-700 hover:border-gray-300"
        >
          <FcGoogle size={24} />
          Google
        </button>
      </form>
    </div>
  );
};

export default Login;