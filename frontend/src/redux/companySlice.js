import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    companies: [],
    searchCompanyByText: "",
  },
  reducers: {
    // actions
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    },
    // New action to remove a company from the list
    removeCompany: (state, action) => {
      const companyId = action.payload;
      state.companies = state.companies.filter(
        (company) => company._id !== companyId
      );
    },
  },
});

export const {
  setSingleCompany,
  setCompanies,
  setSearchCompanyByText,
  removeCompany,
} = companySlice.actions;
export default companySlice.reducer;
