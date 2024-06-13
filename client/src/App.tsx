// react router dom imports
import { BrowserRouter, Routes, Route} from "react-router-dom"
// pages
import {Welcome, LogIn, ResetPassword, ResetPasswordOPT, Dashboard, NotFound} from "@/pages"
// layouts
import {Main, PrivateRoute} from "@/layouts"
// sonner
import { Toaster } from "@/components/ui/sonner";
// theme provider
import {ThemeProvider} from "@/context/ThemeProviderContext"


function App() {

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
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
      <Toaster />
    </ThemeProvider>
  );
}

export default App
