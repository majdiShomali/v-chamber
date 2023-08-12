import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchCompaniesByCategory = createAsyncThunk(
  "CompaniesByCategory/fetchCompaniesByCategory",
  async (id) => {
    const response = await axios.get(`${ApiUrl}/CompaniesByCategory/${id}`);
    // const response = await axios.get(`${ApiUrl}/allRelatedItems/${id}`);
    return response.data;
  }
);
const fetchCompaniesByCategorySlice = createSlice({
  name: "CompaniesByCategory",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompaniesByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompaniesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCompaniesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchCompaniesByCategorySlice.reducer;


