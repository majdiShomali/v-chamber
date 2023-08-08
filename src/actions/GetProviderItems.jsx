import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchProviderItems = createAsyncThunk(
  "Items/fetchProviderItems",
  async (ProviderId) => {
    const response = await axios.get(`${ApiUrl}/ProviderItems/${ProviderId}`);
    console.log(response.data)
    return response.data;
  }
);
const fetchProviderItemsSlice = createSlice({
  name: "ProviderItems",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviderItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProviderItems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProviderItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchProviderItemsSlice.reducer;


