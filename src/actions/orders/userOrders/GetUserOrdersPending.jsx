import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchUserOrdersPending = createAsyncThunk(
  "UserOrdersPending/fetchUserOrdersPending",
  async (userEmail) => {
    const response = await axios.get(`${ApiUrl}/GetUserOrdersPending/${userEmail}`);
    return response.data;
  }
);

const fetchUserOrdersPendingSlice = createSlice({
  name: "UserOrdersPending",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrdersPending.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrdersPending.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserOrdersPending.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchUserOrdersPendingSlice.reducer;


