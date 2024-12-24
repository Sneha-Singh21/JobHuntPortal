import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";


const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // You can perform your subscribe logic here, like sending the email to the backend
    if (email) {
      toast.success("Subscribed successfully! Stay tuned for job alerts.");
      setEmail(""); // Clear the input after successful subscription
    } else {
      toast.error("Please enter a valid email.");
    }
  };

  return (
    <footer className="bg-[#FAF9F6] text-purple-900 py-8 shadow-lg rounded-tl-[20px] rounded-tr-[20px]">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Logo and Description */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          {/* Brand Section */}
          <div className="mb-6 md:mb-0">
            <h1 className="text-4xl font-bold text-[#ad38c2]">
              Job<span className="text-purple-900">Hunt</span>
            </h1>
            <p className="text-sm mt-2 max-w-md">
              Your one-stop destination to find your dream job and achieve
              career success. Explore, apply, and start your journey today.
            </p>
          </div>

          {/* Newsletter Section */}
          <div className="flex flex-col space-y-4 bg-[#ad38c2] text-white p-6 rounded-[10px] shadow-lg">
            <p className="text-lg font-semibold">
              Stay Updated with Job Alerts!
            </p>
            <form
              className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
              onSubmit={handleSubscribe}
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 rounded-[5px] text-gray-800 w-full sm:w-auto focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white text-[#ad38c2] rounded-[5px] font-bold hover:bg-gray-100 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Quick Links and Social Media */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-gray-200 pt-6">
          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 mb-4 md:mb-0">
            <a href="#" className="hover:underline font-medium">
              About Us
            </a>
            <a href="#" className="hover:underline font-medium">
              Jobs
            </a>
            <a href="#" className="hover:underline font-medium">
              Browse
            </a>
            <a href="#" className="hover:underline font-medium">
              Contact
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-6">
            <a
              href="https://facebook.com"
              className="hover:scale-110 transition-transform text-[#ad38c2]"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              className="hover:scale-110 transition-transform text-[#ad38c2]"
              aria-label="Twitter"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.934 4.934 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.924 4.924 0 00-8.38 4.49A13.978 13.978 0 011.67 3.149 4.93 4.93 0 003.16 9.724a4.903 4.903 0 01-2.229-.616v.062a4.93 4.93 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.93 4.93 0 004.6 3.417A9.869 9.869 0 010 21.543a13.978 13.978 0 007.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.425-.015-.636A10.012 10.012 0 0024 4.557z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              className="hover:scale-110 transition-transform text-[#ad38c2]"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer />
    </footer>
  );
};

export default Footer;
