import React from 'react';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import UserLayout from './components/layout/UserLayout'
import MerchantLayout from './components/layout/MerchantLayout';
import AdminLayout from './components/layout/AdminLayout';

import ChoicePage from './pages/user/eateryChoices/choicePage.tsx';
import AccountsListPage from './pages/admin/accountsList/accountsListPage.tsx';

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
            {/* Insert your page here */}            
          </Route>
          <Route element={<AdminLayout />}>
            <Route path="/accountslist" element={<AccountsListPage />} />
            {/* Insert your page here */}
          </Route>         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
