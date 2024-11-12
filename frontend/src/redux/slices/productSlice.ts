import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//define the type of product Data
type ProductDataType = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  purchaseCount: number;
  stock: number;
  variants: [
    {
      size: string;
      color: string;
      additionalPrice: number;
    }
  ];
  images : [];
  rating : number;
  reviews: [
    {
      userId: string;
      email: string;
      rating: number;
      comment: string;
      date: Date;
    },
  ],
  createdAt : Date;
  updatedAt : Date;
  __v : number;
};

// Define the types for the state
interface AuthState {
  productData: Array<ProductDataType>;
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: AuthState = {
  productData: [],
  loading: false,
  error: null,
};

// Create an async thunk for checking if the sign out
export const getAllProductsData = createAsyncThunk(
  "/api/v1/product/get", // action type (the first argument)
  async () => {
    try {
      const response = await axios.get("/api/v1/product/get");
      return response.data.products;
    } catch (error: unknown) {
      return error;
    }
  }
);

// Create the auth slice using createSlice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProductsData.fulfilled, (state, action) => {
        state.loading = false;
        state.productData = action.payload;
      })
      .addCase(getAllProductsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occured.";
      });
  },
});

// Export the reducer
export default productSlice.reducer;
