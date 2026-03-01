import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ✅ Responsive Container */}
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
        <form
          onSubmit={submitHandler}
          className="
            w-full
            max-w-md
            sm:max-w-lg
            lg:max-w-xl
            2xl:max-w-2xl
            bg-white
            border border-gray-200
            rounded-md
            p-6 sm:p-8
            shadow-sm
          "
        >
          <h1 className="font-bold text-xl sm:text-2xl mb-5 text-center">
            Sign Up
          </h1>

          {/* Full Name */}
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Enter your name"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
            />
          </div>

          {/* Email */}
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            />
          </div>

          {/* Phone */}
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="tel"
              placeholder="Enter your Phone number"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
            />
          </div>

          {/* Password */}
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            />
          </div>

          {/* ✅ Role + File (responsive stack) */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-4">
            <RadioGroup className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label>Recruiter</Label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label>Student</Label>
              </div>
            </RadioGroup>

            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <input
                accept="image/*"
                type="file"
                className="cursor-pointer text-sm"
                onChange={changeFileHandler}
              />
            </div>
          </div>

          {/* Button */}
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="bg-[#6A38C2] w-full my-4">
              Sign Up
            </Button>
          )}

          {/* Footer */}
          <span className="text-sm block text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-700 font-medium">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;