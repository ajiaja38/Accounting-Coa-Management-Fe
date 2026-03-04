import { lazy } from "react"
import { createHashRouter } from "react-router"
import AuthGuard from "./guard/auth.guard"
import Journal from "../pages/private/Journal"

const LoginPage = lazy(() => import("../pages/common/LoginPage"))
const Home = lazy(() => import("../pages/private/Home"))
const DashboardLayout = lazy(() => import("../layout/DashboardLayout"))

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
          {
            path: "/testing-1",
            element: <div>Testing 1</div>,
          },
        ],
      },
    ],
  },
])

export default router
