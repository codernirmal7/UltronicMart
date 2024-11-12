import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer, 
    product: productReducer, 
  },
});

// Define types for the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;