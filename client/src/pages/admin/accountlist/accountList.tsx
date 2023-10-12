import React, { useEffect, useState } from 'react'
import MerchAdHeader from '../../../components/headers/MerchAdHeader'
import { RiUserFill } from 'react-icons/ri';
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import config from '../../../common/config';

const theme = createTheme({
  palette: {
    primary: {
      main: '#DD2803',
    },
  },
});

interface AccountDetailsProps {
  account_id: number;
  account_name: string;
  email_address: string;
  account_type: number;
  account_status: string;
  password: string;
  contact_number: string;
}

const AccountList = () => {
  const [users, setData] = useState<AccountDetailsProps[]> ([]);
  const [date, setDate] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Pagination
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAccountListPage = users.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setDate(new Date());
    axios.get(`${config.API}/user/retrieve_all`)
    .then(res => {
      setData(res.data.user);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <div className='w-[100%]'>
      <MerchAdHeader icon={RiUserFill} title='Account List' />
      <div className='font-medium font-poppins shadow-2xl mx-5 my-5 p-5 rounded-lg h-[87vh]'>

      <label htmlFor="filterList" className='text-slate-600'>Filter by: </label>
      <select id="filtersList" className='rounded-lg border border-black m-4 mr-80 py-1 px-5'>
        <option value="allAccounts">All Accounts</option>
        <option value="stat_active">Status: Active</option>
        <option value="stat_abolished">Status: Abolished</option>
        <option value="type_cust">Type: Customer</option>
        <option value="type_admin">Type: Merchant</option>
      </select>

      <label htmlFor="searchBar" className='ml-[580px]'>Search: </label>
      <input type="text" placeholder='Input name or email' id='searchBar' className='rounded-lg border border-slate-500 px-3 py-1'/>

      <div className='flex flex-col'> {/* CONSIDER REMOVING CLASSNAME*/}
        <div className='flex flex-col h-[65vh]'>
          <table className='table-auto'>
            <thead className='border-black border-y'>
              <tr>
                <th className='mx-5 py-3'>ID</th>
                <th className='mx-5 py-3'>Account Name</th>
                <th className='mx-5 py-3'>E-mail Address</th>
                <th className='mx-5 py-3'>Contact Number</th>
                <th className='mx-5 py-3'>Type</th>
                <th className='mx-5 py-3'>Status</th>
                <th className='mx-5 py-3'>Manage</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {currentAccountListPage.length > 0 ? (
                currentAccountListPage.map((account, index) => (
                  <tr>
                    <td className='text-md px-12 py-3'>{account.account_id}</td>
                    <td className='text-md px-12 py-3'>{account.account_name}</td>
                    <td className='text-md px-12 py-3'>{account.email_address}</td>
                    <td className='text-md px-12 py-3'>{account.contact_number}</td>
                    <td className='text-md px-12 py-3'>
                      {account.account_type === 1? 'Customer': 'Merchant'}
                    </td>
                    <td className='text-md px-12 py-3'>
                      <button 
                        className={'rounded-full px-4 cursor-default ' + (account.account_status === 'active'? 'bg-emerald-200 text-green-900' : 'bg-red-500 text-white')}>
                        {account.account_status === 'active'? 'Active' : 'Abolished'}
                      </button>
                    </td>
                    <td className='text-md px-5 py-3'>
                    <button className='bg-red-600 text-white rounded-full px-4'>
                      Delete
                    </button>
                  </td>
                  </tr>
                ))
              ) : (
                <p>No Accounts</p>
              )}
            </tbody>
          </table>
        </div>
        <div className='text-slate-500 font-semibold bottom-[50px] right-[80px] text-xl'>
          <h1 className='align-text-bottom text-right'>{`Accounts as of ${date}`}</h1>
        </div>

        <div className="flex justify-center mb-20 w-[100%] h-[7%]">
            <ThemeProvider theme={theme}>
              <Pagination
                count={Math.ceil(users.length / itemsPerPage)}
                shape="rounded"
                showFirstButton
                showLastButton
                color="primary"
                className="absolute bottom-8"
                onChange={handlePageChange}
                page={currentPage}
              />
            </ThemeProvider>
            <div className="text-[#969696] text-xs absolute bottom-3">
              Page {currentPage} of {Math.ceil(users.length / itemsPerPage)}
            </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default AccountList