import { backendURL } from "@/constant/backendUrl";
import getCookie from "@/utils/getCookie";
import setCookie from "@/utils/setCookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface GetUserDataResponse {
  message?: {
    email?: string;
    [key: string]: any; // For additional fields
  };
}

// Define the types for the state
interface AuthState {
  userData: GetUserDataResponse | null; // Adjusted to match expected response structure
  userCartAndPaymentHistory: any; // Replace with appropriate type
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: AuthState = {
  userData: null, // Initialize as null since no data is available initially
  userCartAndPaymentHistory: null, // Same for payment history
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

interface ForgetPasswordPayload {
  email: string | null;
}

interface ForgetPasswordResponse {
  message: string;
}

interface ResetPasswordPayload {
  password: string | null;
  confirmPassword: string | null;
  token : string | undefined | null;
}

interface ResetPasswordResponse {
  message: string;
}

interface GetUserCartAndPaymentHistoryPayload {
  email : string | undefined;
}

interface GetUserCartAndPaymentHistoryResponse {
  cart : any;
  paymentHistory : any;
}

const token = getCookie('accessToken'); 

// Create an async thunk for signing up
export const signUpAuth = createAsyncThunk<
  SignUpResponse, // The type of data that will be returned from the async action
  SignUpPayload, // The type of the arguments passed to the action
  { rejectValue: string } // You can also handle errors in a specific way using rejectValue
>("/api/v1/auth/sign-up", async (payload: SignUpPayload, thunkAPI) => {
  try {
    const response = await axios.post(`${backendURL}/api/v1/auth/sign-up`, payload);
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
      `${backendURL}/api/v1/auth/verify?email=${payload.email}`,
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
        `${backendURL}/api/v1/auth/resend-verification?email=${payload.email}`,
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
    const response = await axios.post(`${backendURL}/api/v1/auth/sign-in`, payload);
    const accessToken = response.data.token; // Extract the token from the response data
     // Set the cookie manually
    setCookie('accessToken', accessToken, 7);

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
>("/api/v1/auth/user-data", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/auth/user-data`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Send token in the Authorization header
      },
    });
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

export const getUserCartAndPaymentHistory = createAsyncThunk<
  GetUserCartAndPaymentHistoryResponse, 
  GetUserCartAndPaymentHistoryPayload, 
  { rejectValue: string }
>("/api/v1/auth/activities", async (payload: GetUserCartAndPaymentHistoryPayload, thunkAPI) => {
  try {
    const response = await axios.post(`${backendURL}/api/v1/auth/user-activities`, payload);
    return response.data; 
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
  "/api/v1/auth/isLoggedIn", // action type (the first argument)
  async () => {
    try {
      const response = await axios.get(`${backendURL}/api/v1/auth/islogged-in`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Send token in the Authorization header
        },
      });
      // If the API responds that the user is logged in, return true
      if (response.data.message === "Your are Logged.") {
        return true;
      }
      return false;
    } catch (error: unknown) {
      // Return false if there's an error
      return false;
    }
  }
);


// Create an async thunk for forget password
export const forgetPasswordAuth = createAsyncThunk<
  ForgetPasswordResponse, // The type of data that will be returned from the async action
  ForgetPasswordPayload, // The type of the arguments passed to the action
  { rejectValue: string } // You can also handle errors in a specific way using rejectValue
>(
  "/api/v1/auth/forget-password",
  async (payload: ForgetPasswordPayload, thunkAPI) => {
    try {
      const response = await axios.post(
        `${backendURL}/api/v1/auth/forget-password`,
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

// Create an async thunk for reset password
export const resetPasswordAuth = createAsyncThunk<
  ResetPasswordResponse, // The type of data that will be returned from the async action
  ResetPasswordPayload, // The type of the arguments passed to the action
  { rejectValue: string } // You can also handle errors in a specific way using rejectValue
>(
  `${backendURL}/api/v1/auth/reset-password/:token`,
  async (payload: ResetPasswordPayload, thunkAPI) => {
    try {
      const response = await axios.post(
        `${backendURL}/api/v1/auth/reset-password/:${payload.token}`,
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
      })
      .addCase(getUserCartAndPaymentHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCartAndPaymentHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userCartAndPaymentHistory = action.payload;
      })
      .addCase(getUserCartAndPaymentHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occured.";
      });
  },
});

// Export actions
export const {} = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
