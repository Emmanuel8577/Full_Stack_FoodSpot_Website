import React, { useState, useContext, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeOff } from "react-icons/hi"; 
import restaurantBg from "../../assets/images/restaurant.jpg";
import { FoodContext } from "../../context/FoodContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login"); // "Login", "Sign Up", or "Forgot Password"
  const [showPassword, setShowPassword] = useState(false); 
  const { token, setToken, navigate, url } = useContext(FoodContext);

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recoveryKey, setRecoveryKey] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${url}/api/user/register`, { name, email, password });
          
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          
          // Show them their key using an alert or modal so they don't miss it
          alert(`🎉 Account created! Write down your Secret Recovery Key to reset your password if forgotten:\n\n🔑 Key: ${response.data.recoveryKey}\n\nDo not share this key.`);
          toast.success("Account created successfully!");
        } else {
          toast.error(response.data.message);
        }
      } else if (currentState === "Login") {
        const response = await axios.post(`${url}/api/user/login`, { email, password });
        
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Welcome back!");
        } else {
          toast.error(response.data.message);
        }
      } else if (currentState === "Forgot Password") {
        // CALL RESET PASSWORD ENDPOINT
        const response = await axios.post(`${url}/api/user/reset-password`, { 
          email, 
          recoveryKey, 
          newPassword 
        });

        if (response.data.success) {
          toast.success(response.data.message);
          setCurrentState("Login"); // Return back to login screen smoothly
          setPassword("");
          setRecoveryKey("");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Auth Error:", error);
      toast.error(error.response?.data?.message || "Authentication failed.");
    }
  };

  // Google Authentication Integration
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const googleUserRes = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );
        const { name, email, sub } = googleUserRes.data;
        const response = await axios.post(`${url}/api/user/google-auth`, { name, email, googleId: sub });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Connected via Google!");
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        console.error("Google Auth Error:", err);
        toast.error("Google login failed.");
      }
    },
    onError: () => toast.error("Google Login Failed"),
  });

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
          <p className="text-3xl font-black text-orange-600 tracking-tight uppercase italic text-center">
            {currentState === "Forgot Password" ? "Reset Pass" : currentState}
          </p>
          <div className="h-1.5 w-12 bg-orange-600 rounded-full"></div>
        </div>

        {/* FULL NAME FIELD (SIGN UP ONLY) */}
        {currentState === "Sign Up" && (
          <div className="w-full">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              placeholder="Full Name"
              required
            />
          </div>
        )}

        {/* EMAIL FIELD (ALL STATES) */}
        <div className="w-full">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
            placeholder="Email address"
            required
          />
        </div>

        {/* RECOVERY KEY FIELD (FORGOT PASSWORD ONLY) */}
        {currentState === "Forgot Password" && (
          <div className="w-full">
            <input
              onChange={(e) => setRecoveryKey(e.target.value)}
              value={recoveryKey}
              type="text"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white uppercase"
              placeholder="6-Char Recovery Key"
              required
            />
          </div>
        )}

        {/* STANDARD PASSWORD FIELD (LOGIN/SIGNUP ONLY) */}
        {(currentState === "Login" || currentState === "Sign Up") && (
          <div className="w-full relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              placeholder="Password"
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-orange-600"
            >
              {showPassword ? <HiEyeOff size={22} /> : <HiEye size={22} />}
            </div>
          </div>
        )}

        {/* NEW PASSWORD FIELD (FORGOT PASSWORD ONLY) */}
        {currentState === "Forgot Password" && (
          <div className="w-full relative">
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              type={showPassword ? "text" : "password"}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              placeholder="Enter New Password"
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-orange-600"
            >
              {showPassword ? <HiEyeOff size={22} /> : <HiEye size={22} />}
            </div>
          </div>
        )}

        {/* TOGGLE NAVIGATION LINKS */}
        <div className="w-full flex justify-between text-sm text-gray-500 px-1">
          {currentState === "Login" ? (
            <p 
              onClick={() => setCurrentState("Forgot Password")}
              className="cursor-pointer hover:text-orange-600 transition-colors font-medium"
            >
              Forgot Password?
            </p>
          ) : (
            <p 
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer hover:text-orange-600 transition-colors font-medium"
            >
              Back to Login
            </p>
          )}

          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer hover:text-orange-600 font-black uppercase tracking-tighter"
            >
              Create Account
            </p>
          ) : currentState === "Sign Up" ? (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer hover:text-orange-600 font-black uppercase tracking-tighter"
            >
              Login Here
            </p>
          ) : null}
        </div>

        {/* PRIMARY SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full bg-orange-600 text-white font-black py-4 rounded-xl hover:bg-orange-700 active:scale-95 transition-all mt-4 text-lg shadow-lg uppercase tracking-widest"
        >
          {currentState === "Login" ? "Sign In" : currentState === "Sign Up" ? "Join Now" : "Update Password"}
        </button>

        {/* OAUTH AREA (HIDDEN DURING PASSWORD RESETS TO KEEP UI CLEAN) */}
        {(currentState === "Login" || currentState === "Sign Up") && (
          <>
            <div className="flex items-center w-full my-4">
              <div className="flex-1 h-[1px] bg-gray-200"></div>
              <p className="px-4 text-gray-400 text-[10px] font-black uppercase tracking-widest leading-none">
                Or connect with
              </p>
              <div className="flex-1 h-[1px] bg-gray-200"></div>
            </div>

            <button
              type="button"
              onClick={() => handleGoogleLogin()}
              className="flex items-center justify-center w-full gap-3 border-2 border-gray-100 py-3 rounded-xl hover:bg-gray-50 transition-all font-bold text-gray-700 hover:border-gray-300"
            >
              <FcGoogle size={24} />
              Google
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;