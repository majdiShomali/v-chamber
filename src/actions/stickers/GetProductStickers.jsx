import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchProductStikers = createAsyncThunk(
  "ProductStikers/fetchProductStikers",
  async (id) => {
    const response = await axios.get(`${ApiUrl}/ProductStikers/${id}`);
    console.log(response.data);
    return response.data;
  }
);
const fetchProductStikersSlice = createSlice({
  name: "ProductStikers",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductStikers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductStikers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProductStikers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchProductStikersSlice.reducer;


