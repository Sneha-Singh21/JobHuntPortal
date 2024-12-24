import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Footer from "../shared/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { COMPANY_API_END_POINT } from "@/utils/constant";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const singleCompany = useSelector((state) => state.company.singleCompany);
  if (!singleCompany) return <p>Loading company data...</p>;

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      } else {
        toast.error(res.data.message || "Update failed");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null, // Don't assign file directly from Redux
      });
    }
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto my-10">
        <form
          onSubmit={submitHandler}
          className=" border border-gray-200 shadow-lg rounded-[10px] p-10"
        >
          <div className="flex items-center gap-8 p-5 mb-10">
            <Button
              variant="outline"
              className="flex items-center gap-3 text-gray-500 font-semibold"
              onClick={() => navigate("/admin/companies")}
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="pl-10 font-bold text-2xl">Company Setup</h1>
          </div>

          <div className="grid grid-cols-2 gap-5 ">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Company Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Company Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Company Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>

          {/* loader code */}
          {loading ? (
            <Button className="w-full my-4 text-[16px] border rounded-[5px] bg-[#ad38c2] hover:bg-[#ad38c2] text-white hover:text-white ">
              <Loader2 className="mr-2 w-4 animate-spin" /> Please wait..{" "}
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 text-[16px] border rounded-[5px] bg-[#ad38c2] hover:bg-[#882599] text-white"
            >
              Update
            </Button>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CompanySetup;
