import React from 'react';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import UserLayout from './components/layout/UserLayout'
import MerchantLayout from './components/layout/MerchantLayout';
import AdminLayout from './components/layout/AdminLayout';

import ChoicePage from './pages/user/eateryChoices/choicePage';
import ReserveList from './pages/merchant/reservationList/mainPage'
import PackageManager from './pages/merchant/package/packageManager';
import LandingPage from './pages/user/landing/landingPage';
import UserLogin from './pages/user/login/userLogin';
import AdminLogin from './pages/admin/login/adminLogin';
import AboutUsPage from './pages/user/about/aboutUsPage';
import UserSignUp from './pages/user/signup/userSignUp';
import MerchSignUp from './pages/merchant/signup/merchSignUp';
import LogoutPage from './pages/logoutPage';
import MerchDashboard from './pages/merchant/dashboard/dashBoard';
import AdminDashboard from './pages/admin/dashboard/dashBoard';
import MerchantReview from './pages/admin/review/merchantReview';
import AccountList from './pages/admin/accountlist/accountList';
import ReservationManager from './pages/merchant/reservationManager/reservationManager';
import MerchantCalendar from './pages/merchant/reservationManager/merchantCalendar';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* General */}
          <Route path="/uslogin" element={<UserLogin />} />
          <Route path="/adlogin" element={<AdminLogin/>} />
          <Route path="/usregister" element={<UserSignUp/>} />
          <Route path="/merchregister" element={<MerchSignUp/>} />
          <Route path="/logout" element={<LogoutPage/>} />

          {/* Layouts */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/eaterychoice" element={<ChoicePage />} />
            {/* Insert your page here */}
          </Route>
          <Route element={<MerchantLayout />}>
            <Route path="/merchdash" element={<MerchDashboard />}/>
            <Route path="/reservationlist" element={<ReserveList />}/>
            <Route path="/packagemanager" element={<PackageManager />}/>
            <Route path="/reservationManager" element={<ReservationManager />}/>
            <Route path="/merchantCalendar" element={<MerchantCalendar />}/>
            {/* Insert your page here */}            
          </Route>
          <Route element={<AdminLayout />}>
            <Route path="/admindash" element={<AdminDashboard />}/>
            <Route path="/accountlist" element={<AccountList />}/>
            <Route path="/review" element={<MerchantReview />}/>
            {/* Insert your page here */}
          </Route>  

        </Routes>
      </Router>
    </div>
  );
}

export default App;
