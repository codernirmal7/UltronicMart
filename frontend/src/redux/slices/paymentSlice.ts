import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the types for the state
interface PaymentState {
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: PaymentState = {
  loading: false,
  error: null,
};

interface purchaseProductPayload {
  email : string | undefined;
  cardNumber : string;
  cardExpireYDate : string;
  cardExpireMDate : string;
  cardCvv : string;
  address : string;
  postalCode : string;
}

interface purchaseProductResponse {
  message: string;
}

export const purchaseProduct = createAsyncThunk<
  purchaseProductResponse,
  purchaseProductPayload,
  { rejectValue: string }
>(
  "/api/v1/product/purchase",
  async (payload: purchaseProductPayload, thunkAPI) => {
    try {
      const response = await axios.post(
        `/api/v1/product/purchase`,
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
  }
);

// Create the payment slice using createSlice
const paymentSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
});

// Export the reducer
export default paymentSlice.reducer;
