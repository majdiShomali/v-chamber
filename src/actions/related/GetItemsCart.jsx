import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchItemsCart = createAsyncThunk(
  "ItemsCart/fetchItemsCart",
  async (Ids) => {
    const  data={
        Ids:Ids
    }
    const response0 = await axios.post(`${ApiUrl}/allCartItems`,data);
    const response1 = await axios.post(`${ApiUrl}/ProductStikersCart`,data);
    const response = [...response0.data, ...response1.data];
    return response;
  }
);
const fetchItemsCartSlice = createSlice({
  name: "ItemsCart",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemsCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItemsCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchItemsCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchItemsCartSlice.reducer;


