import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchJuiceFlavorByCategory = createAsyncThunk(
  "JuiceFlavorByCategory/fetchJuiceFlavorByCategory",
  async (id) => {
    const response = await axios.get(`${ApiUrl}/JuiceFlavorByCategory/${id}`);
    // const response = await axios.get(`${ApiUrl}/allRelatedItems/${id}`);
    return response.data;
  }
);
const fetchJuiceFlavorByCategorySlice = createSlice({
  name: "JuiceFlavorByCategory",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJuiceFlavorByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJuiceFlavorByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchJuiceFlavorByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchJuiceFlavorByCategorySlice.reducer;


