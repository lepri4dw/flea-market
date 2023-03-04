import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {usersReducer} from '../features/users/usersSlice';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist/es/constants';
import {categoriesReducer} from "../features/categories/categoriesSlice";
import {itemsReducer} from "../features/items/itemsSlice";

const usersPersistConfig = {
  key: 'market:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  categories: categoriesReducer,
  items: itemsReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;