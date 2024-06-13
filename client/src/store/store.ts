import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

// Import the slice reducers
import userReducer from "@/store/features/userSlice";

// persistConfig 
const persistConfig = {
  key: "root",
  version: 1,
  storage,
}

// Combine the slice reducers
const reducers = combineReducers({
  user: userReducer,
});

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
