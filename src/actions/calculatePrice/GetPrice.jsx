import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchPrice = createAsyncThunk(
  "Price/fetchPrice",
  async (items) => {
    const response = await axios.post(`${ApiUrl}/price`,{items});
    // const response = await axios.get(`${ApiUrl}/allRelatedPrices/${id}`);
    return response.data;
  }
);
const fetchPriceSlice = createSlice({
  name: "Price",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchPriceSlice.reducer;


