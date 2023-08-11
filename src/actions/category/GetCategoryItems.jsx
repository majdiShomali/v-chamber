import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchCategoryItems = createAsyncThunk(
  "CategoryItems/fetchCategoryItems",
  async () => {
    const response = await axios.get(`${ApiUrl}/allItems`);
    return response.data;
  }
);
const fetchCategoryItemsSlice = createSlice({
  name: "CategoryItems",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryItems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategoryItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchCategoryItemsSlice.reducer;


