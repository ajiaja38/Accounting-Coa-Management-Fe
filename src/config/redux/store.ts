import { configureStore } from "@reduxjs/toolkit"
import { Auth } from "./auth/reducer"

const store = configureStore({
  reducer: {
    Auth: Auth.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
