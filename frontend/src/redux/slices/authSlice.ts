import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the types for the state
interface AuthState {
  userData: any;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: AuthState = {
  userData: [],
  loading: false,
  error: null,
  isLoggedIn: false,
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

interface VerifyEmailPayload {
  code: string | null;
  email: string | null;
}

interface VerifyEmailResponse {
  message: string;
}

interface ResendVerificationEmailPayload {
  email: string | null;
}

interface ResendVerificationEmailResponse {
  message: string;
}

interface SignInPayload {
  email: string;
  password: string;
  ipAddress: string;
  userAgent: string;
}

interface SignInResponse {
  message: string;
}

interface GetUserDataPayload {}

interface GetUserDataResponse {
  _id: string;
  email: string;
  lastTimeSignIn: Date;
  accountCreatedAt: string;
}

interface IsLogedResponse {
  message: string;
}

interface IsLoggedPayload {}

// Create an async thunk for signing up
export const signUpAuth = createAsyncThunk<
  SignUpResponse, // The type of data that will be returned from the async action
  SignUpPayload, // The type of the arguments passed to the action
  { rejectValue: string } // You can also handle errors in a specific way using rejectValue
>("/api/v1/auth/sign-up", async (payload: SignUpPayload, thunkAPI) => {
  try {
    const response = await axios.post("/api/v1/auth/sign-up", payload);
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

// Create an async thunk for verify email
export const verifyEmailAuth = createAsyncThunk<
  VerifyEmailResponse, // The type of data that will be returned from the async action
  VerifyEmailPayload, // The type of the arguments passed to the action
  { rejectValue: string } // You can also handle errors in a specific way using rejectValue
>("/api/v1/auth/verify", async (payload: VerifyEmailPayload, thunkAPI) => {
  try {
    const response = await axios.post(
      `/api/v1/auth/verify?email=${payload.email}`,
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

// Create an async thunk for resend verification email
export const ResendVerificationEmailAuth = createAsyncThunk<
  ResendVerificationEmailResponse, // The type of data that will be returned from the async action
  ResendVerificationEmailPayload, // The type of the arguments passed to the action
  { rejectValue: string } // You can also handle errors in a specific way using rejectValue
>(
  "/api/v1/auth/verify",
  async (payload: ResendVerificationEmailPayload, thunkAPI) => {
    try {
      const response = await axios.post(
        `/api/v1/auth/resend-verification?email=${payload.email}`,
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

// Create an async thunk for signing
export const signInAuth = createAsyncThunk<
  SignInResponse, // The type of data that will be returned from the async action
  SignInPayload, // The type of the arguments passed to the action
  { rejectValue: string } // You can also handle errors in a specific way using rejectValue
>("/api/v1/auth/sign-in", async (payload: SignInPayload, thunkAPI) => {
  try {
    const response = await axios.post("/api/v1/auth/sign-in", payload);
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

// Create an async thunk for get user data
export const getUserData = createAsyncThunk<
  GetUserDataResponse, // The type of data that will be returned from the async action
  GetUserDataPayload, // The type of the arguments passed to the action
  { rejectValue: string } // You can also handle errors in a specific way using rejectValue
>("/api/v1/auth/user-data", async (payload: GetUserDataPayload, thunkAPI) => {
  try {
    const response = await axios.get("/api/v1/auth/user-data");
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

// Create an async thunk for checking if the user is logged in
export const isLoggedIn = createAsyncThunk(
  'auth/isLoggedIn',  // action type (the first argument)
  async () => {
    try {
      const response = await axios.get('/api/v1/auth/islogged-in');
      // If the API responds that the user is logged in, return true
      if (response.data.message === 'Your are Logged.') {
        return true;
      }
      return false;
    } catch (error: unknown) {
      // Return false if there's an error
      return false;
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
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userData = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occured.";
      })
      .addCase(isLoggedIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(isLoggedIn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isLoggedIn = action.payload;
      })
      .addCase(isLoggedIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occured.";
      });
  },
});

// Export actions
export const {} = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
