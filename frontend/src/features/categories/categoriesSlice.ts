import {Category} from "../../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {RootState} from "../../app/store";

interface CategoriesState {
  items: Category[],
  fetchLoading: boolean
}

const initialState: CategoriesState = {
  items: [],
  fetchLoading: false,
}

export const fetchCategories = createAsyncThunk(
  'categories/fetch',
  async () => {
    const response = await axiosApi.get<Category[]>('/categories');
    return response.data;
  }
)

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, {payload: categories}) => {
      state.fetchLoading = false;
      state.items = categories;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.fetchLoading = false;
    });
  }
});

export const categoriesReducer = categoriesSlice.reducer;

export const selectCategories = (state: RootState) => state.categories.items;
export const selectCategoriesFetching = (state: RootState) => state.categories.fetchLoading;