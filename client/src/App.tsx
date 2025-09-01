import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/ui/theme-provider"
import { Toaster } from "./components/ui/toaster"
import { AuthProvider } from "./contexts/AuthContext"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { DashboardLayout } from "./components/DashboardLayout"
import { Dashboard } from "./pages/Dashboard"
import { TariffSelection } from "./pages/TariffSelection"
import { MyOffice } from "./pages/MyOffice"
import { Analytics } from "./pages/Analytics"
import { Settings } from "./pages/Settings"
import { Modules } from "./pages/Modules"
import { Payments } from "./pages/Payments"
import { CRM } from "./pages/CRM"
import { Cabinets } from "./pages/Cabinets"
import { BlankPage } from "./pages/BlankPage"

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="tariffs" element={<TariffSelection />} />
              <Route path="office" element={<MyOffice />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
              <Route path="modules" element={<Modules />} />
              <Route path="payments" element={<Payments />} />
              <Route path="crm" element={<CRM />} />
              <Route path="cabinets" element={<Cabinets />} />
            </Route>
            <Route path="*" element={<BlankPage />} />
          </Routes>
        </Router>
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App