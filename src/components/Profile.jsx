import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJob";

const Profile = () => {
  useGetAppliedJobs();

  const isHaveresume = true;
  const [open, setOpen] = useState(false);

  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ===Profile Card === */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-6 sm:my-8 p-4 sm:p-6 lg:p-8 shadow-sm">

          {/* Top Section */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

            {/* Left */}
            <div className="flex items-center gap-4 sm:gap-6">
              <Avatar className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 flex-shrink-0">
                <AvatarImage src={user?.profile?.profilePhoto} />
              </Avatar>

              <div className="min-w-0">
                <h1 className="font-semibold text-lg sm:text-xl lg:text-2xl text-gray-900 truncate">
                  {user?.fullname}
                </h1>
                <p className="text-sm sm:text-base text-gray-500 line-clamp-2">
                  {user?.profile?.bio || "No bio available"}
                </p>
              </div>
            </div>

            {/* Edit Button */}
            <div className="self-start sm:self-auto">
              <Button
                variant="outline"
                onClick={() => setOpen(true)}
                className="h-9 w-9 sm:h-10 sm:w-10 p-0 flex items-center justify-center"
              >
                <Pen className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6 my-5">
            <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
              <Mail className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{user?.email}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
              <Contact className="h-4 w-4 flex-shrink-0" />
              <span>{user?.phoneNumber}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="my-6">
            <h1 className="font-semibold text-base sm:text-lg mb-2">
              Skills
            </h1>

            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length !== 0 ? (
                user?.profile?.skills?.map((item, index) => (
                  <Badge key={index} className="text-xs sm:text-sm">
                    {item}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-400 text-sm">NA</span>
              )}
            </div>

            {/* Resume */}
            <div className="mt-6">
              <Label className="text-sm sm:text-md font-semibold">
                Resume
              </Label>

              <div className="mt-1">
                {isHaveresume ? (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={user?.profile?.resume}
                    className="text-blue-600 hover:underline text-sm sm:text-base break-all"
                  >
                    {user?.profile?.resumeOriginalName}
                  </a>
                ) : (
                  <span className="text-gray-400 text-sm">
                    Not applicable
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ===== Applied Jobs ==*/}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 mb-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
            <h1 className="font-bold text-lg sm:text-xl text-gray-900">
              All Applied Jobs
            </h1>
          </div>

          <div className="px-2 sm:px-4 lg:px-6 pb-4 sm:pb-6 overflow-x-auto">
            <AppliedJobTable />
          </div>
        </div>
      </div>

      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;