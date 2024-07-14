import './App.css';
import {Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import ErrorPage from './Pages/ErrorPage';
import DoctorsList from './Pages/DoctorsList';
import Application from './Component/DoctorApplication.jsx/Application';
import Profile from './Component/DoctorProfile/Profile';
import Appointments from './Pages/Appointments'
import Notifications from './Pages/Notifications'
import Addprescription from './Pages/Addprescription';
import Prescriptions from './Pages/Prescriptions';
import ApproveAppointMent from './Component/ApproveAppointMent/ApproveAppointMent';
import DoctorApproval from './Component/DoctorApproval/DoctorApproval';
import Users from './Component/Users/Users'
import Doctors from './Component/DoctorsAdmin/Doctors'
import DashBoard from './Pages/DashBoard';
import AdminContact from './Component/AdminContact/AdminContact';
import SingleProfile from './Pages/SingleProfile';
import UserRouter from './Router/UserRouter'
import AdminRouter from './Router/Adminrouter'
import ForgetPassword from './Pages/ForgetPassword';
import ResetPassword from './Pages/ResetPassword';

function App() {
  return (
    <>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/register" element = {<Register/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/forget-password" element={<ForgetPassword/>}/>
        <Route path = "/resetpassword/:token" element = {<ResetPassword/>}/>
        <Route path = "/error" element = {<ErrorPage/>}/>
        <Route path = "/userprofile" element = {<SingleProfile/>}/>
        <Route path = "/single-profile/:id" element = {<Profile/>}/>
        <Route path = '/doctorslist' element ={<DoctorsList/>}/>
        <Route path = "/dashboard" element = {<AdminRouter/>}>
          <Route path = "" element ={<DashBoard/>}/>
        </Route>
        <Route path = "/dashboard/doctors" element = {<AdminRouter/>}>
          <Route path = "" element ={<Doctors/>}/>
        </Route>
        <Route path = "/dashboard/contacts" element = {<AdminRouter/>}>
          <Route path = "" element ={<AdminContact/>}/>
        </Route>
        <Route path = "/dashboard/user" element = {<AdminRouter/>}>
          <Route path = "" element ={<Users/>}/>
        </Route>
        <Route path = "/dashboard/doctors-approval" element = {<AdminRouter/>}>
          <Route path = "" element ={<DoctorApproval/>}/>
        </Route>
        <Route path = "/dashboard/appointments" element = {<AdminRouter/>}>
          <Route path = "" element ={<ApproveAppointMent/>}/>
        </Route>
        <Route path = '/user-appointments' element ={<Appointments/>}/>
        <Route path = '/user-notifications' element ={<Notifications/>}/>
        <Route path = "/addpres" element = {<UserRouter/>}>
          <Route path = "" element = {<Addprescription/>}/>
        </Route>
        <Route path = "/get-pres" element = {<UserRouter/>}>
          <Route path = "" element = {<Prescriptions/>}/>
        </Route>
        <Route path = "/application" element = {<UserRouter/>}>
          <Route path = "" element = {<Application/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
