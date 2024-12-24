import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar.jsx";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import { RadioGroup } from "../ui/radio-group.jsx";
import { Button } from "../ui/button.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice.js";
import { USER_API_END_POINT } from "@/utils/constant.js";

const Signup = () => {
  // taking data from the form
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response from server");
      } else {
        console.error("Error:", error.message);
        toast.error("An error occurred");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border shadow-md border-gray-200 rounded-[10px] p-4 my-10"
        >
          <h1 className="font-bold text-center text-slate-800 text-3xl mb-5">
            Create your Profile
          </h1>

          {/* input fields */}
          <div className="my-3">
            <Label>Full Name</Label>
            <Input
              name="fullName"
              value={input.fullName}
              onChange={changeEventHandler}
              type="text"
              placeholder="your name here"
            />
          </div>
          <div className="my-3">
            <Label>Email</Label>
            <Input
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              type="email"
              placeholder="john@gmail.com"
            />
          </div>
          <div className="my-3">
            <Label>Phone Number</Label>
            <Input
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              type="text"
              placeholder="+91"
            />
          </div>
          <div className="my-3">
            <Label>Password</Label>
            <Input
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              type="password"
              placeholder="your password here"
            />
          </div>

          {/* option code */}
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>

            {/* profile code section */}
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>

          {/* loader code */}
          {loading ? (
            <div className="flex justify-center my-3 mb-10">
              <Button className="text-[16px] px-24 py-5 border rounded-[5px] bg-[#ad38c2] hover:bg-[#ad38c2] text-white hover:text-white ">
                {" "}
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...{" "}
              </Button>
            </div>
          ) : (
            <div className="flex justify-center my-3 mb-10">
              <Button
                type="submit"
                className="text-[16px] px-24 py-5 border rounded-[5px] bg-[#ad38c2] hover:bg-[#882599] text-white"
              >
                Signup
              </Button>
            </div>
          )}

          <span className="text-[14px]">
            Already have an account?{" "}
            <Link
              className="text-[#ad38c2] hover:text-[#882599] font-bold text-[16px]"
              to="/login"
            >
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
