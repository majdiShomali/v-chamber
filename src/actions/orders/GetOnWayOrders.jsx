import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchOnWayOrders = createAsyncThunk(
  "OnWayOrders/fetchOnWayOrders",
  async () => {
    const response = await axios.get(`${ApiUrl}/OrdersOnWay`);
    return response.data;
  }
);

const fetchOnWayOrdersSlice = createSlice({
  name: "OnWayOrders",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOnWayOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOnWayOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOnWayOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchOnWayOrdersSlice.reducer;


