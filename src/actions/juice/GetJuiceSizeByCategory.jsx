import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchJuiceSizeByCategory = createAsyncThunk(
  "JuiceSizeByCategory/fetchJuiceSizeByCategory",
  async (id) => {
    const response = await axios.get(`${ApiUrl}/JuiceSizeByCategory/${id}`);
    // const response = await axios.get(`${ApiUrl}/allRelatedItems/${id}`);
    return response.data;
  }
);
const fetchJuiceSizeByCategorySlice = createSlice({
  name: "JuiceSizeByCategory",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJuiceSizeByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJuiceSizeByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchJuiceSizeByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchJuiceSizeByCategorySlice.reducer;


