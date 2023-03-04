import {FullItem, ItemsWithCategoryName, ValidationError} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createItem, deleteItem, fetchItems, fetchOneItem} from "./itemsThunks";
import {RootState} from "../../app/store";

interface ItemsState {
  items: ItemsWithCategoryName | null;
  fetchLoading: boolean;
  oneItem: FullItem | null;
  fetchOneItem: boolean;
  createLoading: boolean;
  createItemError: ValidationError | null;
  deleteLoading: boolean;
}

const initialState: ItemsState = {
  items: null,
  fetchLoading: false,
  oneItem: null,
  fetchOneItem: false,
  createLoading: false,
  createItemError: null,
  deleteLoading: false
}

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchItems.fulfilled, (state, {payload: items}) => {
      state.fetchLoading = false;
      state.items = items;
    });
    builder.addCase(fetchItems.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchOneItem.pending, (state) => {
      state.fetchOneItem = true;
    });
    builder.addCase(fetchOneItem.fulfilled, (state, {payload: fullItem}) => {
      state.fetchOneItem = false;
      state.oneItem = fullItem;
    });
    builder.addCase(fetchOneItem.rejected, (state) => {
      state.fetchOneItem = false;
    });

    builder.addCase(createItem.pending, (state) => {
      state.createItemError = null;
      state.createLoading = true;
    });
    builder.addCase(createItem.fulfilled, (state, ) => {
      state.createLoading = false;
    });
    builder.addCase(createItem.rejected, (state, {payload: error}) => {
      state.createItemError = error || null;
      state.createLoading = false;
    });

    builder.addCase(deleteItem.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteItem.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteItem.rejected, (state) => {
      state.deleteLoading = false;
    });
  }
});

export const itemsReducer = itemsSlice.reducer;

export const selectItems = (state: RootState) => state.items.items;
export const selectItemsFetching = (state: RootState) => state.items.fetchLoading;
export const selectFullItem = (state: RootState) => state.items.oneItem;
export const selectFullItemFetching = (state: RootState) => state.items.fetchOneItem;
export const selectItemCreating = (state: RootState) => state.items.createLoading;
export const selectCreateItemError = (state: RootState) => state.items.createItemError;
export const selectItemDeleting = (state: RootState) => state.items.deleteLoading;