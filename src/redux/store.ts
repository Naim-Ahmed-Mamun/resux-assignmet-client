import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/products/productSlice';
import { api } from './api/apiSlice';
import authSlice from './features/auth/authSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    user: authSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
