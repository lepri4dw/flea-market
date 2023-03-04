import {createAsyncThunk} from "@reduxjs/toolkit";
import {FullItem, ItemMutation, ItemsWithCategoryName, ValidationError} from "../../types";
import axiosApi from "../../axiosApi";
import {RootState} from "../../app/store";
import {isAxiosError} from "axios";

export const fetchItems = createAsyncThunk<ItemsWithCategoryName, string | undefined>(
  'items/fetchAll',
  async (categoryId) => {
    if (categoryId) {
      const response = await axiosApi.get('/items?category=' + categoryId);
      return response.data;
    }
    const response = await axiosApi.get('/items');
    return response.data;
  }
);

export const fetchOneItem = createAsyncThunk<FullItem, string>(
  'items/fetchOne',
  async (id) => {
    const response = await axiosApi.get('/items/' + id);
    return response.data;
  }
);

export const createItem = createAsyncThunk<void, ItemMutation, {state: RootState, rejectValue: ValidationError}>(
  'items/create',
  async (itemMutation, {getState, rejectWithValue}) => {
    try {
      const user = getState().users.user;

      if (user) {
        const formData = new FormData();
        const keys = Object.keys(itemMutation) as (keyof ItemMutation)[];

        keys.forEach(key => {
          const value = itemMutation[key];

          if (value !== null) {
            formData.append(key, value);
          }
        });
        await axiosApi.post('/items', formData, {headers: {'Authorization': user.token}});
      }
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }
);

export const deleteItem = createAsyncThunk<void, string, {state: RootState}>(
  'items/delete',
  async (id, {getState}) => {
    const user = getState().users.user;

    if (user) {
      await axiosApi.delete('/items/' + id, {headers: {'Authorization': user.token}})
    }
  }
)
