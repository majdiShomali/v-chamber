import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchRelatedItem = createAsyncThunk(
  "RelatedItem/fetchRelatedItem",
  async (id) => {
    const response = await axios.get(`${ApiUrl}/allRelatedItems/${id}`);
    return response.data;
  }
);
const fetchRelatedItemSlice = createSlice({
  name: "RelatedItem",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRelatedItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRelatedItem.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRelatedItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchRelatedItemSlice.reducer;


