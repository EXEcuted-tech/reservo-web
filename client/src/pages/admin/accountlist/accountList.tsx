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

const AccountList = () =>{
    return (
        <div>
            <MerchAdHeader icon={RiUserFill} title='Account List' />
            <AccountListComponent/>
        </div>
    )
}

const AccountListComponent = () => {
  const [users, setData] = useState<AccountDetailsProps[]> ([]);
  const [date, setDate] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('allAccounts');

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
      //PUT ERROR NOTIF 
    })
  }, []);

  const HandleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const HandleSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredAccounts = users.filter((user) =>{
    return(
      (user.account_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email_address.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filter === 'allAccounts' || user.account_type.toString() === filter ||
      user.account_status === filter) 
    )
  });

  return (
    <div className='w-[100%] h-[90vh] pt-[1%] bg-[#F3F3F3] animate-fade-in overflow-y-auto overflow-x-hidden'>

      <div className='bg-white font-medium font-poppins shadow-2xl mx-5 p-5 rounded-lg h-[87vh] overflow-y-auto overflow-x-hidden xl:max-2xl:h-full'>

      <label htmlFor="filterList" className='text-slate-600 xl:max-2xl:text-[0.9em]'>Filter by: </label>
      <select id="filtersList" className='rounded-lg border bg-white border-black m-4 mr-80 py-1 px-5  xl:max-2xl:text-[0.9em]'>
        <option value="allAccounts">All Accounts</option>
        <option value="active">Status: Active</option>
        <option value="abolished">Status: Abolished</option>
        <option value="1">Type: Customer</option>
        <option value="10">Type: Merchant</option>
      </select>

      <label htmlFor="searchBar" className='ml-[35%] bg-white xs:max-sm:ml-0 xl:max-2xl:text-[0.9em] xl:max-2xl:ml-[20%] '>Search: </label><br className='hidden xs:max-sm:block'/>
      <input type="text" placeholder='Input name or email' id='searchBar' className='bg-white rounded-lg border border-slate-500 px-3 py-1  xl:max-2xl:text-[0.9em]'/>

      <div className='bg-white text-slate-500 font-semibold text-[1.2em] xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.9em]'>
          <h1 className='text-[#bbbbbb]'>{`As of ${date}`}</h1>
        </div>
      <div className='bg-white flex flex-col'> {/* CONSIDER REMOVING CLASSNAME*/}
        <div className='flex flex-col h-[65vh] overflow-y-hidden'>
          <table className='table-auto'>
            <thead className='border-black border-y'>
              <tr className='xs:max-sm:text-[0.9em] xl:max-2xl:text-[0.9em]'>
                <th className='mx-5 py-3'>ID</th>
                <th className='mx-5 py-3'>Account Name</th>
                <th className='mx-5 py-3'>E-mail Address</th>
                <th className='mx-5 py-3'>Contact Number</th>
                <th className='mx-5 py-3'>Type</th>
                <th className='mx-5 py-3'>Status</th>
                <th className='mx-5 py-3'>Manage</th>
              </tr>
            </thead>
            <tbody className='text-center xl:max-2xl:text-[0.7em]'>
              {currentAccountListPage.length > 0 ? (
                filteredAccounts.map((account, index) => (
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
                        className={'rounded-full px-4 cursor-default ' + (account.account_status === 'active'? 
                        'bg-[#00962a] bg-opacity-40 text-green-900' : 'bg-red-500 bg-opacity-40 text-[#840705]')}>
                        {account.account_status === 'active'? 'Active' : 'Abolished'}
                      </button>
                    </td>
                    <td className='text-md px-5 py-3'>
                    <button className='bg-red-600 text-white rounded-lg px-4 py-[2%] 
                      hover:bg-[#840705] transition-colors delay-250 duration-[3000] ease-in'>
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