import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//define the type of product Data
type ProductDataType = {
  _id: string;
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
  images : string[];
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

interface WriteCommentPayload {
  productId: string | undefined;
  email: string;
  rating: number;
  comment: string;
}

interface WriteCommentResponse {
  message: string;
}

interface AddProductToCartPayload {
  productId: string | undefined;
  quantity : number;
  userId : string | undefined;
}

interface AddProductToCartResponse {
  message: string;
}

interface RemoveProductFromCartPayload {
  productId: string;
  userId : string;
}

interface RemoveProductFromCartResponse {
  message: string;
}


// Create an async thunk for write comment on product
export const addReview = createAsyncThunk<
  WriteCommentResponse, // The type of data that will be returned from the async action
  WriteCommentPayload, // The type of the arguments passed to the action
  { rejectValue: string } // You can also handle errors in a specific way using rejectValue
>("/api/v1/product/comment", async (payload: WriteCommentPayload, thunkAPI) => {
  try {
    const response = await axios.post(
      `/api/v1/product/comment`,
      payload
    );
    return response.data; // Returning the data as the resolved value
  } catch (error: unknown) {
    // Handle errors with a proper fallback message
    if (axios.isAxiosError(error)) {
      // If it's an Axios error, we can safely access `error.response`
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An unexpected error occurred"
      );
    } else if (error instanceof Error) {
      // If it's a general Error object
      return thunkAPI.rejectWithValue(
        error.message || "An unknown error occurred"
      );
    } else {
      // Fallback for unknown error types
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
});

// Create an async thunk for addProductToCart
export const addProductToCart = createAsyncThunk<
AddProductToCartResponse, // The type of data that will be returned from the async action
  AddProductToCartPayload, // The type of the arguments passed to the action
  { rejectValue: string } // You can also handle errors in a specific way using rejectValue
>("/api/v1/product/addToCart", async (payload: AddProductToCartPayload, thunkAPI) => {
  try {
    const response = await axios.post(
      `/api/v1/product/addToCart`,
      payload
    );
    return response.data; // Returning the data as the resolved value
  } catch (error: unknown) {
    // Handle errors with a proper fallback message
    if (axios.isAxiosError(error)) {
      // If it's an Axios error, we can safely access `error.response`
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An unexpected error occurred"
      );
    } else if (error instanceof Error) {
      // If it's a general Error object
      return thunkAPI.rejectWithValue(
        error.message || "An unknown error occurred"
      );
    } else {
      // Fallback for unknown error types
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
});


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

// Create an async thunk for removeProductFromCart
export const removeProductFromCart = createAsyncThunk<
  RemoveProductFromCartResponse, // The type of data that will be returned from the async action
  RemoveProductFromCartPayload, // The type of the arguments passed to the action
  { rejectValue: string } // You can also handle errors in a specific way using rejectValue
>("/api/v1/product/remove", async (payload: RemoveProductFromCartPayload, thunkAPI) => {
  try {
    const response = await axios.post(
      `/api/v1/product/remove`,
      payload
    );
    return response.data; // Returning the data as the resolved value
  } catch (error: unknown) {
    // Handle errors with a proper fallback message
    if (axios.isAxiosError(error)) {
      // If it's an Axios error, we can safely access `error.response`
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An unexpected error occurred"
      );
    } else if (error instanceof Error) {
      // If it's a general Error object
      return thunkAPI.rejectWithValue(
        error.message || "An unknown error occurred"
      );
    } else {
      // Fallback for unknown error types
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
});

// Create the product slice using createSlice
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
