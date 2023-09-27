import React from 'react'

const AccountList = () => {
  return (
    <div className='font-poppins shadow-2xl mx-5 my-5 p-5 rounded-lg'>

      <label htmlFor="filterList" className='text-slate-600'>Filter by: </label>
      <select name="filterList" id="filtersList" className='rounded-lg border border-black m-4 mr-40'>
        <option value="allAccounts">All Accounts</option>
        <option value="none">None</option>
      </select>

      <label htmlFor="searchBar">Search: </label>
      <input type="text" placeholder='Input name or email' id='searchBar' className='rounded-lg border border-slate-500'/>
      
      <div className='relative flex flex-col'>
        <table className='table-fixed w-auto'>
          <thead className='border-black border-y'>
            <tr>
              <th className='text-md px-4 py-3'>ID</th>
              <th className='text-md px-4 py-3'>Account Name</th>
              <th className='text-md px-4 py-3'>E-mail Address</th>
              <th className='text-md px-4 py-3'>Contact Number</th>
              <th className='text-md px-4 py-3'>Type</th>
              <th className='text-md px-4 py-3'>Status</th>
              <th className='text-md px-4 py-3'>Manage</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            <tr>
              <td className='text-md px-5 py-3'>1</td>
              <td className='text-md px-5 py-3'>Franz Casimir Ondiano</td>
              <td className='text-md px-5 py-3'>franzcasimir.ondiano@gmail.com</td>
              <td className='text-md px-5 py-3'>09478517200</td>
              <td className='text-md px-5 py-3'>Customer</td>
              <td className='text-md px-5 py-3'>
                <button className='bg-emerald-200 rounded-lg px-4 text-green-900'>
                  Active
                </button>
              </td>
              <td className='text-md px-5 py-3'>
                <button className='bg-red-600 text-white rounded-lg px-4'>
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AccountList