import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchUserOrdersDone = createAsyncThunk(
  "UserOrdersDone/fetchUserOrdersDone",
  async (userEmail) => {
    const response = await axios.get(`${ApiUrl}/GetUserOrdersDone/${userEmail}`);
    return response.data;
  }
);

const fetchUserOrdersDoneSlice = createSlice({
  name: "UserOrdersDone",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrdersDone.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrdersDone.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserOrdersDone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchUserOrdersDoneSlice.reducer;


