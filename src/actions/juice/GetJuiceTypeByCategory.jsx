import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchJuiceTypeByCategory = createAsyncThunk(
  "JuiceTypeByCategory/fetchJuiceTypeByCategory",
  async (id) => {
    const response = await axios.get(`${ApiUrl}/JuiceTypeByCategory/${id}`);
    // const response = await axios.get(`${ApiUrl}/allRelatedItems/${id}`);
    return response.data;
  }
);
const fetchJuiceTypeByCategorySlice = createSlice({
  name: "JuiceTypeByCategory",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJuiceTypeByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJuiceTypeByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchJuiceTypeByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchJuiceTypeByCategorySlice.reducer;


