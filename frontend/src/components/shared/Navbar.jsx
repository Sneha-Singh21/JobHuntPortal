import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx";
import { Avatar, AvatarImage } from "../ui/avatar.jsx";
import { LogOut, User2 } from "lucide-react";
import { Button } from "../ui/button.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice.js";
import { motion } from "framer-motion";
import { USER_API_END_POINT } from "@/utils/constant.js";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

    // Check if we are on the homepage ('/')
    const isHomePage = location.pathname === "/";

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-6xl h-20">
        <div>
          {/* <h1 className="text-[42px] cursor-pointer font-bold text-[#ad38c2]">
            Job<span className="text-purple-900">Hunt</span>
          </h1> */}

          {/* Conditionally applying the dropping animation only on the homepage */}
          <motion.h1
            className="text-[42px] cursor-pointer font-bold text-[#ad38c2]"
            initial={{ y: isHomePage ? -200 : 0 }} // Start higher on homepage, normal on other pages
            animate={{
              y: isHomePage ? 0 : 0, // Drop only on homepage
              transition: {
                type: "tween",
                duration: isHomePage ? 0.3 : 0, // Quick drop only on homepage
                ease: isHomePage ? "easeIn" : "easeOut", // Abrupt on homepage, smooth for other pages
                delay: isHomePage ? 0.5 : 0, // Delay drop on homepage
              },
            }}
            whileInView={{
              scale: [1, 1.05, 1], // Zooming effect on all pages
              transition: {
                repeat: Infinity, // Infinite loop of zooming
                duration: 1.5, // Duration of one loop
                repeatType: "reverse", // Reverse after each loop
              },
            }}
          >
            Job<span className="text-purple-900">Hunt</span>
          </motion.h1>
        </div>
        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-5 cursor-pointer">
            {user && user.role === "recruiter" ? (
              <>
                <Link to="/admin/companies">
                  <motion.li
                    whileHover={{ scale: 1.1, color: "#882599" }}
                    transition={{ duration: 0.3 }}
                  >
                    Companies
                  </motion.li>
                </Link>
                <Link to="/admin/jobs">
                  <motion.li
                    whileHover={{ scale: 1.1, color: "#882599" }}
                    transition={{ duration: 0.3 }}
                  >
                    Jobs
                  </motion.li>
                </Link>
              </>
            ) : (
              <>
                <Link to="/">
                  <motion.li
                    whileHover={{ scale: 1.1, color: "#882599" }}
                    transition={{ duration: 0.3 }}
                  >
                    Home
                  </motion.li>
                </Link>
                <Link to="/jobs">
                  <motion.li
                    whileHover={{ scale: 1.1, color: "#882599" }}
                    transition={{ duration: 0.3 }}
                  >
                    Jobs
                  </motion.li>
                </Link>
                <Link to="/browse">
                  <motion.li
                    whileHover={{ scale: 1.1, color: "#882599" }}
                    transition={{ duration: 0.3 }}
                  >
                    Browse
                  </motion.li>
                </Link>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button
                  className="bg-[#ad38c2] hover:bg-[#882599] text-white hover:text-white"
                  variant="outline"
                >
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                </motion.div>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div className="flex gap-2">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          src={user?.profile?.profilePhoto}
                          alt="@shadcn"
                        />
                      </Avatar>
                    </motion.div>
                    <div>
                      <h4 className="font-medium">{user?.fullName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
