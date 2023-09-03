import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchAllRelatedItems = createAsyncThunk(
  "AllRelatedItems/fetchAllRelatedItems",
  async (data) => {
    const response = await axios.get(`${ApiUrl}/RelatedItemsAll`);
    return response.data;
  }
);
const fetchAllRelatedItemsSlice = createSlice({
  name: "AllRelatedItems",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRelatedItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRelatedItems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllRelatedItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchAllRelatedItemsSlice.reducer;


