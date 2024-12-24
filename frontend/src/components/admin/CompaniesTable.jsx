import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, Trash } from "lucide-react"; // Import the Trash icon for delete
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { removeCompany } from "@/redux/companySlice"; // Import the removeCompany action
import { toast } from "sonner"; // Import the toast for success/error messages
import { COMPANY_API_END_POINT } from "@/utils/constant";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (state) => state.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch

  useEffect(() => {
    const filteredCompany = companies.filter((company) => {
      if (!searchCompanyByText) return true;
      return company.name
        ?.toLowerCase()
        .includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  // Handle company deletion
  const handleDeleteCompany = async (companyId) => {
    try {
      const res = await axios.delete(
        `${COMPANY_API_END_POINT}/delete/${companyId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(removeCompany(companyId)); // Remove company from Redux state
        toast.success("Company deleted successfully!");
      } else {
        toast.error("Failed to delete company.");
      }
    } catch (error) {
      console.error("Error deleting company:", error);
      toast.error("An error occurred while deleting the company.");
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>
          A list of your recently registered companies
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                <span className="text-sm text-red-600 font-medium">
                  *You haven't registered any company yet.
                </span>
              </TableCell>
            </TableRow>
          ) : (
            filterCompany?.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company?.logo || "/default-logo.png"} />
                  </Avatar>
                </TableCell>
                <TableCell>{company?.name || "N/A"}</TableCell>
                <TableCell>
                  {company?.createdAt?.split("T")[0] || "N/A"}
                </TableCell>
                <TableCell className="cursor-pointer text-right pr-6">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 p-3">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-4 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() => handleDeleteCompany(company._id)}
                        className="flex items-center w-fit gap-3 cursor-pointer mt-3 text-red-500"
                      >
                        <Trash className="w-4" />
                        <span>Delete</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
