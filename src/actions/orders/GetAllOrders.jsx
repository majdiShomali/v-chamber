import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchAllOrders = createAsyncThunk(
  "AllOrders/fetchAllOrders",
  async () => {
    const response = await axios.get(`${ApiUrl}/OrdersAll`);
    return response.data;
  }
);

const fetchAllOrdersSlice = createSlice({
  name: "AllOrders",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchAllOrdersSlice.reducer;


