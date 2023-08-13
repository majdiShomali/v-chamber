import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiUrl= process.env.REACT_APP_API_URL


export const fetchJuiceType = createAsyncThunk(
  "JuiceType/fetchJuiceType",
  async () => {
    const response = await axios.get(`${ApiUrl}/allJuiceType`);
    return response.data;
  }
);

const fetchJuiceTypeSlice = createSlice({
  name: "JuiceType",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJuiceType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJuiceType.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchJuiceType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchJuiceTypeSlice.reducer;


