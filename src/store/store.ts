import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userId: string | null;
  name: string | null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: { userId: null, name: null } as AuthState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      state.userId = action.payload.userId;
      state.name = action.payload.name;
    },
    clearUser: (state) => {
      state.userId = null;
      state.name = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export const store = configureStore({
  reducer: { auth: authSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
