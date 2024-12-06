import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; 
import Navbar from './Components/Navbar/Navbar'; 
import Footer from './Components/Footer/Footer'; 
import {LoginSignup} from './Pages/LoginSignup/LoginSignup'; 
import StudentDashboard from './Pages/Student/Dashboard/StudentDashboard'; 
import InstructorDashboard from './Pages/Instructor/Dashboard/InstructorDashboard'; 
import Profile from './Pages/Profile/Profile';
import Calendar from './Pages/Calender/Calendar';
import StudentCourses from './Pages/Student/Courses/StudentCourses';
import { Events } from './Pages/Events/Events';
import StudentAssessment from './Pages/Student/Assesement/StudentAssesement';
import InstructorCourses from './Pages/Instructor/Courses/InstructorCourses';


const DashboardLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Login/Signup Page */}
          <Route 
            path="/"
            element={<LoginSignup />} 
          />
          <Route 
            path="/login"
            element={<LoginSignup />} 
          />
          
          {/* Student Dashboard */}
          <Route 
            path="/student/dashboard" 
            element={
              <DashboardLayout>
                <StudentDashboard />
              </DashboardLayout>
            }
          />

          {/* Courses Page */}
          <Route 
            path="/student/courses" 
            element={
              <DashboardLayout> 
                <StudentCourses />
              </DashboardLayout> 
            }
          />

          {/* Assesement Page */}
          <Route 
            path="/student/assesement" 
            element={
              <DashboardLayout>
                <StudentAssessment/>
              </DashboardLayout>
            }
          />

          {/* Instructor Dashboard */}
          <Route 
            path="/instructor/dashboard" 
            element={
              <DashboardLayout>
                <InstructorDashboard />
              </DashboardLayout>
            }
          />

          {/* Instructor Courses */}
          <Route 
            path="/instructor/courses" 
            element={
              <DashboardLayout>
                <InstructorCourses />
              </DashboardLayout>
            }
          />

          {/* Profile Page */}
          <Route 
            path="/profile" 
            element={
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            }
          />
          
          {/* Calendar Page */}
          <Route 
            path="/calendar" 
            element={
              <DashboardLayout>
                <Calendar />
              </DashboardLayout>
            }
          />

          
          {/* Calendar Page */}
          <Route 
            path="/events" 
            element={
              <DashboardLayout>
                <Events/>
              </DashboardLayout>
            }
          />

        </Routes>
      </Router>
    </div>
  );
}

export default App;