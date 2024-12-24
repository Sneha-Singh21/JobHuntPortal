import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar.jsx";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import { RadioGroup } from "../ui/radio-group.jsx";
import { Button } from "../ui/button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice.js";
import { Loader2 } from "lucide-react";
import { USER_API_END_POINT } from "@/utils/constant.js";

const Login = () => {
  // taking data from the form
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
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

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
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
            Login Now
          </h1>

          {/* input fields */}
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
                Login
              </Button>
            </div>
          )}

          <span className="text-[14px]">
            Don't have an account?{" "}
            <Link
              className="text-[#ad38c2] hover:text-[#882599] font-bold text-[16px]"
              to="/signup"
            >
              Create an account
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
