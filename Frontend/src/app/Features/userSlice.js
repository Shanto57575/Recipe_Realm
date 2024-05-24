import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: null,
    isLoading: false,
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        authStart: (state) => {
            state.isLoading = true
            state.error = null
        },
        authSuccess: (state, action) => {
            state.userInfo = action.payload
            state.isLoading = false
            state.error = null
        },
        authFailure: (state, action) => {
            state.userInfo = null
            state.isLoading = false
            state.error = action.payload
        },
        SignedOut: (state) => {
            state.userInfo = null
            state.isLoading = false
            state.error = null
        }
    }
})

export const { authStart, authSuccess, authFailure, SignedOut } = userSlice.actions

export default userSlice.reducer