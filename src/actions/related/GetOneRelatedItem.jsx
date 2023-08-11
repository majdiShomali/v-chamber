import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchOneRelatedItem = createAsyncThunk(
  "OneRelatedItem/fetchOneRelatedItem",
  async (id) => {
    const response = await axios.get(`${ApiUrl}/OneRelatedItem/${id}`);
    // const response = await axios.get(`${ApiUrl}/allRelatedItems/${id}`);
    return response.data;
  }
);
const fetchOneRelatedItemSlice = createSlice({
  name: "OneRelatedItem",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOneRelatedItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneRelatedItem.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOneRelatedItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchOneRelatedItemSlice.reducer;


