import { type JSX } from "react"
import { RouterProvider } from "react-router"
import router from "./routes"

const App = (): JSX.Element => {
  return <RouterProvider router={router} />
}

export default App
