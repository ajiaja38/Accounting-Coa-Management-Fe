import type React from "react"
import { useRedux } from "../../config/hooks/useRedux"
import { EReducer } from "../../types/enum/EReducer.enum"
import { Navigate, Outlet } from "react-router"

interface props {
  redirectPath: string
}

const AuthGuard: React.FC<props> = ({ redirectPath }) => {
  const { Auth } = useRedux(EReducer.AUTH)

  if (!Auth.isLogin) return <Navigate to={redirectPath} />

  return <Outlet />
}

export default AuthGuard
