import React from 'react';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import UserLayout from './components/layout/UserLayout'
import MerchantLayout from './components/layout/MerchantLayout';
import AdminLayout from './components/layout/AdminLayout';

import ChoicePage from './pages/user/eateryChoices/choicePage.tsx';
import AboutUsPage from './pages/user/about/aboutUsPage.tsx';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<UserLayout />}>
            <Route path="/eaterychoice" element={<ChoicePage />} />
            <Route path="/aboutus" element={<AboutUsPage />} />
            {/* Insert your page here */}
          </Route>
          <Route element={<MerchantLayout />}>
            {/* Insert your page here */}            
          </Route>
          <Route element={<AdminLayout />}>
            {/* Insert your page here */}
          </Route>         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
