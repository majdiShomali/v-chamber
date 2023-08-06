import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchFavItems = createAsyncThunk(
  "FavItems/fetchFavItems",
  async (id) => {
    const response = await axios.get(`http://localhost:5000/api/favoriteItems/${id}`);
    return response.data;
  }
);
export const updateFavItems = createAsyncThunk(
    "FavItems/updateFavItems",
    async (data) => {
      const UsersIdFavorite= data.UsersIdFavorite
      const response = await axios.put(`http://localhost:5000/api/updateItemFav/${data.CardId}`,{UsersIdFavorite});
      return response.data;
    }
  );
const fetchFavItemsSlice = createSlice({
  name: "FavItems",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavItems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFavItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateFavItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFavItems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateFavItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchFavItemsSlice.reducer;


