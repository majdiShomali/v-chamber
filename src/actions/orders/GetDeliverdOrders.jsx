import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchDeliverdOrders = createAsyncThunk(
  "DeliverdOrders/fetchDeliverdOrders",
  async () => {
    const response = await axios.get(`${ApiUrl}/OrdersDeliverd`);
    return response.data;
  }
);

const fetchDeliverdOrdersSlice = createSlice({
  name: "DeliverdOrders",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliverdOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliverdOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDeliverdOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchDeliverdOrdersSlice.reducer;


