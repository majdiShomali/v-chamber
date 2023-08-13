import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchJuiceNikotinByCategory = createAsyncThunk(
  "JuiceNikotinByCategory/fetchJuiceNikotinByCategory",
  async (id) => {
    const response = await axios.get(`${ApiUrl}/JuiceNikotinByCategory/${id}`);
    // const response = await axios.get(`${ApiUrl}/allRelatedItems/${id}`);
    return response.data;
  }
);
const fetchJuiceNikotinByCategorySlice = createSlice({
  name: "JuiceNikotinByCategory",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJuiceNikotinByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJuiceNikotinByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchJuiceNikotinByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchJuiceNikotinByCategorySlice.reducer;


