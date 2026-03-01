import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, Menu, User2, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${USER_API_END_POINT}/logout`,
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
        setMenuOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const navLinks =
    user && user.role === "recruiter"
      ? [
          { to: "/admin/companies", label: "Companies" },
          { to: "/admin/jobs", label: "Jobs" },
        ]
      : [
          { to: "/", label: "Home" },
          { to: "/jobs", label: "Jobs" },
          { to: "/browse", label: "Browse" },
        ];

  return (
    <>
      {/* ========== NAVBAR ====== */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-xl sm:text-2xl font-bold">
                Job<span className="text-[#F83002]">Portal</span>
              </h1>
            </Link>

            {/* ========== Desktop Nav ========== */}
            <div className="hidden md:flex items-center gap-8 lg:gap-12">
              <ul className="flex items-center gap-6 lg:gap-8 font-medium text-gray-700">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="hover:text-[#F83002] transition-colors text-sm lg:text-base"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {!user ? (
                <div className="flex items-center gap-3">
                  <Link to="/login">
                    <Button variant="outline" className="text-sm">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-sm">
                      Signup
                    </Button>
                  </Link>
                </div>
              ) : (
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="cursor-pointer h-9 w-9 lg:h-10 lg:w-10">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt={user?.fullname}
                      />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 lg:w-80 mr-4">
                    <div className="flex gap-3 pb-3 border-b border-gray-100">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={user?.profile?.profilePhoto}
                          alt={user?.fullname}
                        />
                      </Avatar>
                      <div className="min-w-0">
                        <h4 className="font-medium truncate">
                          {user?.fullname}
                        </h4>
                        <p className="text-sm text-gray-500 truncate">
                          {user?.profile?.bio}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col mt-2 gap-2">
                      {user?.role === "student" && (
                        <Link to="/profile">
                          <Button variant="ghost" className="w-full justify-start">
                            <User2 className="h-4 w-4 mr-2" />
                            View Profile
                          </Button>
                        </Link>
                      )}

                      <Button
                        onClick={logoutHandler}
                        variant="ghost"
                        className="w-full justify-start text-red-500"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>

            {/*  Mobile Right ====== */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={() => setMenuOpen(true)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ==== MOBILE FULL SCREEN MENU === */}
      <div
        className={`fixed inset-0 z-[100] bg-white transition-transform duration-300 md:hidden
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>

          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col p-6 gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium text-gray-800 py-3 border-b"
            >
              {link.label}
            </Link>
          ))}

          {/* Auth */}
          {!user ? (
            <div className="flex flex-col gap-3 mt-6">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button variant="outline" className="w-full h-12">
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                <Button className="w-full h-12 bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {user?.role === "student" && (
                <Link to="/profile" onClick={() => setMenuOpen(false)}>
                  <Button variant="outline" className="w-full h-12">
                    View Profile
                  </Button>
                </Link>
              )}

              <Button
                onClick={logoutHandler}
                variant="destructive"
                className="w-full h-12"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;