import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchJuiceNikotin = createAsyncThunk(
  "JuiceNikotin/fetchJuiceNikotin",
  async () => {
    const response = await axios.get(`${ApiUrl}/allJuiceNikotin`);
    return response.data;
  }
);
const fetchJuiceNikotinSlice = createSlice({
  name: "JuiceNikotin",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJuiceNikotin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJuiceNikotin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchJuiceNikotin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchJuiceNikotinSlice.reducer;


