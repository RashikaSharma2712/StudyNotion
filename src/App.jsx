import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useNavigate  } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/login";
import Signup from "./pages/signUp";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/verifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/errorPage";
import { ACCOUNT_TYPE } from "./utils/constants";
import Cart from "./components/core/Dashboard/Cart";
import AddCourse from "./components/core/Dashboard/AddCourse";

import OpenRoute from "./components/Auth/OpenRoute";
import { PrivateRoute } from "./components/Auth/PrivateRoute";
import { EnrolledCourses } from "./components/core/Dashboard/EnrolledCourses";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:id" element={<UpdatePassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Private Dashboard Routes */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />}/>
          <Route path="dashboard/settings" element={<Settings />}/>

          {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
              <Route path="dashboard/cart" element={<Cart />} />
            </>
          )}

          
          {
          user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/add-course" element={<AddCourse/>} />
             
            </>
          )}

        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
