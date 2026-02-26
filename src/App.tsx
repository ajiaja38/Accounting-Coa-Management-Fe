import { useEffect, type JSX } from "react"
import { getMe } from "./config/redux/auth/slices"
import { useRedux } from "./config/hooks/useRedux"
import { EReducer } from "./types/enum/EReducer.enum"

const App = (): JSX.Element => {
  const { dispatch, Auth } = useRedux(EReducer.AUTH)

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return <div>App: {Auth.isLogin ? Auth.user.userName : "React"} </div>
}

export default App
