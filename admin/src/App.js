import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AdminEvent } from './Pages/AdminEvent/AdminEvent';
import { AdminDashboard } from './Pages/AdminDashboard/AdminDashboard';
import AdminNavbar from './Components/Navbar/AdminNavbar';
import { AdminFooter } from './Components/Footer/AdminFooter';
import { AdminRequests } from './Pages/AdminRequests/AdminRequests';
import { AdminLoginSignup } from './Pages/AdminLoginSignup/AdminLoginSignup';
import AdminProfile from './Pages/AdminProfile/AdminProfile';


const DashboardLayout = ({ children }) => (
  <>
    <AdminNavbar />
    {children}
    <AdminFooter />
  </>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Admin Login/Signup */}
          <Route
            path="/admin/loginsignup"
            element={
                <AdminLoginSignup/>
            }
          />

          {/* Admin Login/Signup */}
          <Route
            path="/"
            element={
                <AdminLoginSignup/>
            }
          />

          {/* Admin Dashboard */}
          <Route
            path="/admin/dashboard"
            element={
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            }
          />

          {/* Admin Events */}
          <Route
            path="/admin/events"
            element={
              <DashboardLayout>
                <AdminEvent />
              </DashboardLayout>
            }
          />

          {/* Admin Requests */}
          <Route
            path="/admin/requests"
            element={
              <DashboardLayout>
                <AdminRequests />
              </DashboardLayout>
            }
          />

          {/* Admin Profile */}
          <Route
            path="/admin/profile"
            element={
              <DashboardLayout>
              <AdminProfile/>
              </DashboardLayout>
            }
          />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
