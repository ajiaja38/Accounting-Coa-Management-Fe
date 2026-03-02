import React, { useEffect, useState } from "react"
import { useRedux } from "../config/hooks/useRedux"
import { EReducer } from "../types/enum/EReducer.enum"
import { getMe } from "../config/redux/auth/slices"
import { Spin } from "antd"

interface Props {
  children: React.ReactNode
}

const SplashScreen: React.FC<Props> = ({ children }) => {
  const { Auth, dispatch } = useRedux(EReducer.AUTH)
  const [show, setShow] = useState<boolean>(true)

  useEffect(() => {
    dispatch(getMe())

    const timer = setTimeout(() => setShow(false), 1200)
    return () => clearTimeout(timer)
  }, [dispatch])

  if (show || Auth.splashscreen) {
    return (
      <div className='relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#1677ff]'>
        <div className='absolute inset-0 bg-linear-to-br from-[#1677ff] via-[#4096ff] to-[#69b1ff] animate-pulse opacity-80'></div>

        <div className='relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 px-12 py-10 rounded-3xl shadow-2xl text-center transition-all duration-500 animate-bounce'>
          <h1 className='text-white text-3xl font-bold tracking-wide mb-4'>
            Accounting Management
          </h1>

          <Spin size='large' />

          <p className='text-white/80 mt-4 text-sm tracking-wider'>
            Initializing system...
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default SplashScreen
