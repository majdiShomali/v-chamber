import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchJuiceSize = createAsyncThunk(
  "JuiceSize/fetchJuiceSize",
  async () => {
    const response = await axios.get(`${ApiUrl}/allJuiceSize`);
    return response.data;
  }
);
const fetchJuiceSizeSlice = createSlice({
  name: "JuiceSize",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJuiceSize.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJuiceSize.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchJuiceSize.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchJuiceSizeSlice.reducer;


