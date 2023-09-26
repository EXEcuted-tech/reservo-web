import React from 'react';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import UserLayout from './components/layout/UserLayout'
import MerchantLayout from './components/layout/MerchantLayout';
import AdminLayout from './components/layout/AdminLayout';
import PackageManager from './pages/merchant/package/packageManager.tsx';
import ChoicePage from './pages/user/eateryChoices/choicePage.tsx';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<UserLayout />}>
            <Route path="/eaterychoice" element={<ChoicePage />} />
            {/* Insert your page here */}
          </Route>
          <Route element={<MerchantLayout />}>
            <Route path="/packagemanager" element ={<PackageManager/>}/>
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
