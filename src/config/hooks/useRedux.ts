import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux"
import { EReducer } from "../../types/enum/EReducer.enum"
import type { AppDispatch, RootState } from "../redux/store"

export const useAppDispatch = useDispatch<AppDispatch>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useRedux = (reducer: EReducer = EReducer.AUTH) => {
  const dispatch = useAppDispatch()
  const store = useAppSelector((state: RootState) => state[reducer])

  return {
    dispatch,
    [reducer]: store,
  }
}
