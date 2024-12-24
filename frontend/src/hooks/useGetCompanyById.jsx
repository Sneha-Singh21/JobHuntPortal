import { setSingleCompany } from "@/redux/companySlice.js";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!companyId) {
      console.warn("No company ID provided.");
      return;
    }

    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        } else {
          console.warn("Failed to fetch company data:", res.data.message);
        }
      } catch (error) {
        console.error(
          "Error fetching company:",
          error.response?.data || error.message
        );
      }
    };

    fetchSingleCompany();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;
