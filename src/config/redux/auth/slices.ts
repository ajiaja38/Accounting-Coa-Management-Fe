import { createAsyncThunk } from "@reduxjs/toolkit"
import type { ILoginPayload, IResponseLogin } from "./auth.interface"
import api from "../../api/apiInstance"
import type {
  IResponseEntity,
  IResponseMessage,
} from "../../../types/interface/response.interface"

export const login = createAsyncThunk(
  "auth/login",
  async (payload: ILoginPayload, { rejectWithValue }) => {
    try {
      const response: IResponseEntity<IResponseLogin> = await api.post(
        "/auth/login",
        payload,
      )

      return response
    } catch (error: any) {
      return rejectWithValue(error.response.data.message)
    }
  },
)

export const getMe = createAsyncThunk(
  "/auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const response: IResponseEntity<IResponseLogin> =
        await api.get("/auth/me")

      return response
    } catch (error: any) {
      return rejectWithValue(error.response.data.message)
    }
  },
)

export const logout = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response: IResponseMessage = await api.post("/auth/logout")

      return response
    } catch (error: any) {
      return rejectWithValue(error.response.data.message)
    }
  },
)
