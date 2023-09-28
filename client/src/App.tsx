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
import MerchSettings from './pages/merchant/settings/merchSettings';
import FeedbackList from './pages/merchant/feedbackList/feedbackList';
import ForgetPassword from './pages/forgetPassword';
import MerchDeets from './pages/user/eateryChoices/merchDeets';
import UserProfilePage from './pages/user/accountsProfile/userAccProfile';

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
          <Route path="/forgpass" element={<ForgetPassword/>} />
          <Route path="/logout" element={<LogoutPage/>} />

          {/* Layouts */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/accprofile" element={<UserProfilePage />} />
            <Route path="/eaterychoice" element={<ChoicePage />} />
            <Route path="/eaterychoice/view" element={<MerchDeets />}/> 
            <Route path="/eaterychoice/book" element={<MerchSettings />}/> 
          </Route>
          <Route element={<MerchantLayout />}>
            <Route path="/merchdash" element={<MerchDashboard />}/>
            <Route path="/reservationlist" element={<ReserveList />}/>
            {/* <Route path="/feedbacklist" element={<FeedbackList />}/> */}
            <Route path="/packagemanager" element={<PackageManager />}/>
            <Route path="/merchsettings" element={<MerchSettings />}/>           
          </Route>
          <Route element={<AdminLayout />}>
            <Route path="/admindash" element={<AdminDashboard />}/>
            <Route path="/accountlist" element={<AccountList />}/>
            <Route path="/review" element={<MerchantReview />}/>
          </Route>  

        </Routes>
      </Router>
    </div>
  );
}

export default App;