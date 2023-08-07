import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchItemsCart = createAsyncThunk(
  "ItemsCart/fetchItemsCart",
  async (Ids) => {
    const  data={
        Ids:Ids
    }
    const response = await axios.post(`${ApiUrl}/allCartItems`,data);
    console.log(response.data)
    return response.data;
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


