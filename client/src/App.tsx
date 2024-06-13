// react router dom imports
import { BrowserRouter, Routes, Route} from "react-router-dom"
// pages
import {Welcome, LogIn, ResetPassword, ResetPasswordOPT, Dashboard} from "@/pages"
// layouts
import Main from "@/layouts/main"
//Redux
import { useAppSelector } from "./store/reduxHooks"
import { selectUser } from "../src/store/features/userSlice"

function App() {
  const user = useAppSelector(selectUser)

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />}>
          // If user not log in show welcome page
          {user === null && (
            <>
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/reset-password-opt"
                element={<ResetPasswordOPT />}
              />
            </>
          )}
          // If user log in show dashboard
          {user !== null && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
