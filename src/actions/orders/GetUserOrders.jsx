import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchUserOrders = createAsyncThunk(
  "UserOrders/fetchUserOrders",
  async (userEmail) => {
    const response = await axios.get(`${ApiUrl}/GetUserOrders/${userEmail}`);
    return response.data;
  }
);

const fetchUserOrdersSlice = createSlice({
  name: "UserOrders",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchUserOrdersSlice.reducer;


