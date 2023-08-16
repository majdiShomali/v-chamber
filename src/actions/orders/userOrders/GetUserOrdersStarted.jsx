import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchUserOrdersStarted = createAsyncThunk(
  "UserOrdersStarted/fetchUserOrdersStarted",
  async (userEmail) => {
    const response = await axios.get(`${ApiUrl}/GetUserOrdersStarted/${userEmail}`);
    return response.data;
  }
);

const fetchUserOrdersStartedSlice = createSlice({
  name: "UserOrdersStarted",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrdersStarted.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrdersStarted.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserOrdersStarted.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchUserOrdersStartedSlice.reducer;


