import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserEntity } from "../../entities/user-entity";

const initialState: UserEntity = {} as UserEntity;

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserEntity>) {
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.profile?.username,
                email: action.payload.email,
                role: action.payload.role
            };
        },
        removeUser() {
            return {} as UserEntity;
        }
    }
});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;