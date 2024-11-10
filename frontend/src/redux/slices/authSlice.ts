import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the types for the state
interface AuthState {
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: AuthState = {
  loading: false,
  error: null,
};

// Define the type for the request payload and response
interface SignUpPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpResponse {
  message: string;
}

// Create an async thunk for signing up
export const signUpAuth = createAsyncThunk<
  SignUpResponse,           // The type of data that will be returned from the async action
  SignUpPayload,            // The type of the arguments passed to the action
  { rejectValue: string }   // You can also handle errors in a specific way using rejectValue
>(
  '/api/v1/auth/sign-up',
  async (payload: SignUpPayload, thunkAPI) => {
    try {
      const response = await axios.post('/api/v1/auth/sign-up', payload);
      return response.data;  // Returning the data as the resolved value
    } catch (error : unknown) {
         // Handle errors with a proper fallback message
      if (axios.isAxiosError(error)) {
        // If it's an Axios error, we can safely access `error.response`
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || 'An unexpected error occurred'
        );
      } else if (error instanceof Error) {
        // If it's a general Error object
        return thunkAPI.rejectWithValue(error.message || 'An unknown error occurred');
      } else {
        // Fallback for unknown error types
        return thunkAPI.rejectWithValue('An unknown error occurred');
      }
    }
  }
);

// Create the auth slice using createSlice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpAuth.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signUpAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const {} = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
