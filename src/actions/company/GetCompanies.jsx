import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchCompanyItems = createAsyncThunk(
  "CompanyItems/fetchCompanyItems",
  async () => {
    const response = await axios.get(`${ApiUrl}/allCompanies`);
    return response.data;
  }
);
const fetchCompanyItemsSlice = createSlice({
  name: "CompanyItems",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyItems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCompanyItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchCompanyItemsSlice.reducer;


