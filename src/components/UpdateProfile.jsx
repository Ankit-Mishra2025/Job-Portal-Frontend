import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfile = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    file: user?.profile?.resume,
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
        setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }finally{
        setLoading(false)
    }
    setOpen(false);
    console.log(input);
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[450px] "
          onInteractOutside={() => setOpen(false)}>
        
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className={"text-right"}>
                  Name:
                </Label>
                <input
                  id="name"
                  className="col-span-3"
                  name="fullname"
                  type="text"
                  value={input.fullname}
                  onChange={changeEventHandler}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className={"text-right"}>
                  Email:
                </Label>
                <input
                  id="email"
                  className="col-span-3"
                  name="email"
                  value={input.email}
                  type="email"
                  onChange={changeEventHandler}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className={"text-right"}>
                  Phone Number:
                </Label>
                <input
                  id="number"
                  className="col-span-3"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  type="Number
                   "
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className={"text-right"}>
                  bio:
                </Label>
                <input
                  id="bio"
                  className="col-span-3"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  type="text"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className={"text-right"}>
                  Skills:
                </Label>
                <input
                  id="skills"
                  className="col-span-3"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className={"text-right"}>
                  Resume:
                </Label>
                <input
                  id="file"
                  className="col-span-3"
                  name="file"
                  type="file"
                  onChange={fileChangeHandler}
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4">
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait{" "}
                </Button>
              ) : (
                <Button type="submit" className=" bg-[#6A38C2] w-full my-4">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfile;
