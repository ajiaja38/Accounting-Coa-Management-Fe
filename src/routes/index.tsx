import { createHashRouter } from "react-router"
import LoginPage from "../pages/common/LoginPage"
import AuthGuard from "./guard/auth.guard"
import Home from "../pages/private/Home"
import DashboardLayout from "../layout/DashboardLayout"
import Journal from "../pages/private/Journal"

const router: ReturnType<typeof createHashRouter> = createHashRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <AuthGuard redirectPath='/' />,
    children: [
      {
        path: "/",
        element: <DashboardLayout />,
        children: [
          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "/journal",
            element: <Journal />,
          },
        ],
      },
    ],
  },
])

export default router
