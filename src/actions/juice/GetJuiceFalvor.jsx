import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchJuiceFlavor = createAsyncThunk(
  "JuiceFlavor/fetchJuiceFlavor",
  async () => {
    const response = await axios.get(`${ApiUrl}/allJuiceFlavor`);
    return response.data;
  }
);
const fetchJuiceFlavorSlice = createSlice({
  name: "JuiceFlavor",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJuiceFlavor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJuiceFlavor.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchJuiceFlavor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchJuiceFlavorSlice.reducer;


