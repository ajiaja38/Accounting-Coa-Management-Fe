import { createSlice } from "@reduxjs/toolkit"
import type { IResponseLogin } from "./auth.interface"
import * as slices from "./slices"
import { EReducer } from "../../../types/enum/EReducer.enum"

interface IAuthState {
  loading: boolean
  isLogin: boolean
  user: IResponseLogin
}

const initialState: IAuthState = {
  loading: false,
  isLogin: false,
  user: {} as IResponseLogin,
}

export const Auth = createSlice({
  name: EReducer.AUTH,
  initialState,
  reducers: {
    setLoading: (state, action) => (state.loading = action.payload),
  },
  extraReducers(builder) {
    builder
      .addCase(slices.login.pending, (state) => {
        state.loading = true
      })
      .addCase(slices.login.fulfilled, (state, action) => {
        state.loading = false
        state.isLogin = true
        state.user = action.payload.data
      })
      .addCase(slices.login.rejected, (state) => {
        state.loading = false
        state.isLogin = false
        state.user = {} as IResponseLogin
      })
      .addCase(slices.getMe.pending, (state) => {
        state.loading = true
      })
      .addCase(slices.getMe.fulfilled, (state, action) => {
        state.loading = false
        state.isLogin = true
        state.user = action.payload.data
      })
      .addCase(slices.getMe.rejected, (state) => {
        state.loading = false
        state.isLogin = false
        state.user = {} as IResponseLogin
      })
  },
})

export const actions = Auth.actions
export default Auth.reducer
