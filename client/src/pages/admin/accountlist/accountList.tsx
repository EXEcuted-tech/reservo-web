import React, { useEffect, useState } from 'react'
import MerchAdHeader from '../../../components/headers/MerchAdHeader'
import { RiUserFill } from 'react-icons/ri';
import axios from 'axios';
import config from '../../../common/config';

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
  const [date, setDate] = useState<Date | null>(null);
  const [users, setData] = useState<AccountDetailsProps[]> ([]);

  useEffect(() => {
    setDate(new Date());
    axios.get(`${config.API}/user/retrieve_all`)
    .then(res => {
      setData(res.data.user);
      // console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

// ACCOUNT TYPE: 
// user = 1
// merchant = 10

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
        <option value="type_admin">Type: Admin</option>
      </select>

      <label htmlFor="searchBar" className='ml-[580px]'>Search: </label>
      <input type="text" placeholder='Input name or email' id='searchBar' className='rounded-lg border border-slate-500 px-3 py-1'/>

      <div className='flex flex-col'> {/* CONSIDER REMOVING CLASSNAME*/}
        <div className='flex flex-col h-[70vh]'>
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
              {users.map((account, index) => (
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
              ))}

              {/* <tr>
                <td className='text-md px-12 py-3'>1</td>
                <td className='text-md px-12 py-3'>Franz Casimir Ondiano</td>
                <td className='text-md px-12 py-3'>franzcasimir.ondiano@gmail.com</td>
                <td className='text-md px-12 py-3'>09478517200</td>
                <td className='text-md px-12 py-3'>Customer</td>
                <td className='text-md px-12 py-3'>
                  <button className='bg-emerald-200 rounded-lg px-4 text-green-900 cursor-default'>
                    Active
                  </button>
                </td>
                <td className='text-md px-5 py-3'>
                  <button className='bg-red-600 text-white rounded-lg px-4'>
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td className='text-md px-10 py-3'>2</td>
                <td className='text-md px-12 py-3'>Matthew Dave Desabelle</td>
                <td className='text-md px-12 py-3'>desabellematthew@gmail.com</td>
                <td className='text-md px-12 py-3'>09123456789</td>
                <td className='text-md px-12 py-3'>Customer</td>
                <td className='text-md px-12 py-3'>
                  <button className='bg-emerald-200 rounded-lg px-4 text-green-900 cursor-default'>
                    Active
                  </button>
                </td>
                <td className='text-md px-5 py-3'>
                  <button className='bg-red-600 text-white rounded-lg px-4'>
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td className='text-md px-10 py-3'>3</td>
                <td className='text-md px-12 py-3'>Lourd Sam Abrigos</td>
                <td className='text-md px-12 py-3'>bobot@gmail.com</td>
                <td className='text-md px-12 py-3'>0955555555</td>
                <td className='text-md px-12 py-3'>Customer</td>
                <td className='text-md px-12 py-3'>
                  <button className='bg-emerald-200 rounded-lg px-4 text-green-900 cursor-default'>
                    Active
                  </button>
                </td>
                <td className='text-md px-5 py-3'>
                  <button className='bg-red-600 text-white rounded-lg px-4'>
                    Delete
                  </button>
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
        <div className='text-slate-500 font-semibold bottom-[50px] right-[80px] text-xl'>
          <h1 className='align-text-bottom text-right'>{`Accounts as of ${date}`}</h1>
        </div>
      </div>
      </div>
    </div>
  )
}

export default AccountList