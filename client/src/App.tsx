// react router dom imports
import { BrowserRouter, Routes, Route} from "react-router-dom"
// pages
import {Welcome, LogIn, ResetPassword, ResetPasswordOPT, Dashboard, NotFound} from "@/pages"
// layouts
import {Main, PrivateRoute} from "@/layouts"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />}>
          // Public routes
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-password-opt" element={<ResetPasswordOPT />} />
          // Private route
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            //Not found route
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
