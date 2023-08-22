import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchCustomizedItems = createAsyncThunk(
  "CustomizedItems/fetchCustomizedItems",
  async (data) => {
    const id = data.id ;
    const customizedToId = data.customizedToId ? data.customizedToId  : "0" ;

    const response = await axios.get(`${ApiUrl}/CustomizedItems/${id}/${customizedToId}`);
    return response.data;
  }
);
const fetchCustomizedItemsSlice = createSlice({
  name: "CustomizedItems",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomizedItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomizedItems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCustomizedItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchCustomizedItemsSlice.reducer;


