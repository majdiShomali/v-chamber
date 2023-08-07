import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchOneItem = createAsyncThunk(
  "Item/fetchOneItem",
  async (id) => {
    const response = await axios.get(`${ApiUrl}/OneItem/${id}`);
    return response.data;
  }
);
const fetchOneItemSlice = createSlice({
  name: "Item",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOneItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneItem.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOneItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchOneItemSlice.reducer;


