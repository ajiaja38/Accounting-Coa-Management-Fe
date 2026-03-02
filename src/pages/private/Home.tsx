import { useRedux } from "../../config/hooks/useRedux"
import { EReducer } from "../../types/enum/EReducer.enum"

const Home = () => {
  const { Auth } = useRedux(EReducer.AUTH)

  return <h1>Hello, {Auth.user.email}</h1>
}

export default Home
