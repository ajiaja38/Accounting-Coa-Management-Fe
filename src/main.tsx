import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App as AntApp } from "antd"
import "./index.css"
import App from "./App.tsx"
import { Provider } from "react-redux"
import store from "./config/redux/store.ts"
import SplashScreen from "./components/SplashScreen.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AntApp>
        <SplashScreen>
          <App />
        </SplashScreen>
      </AntApp>
    </Provider>
  </StrictMode>,
)
