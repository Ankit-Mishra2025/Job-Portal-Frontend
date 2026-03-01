import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, Mail, Lock, LogIn } from "lucide-react";
import { setLoading, setUser } from "@/redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ✅ single redirect effect (duplicate hata diya)
  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* 🔥 Center Wrapper */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-lg 2xl:max-w-xl">
          
          {/* Card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 sm:p-8 md:p-10">
            
            {/* Header */}
            <div className="mb-6 sm:mb-8 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                Welcome back
              </h1>
              <p className="text-sm sm:text-base text-gray-500">
                Sign in to your account to continue
              </p>
            </div>

            <form
              onSubmit={submitHandler}
              className="space-y-4 sm:space-y-5"
            >
              {/* Email */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">
                  Email address
                </Label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                  <Input
                    type="email"
                    value={input.email}
                    name="email"
                    onChange={changeEventHandler}
                    placeholder="you@example.com"
                    className="pl-10 h-11 sm:h-12 text-sm sm:text-base rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 w-full"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">
                  Password
                </Label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                  <Input
                    type="password"
                    value={input.password}
                    name="password"
                    onChange={changeEventHandler}
                    placeholder="••••••••"
                    className="pl-10 h-11 sm:h-12 text-sm sm:text-base rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 w-full"
                  />
                </div>
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  I am a
                </Label>

                <RadioGroup className="grid grid-cols-2 gap-3">
                  {["student", "recruiter"].map((role) => (
                    <label
                      key={role}
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all text-sm font-medium
                      ${
                        input.role === role
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <Input
                        type="radio"
                        name="role"
                        value={role}
                        checked={input.role === role}
                        onChange={changeEventHandler}
                        className="sr-only"
                      />
                      <span>{role === "student" ? "🎓" : "💼"}</span>
                      <span className="capitalize">{role}</span>
                    </label>
                  ))}
                </RadioGroup>
              </div>

              {/* Button */}
              {loading ? (
                <Button
                  disabled
                  className="w-full h-11 sm:h-12 rounded-xl bg-blue-500 text-white text-sm sm:text-base font-semibold"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full h-11 sm:h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold flex items-center justify-center gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              )}

              {/* Signup */}
              <p className="text-center text-sm sm:text-base text-gray-500 pt-1">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;