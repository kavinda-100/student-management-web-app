import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import { UserSchemaType } from "@/zod/inCommingDataSchema";

type UserType = {
    user: UserSchemaType | null;
};

// Initial State
const initialState: UserType = {
    user: JSON.parse(localStorage.getItem("user") || "{}") as UserSchemaType | null,
};

// Slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserSchemaType>) => {
            state.user = action.payload;
            // Save user to local storage
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
});

// Selectors
export const { setUser, clearUser } = userSlice.actions;

// select user
export const selectUser = (state: RootState) => state.user.user;

// Reducer
export default userSlice.reducer;
