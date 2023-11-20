import React, {useState, useEffect} from 'react'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {IoPeopleOutline} from 'react-icons/io5'
import {BsFolder, BsTrash} from 'react-icons/bs'
import Logo from '../../assets/jjlogo.png'
import axios from 'axios'
import config from '../../common/config'
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#DD2803',
    }
  },
});

const MerchantTeamDeets = ( {merchantID} :{merchantID:any} ) => {
    const [buttonStatus, setbuttonStatus] = useState(false)
    const [merchData, setMerchData] = useState([{}])
    const [loading, setLoading] = useState(false)
    const [merchAddress, setmerchAddress] = useState([{}])
    const [merchAccounts, setmerchAccounts] = useState([{}])
    const [accNames, setaccNames] = useState<any[]>([]); 

    const [currentPage, setCurrentPage] = useState(1)

    const fetchMerchAccounts = async() => {
      const col = "merchant_id"
      const val = merchantID
      try {
          setLoading(true)
          const responseMerchInfo = await axios.get(`${config.API}/merchant/retrieve?col=${col}&val=${val}`)
          setMerchData(responseMerchInfo.data.merchant)
          setmerchAddress(responseMerchInfo.data.address)
          setmerchAccounts(responseMerchInfo.data.accounts)
          
          try{
            const numbers = Object.keys(merchAccounts);
            const usernamePromises = numbers.map(async (userId) => {
              const username = await getUsernameById(userId);
              return username;
            });
      
            const usernames = await Promise.all(usernamePromises);
            setaccNames(usernames);
            console.log(usernames)
          }catch (err){
            console.log(err)
          }
          setLoading(false)
      } catch (error) {
          console.log(error)
      }
  }

  // buggy 😔 when retrieving account_name/employee, remove account_id first then save then add account_id again then save to appear account_name/employee
  const getUsernameById = async (userId:any) => {
    try {
      const col = 'account_id';
      const val = userId;
  
      const response = await axios.get(`${config.API}/user/retrieve?col=${col}&val=${val}`);
      if (response.data.status === 200 && response.data.users[0] && response.data.users[0].account_name) {
        return response.data.users[0].account_name;
      } else {
        console.log("Failed to retrieve account name:", response);
        return '';
      }
    } catch (error) {
      console.log("Error while retrieving account name:", error);
      return '';
    }
  };

    useEffect(() => {
      fetchMerchAccounts();
      console.log(merchData[0]);
    }, [merchantID]);

    const handlePageChange = (event:any, newPage:any) => {
      setCurrentPage(newPage);
  };

  const recordsPerPage = 9;
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = Math.min(startIndex + recordsPerPage, Object.keys(merchAccounts).length);

    return (
        <div className='w-[100%] bg-white h-auto mt-[1%] p-[2%] rounded-ss-2xl flex-row align-center overflow-y-auto animate-fade-in xs:max-sm:w-[180%] xs:max-sm:p-2 xs:max-sm:ml-[-2%]'>
          {/* Dummy Conten 1 */}
          <div className='bg-white h-[10%] flex-row rounded-ss-2xl py-[1%] px-[2%] text-black border-[#F3F3F3] border-b-2 flex font-bold text-[1.4em] items-center hover:cursor-pointer xs:max-sm:text-[1em]'>
          <AiOutlineArrowLeft className='text-[1.4em] text-[#838383] mr-[1%] xs:max-sm:text-[0.9em]' onClick={()=>sessionStorage.setItem('viewDetails','false')}/><p>Merchant Team Details</p>
          </div>
          <div className='bg-white h-[25%] flex-row py-[1%] px-[2%] text-[#838383] p-[1%] flex rounded-xl'>
                <div className='w-[20%] p-[0.5%] pl-[3%] flex'>
                {/* <img src={merchData[0].logo} className='w-auto h-[100%] rounded-[50px]' alt="Logo"/> */}
                </div>
                <div className='w-[55%] justify-center items-left px-[1%] py-[2%] flex flex-col'>
                  {/* <p className='text-[1.5em] text-black text-bold'>{merchData[0].merchant_name}</p> */}
                  {/* <p className='text-[1.2em] text-black'>{merchAddress.barangay}, {merchAddress.municipality}, {merchAddress.country}</p> */}
                  <div className='flex'>
                    <p className='text-[1.2em] text-[#838383] flex'><IoPeopleOutline className='text-[1.5em]'/> {Object.keys(merchAccounts).length} members • </p>
                    {/* <div className={` ml-[1%] w-[15%] text-center rounded-2xl  border-2 ${merchData[0].merch_status === 'Active' ? 'text-[#238700] bg-[#DCFFD0] border-[#238700]' : 'text-[#FFB800] bg-[#FFEEC2] border-[#FFB800]'}`}>
                      <p>{merchData[0].merch_status}</p> 
                    </div> */}
                  </div>                 
                </div>
                <div className='w-[25%] ml-[25%] flex flex-col p-[1%] justify-center items-center text-black'>
                    <div className='hover:cursor-pointer w-auto h-auto text-right'>
                       <p className='text-[#838383] text-[1.2em] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.9em]'>Applied Since</p>
                       <p className='text-[1.1em] xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.8em]'>03/04/2002</p>
                       <p className='group flex text-[1.2em] mt-[2%] hover:text-[#840705] hover:underline hover:underline-offset-4 transition-colors delay-250 duration-[3000] ease-in xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em]'>
                        <BsFolder className='group text-[1.2em] text-[#838383] mr-[2%] hover:text-[#840705] transition-colors delay-250 duration-[3000] ease-in xs:max-sm:text-[1em] xs:max-sm:mt-[5%] xl:max-2xl:text-[1.1em] xl:max-2xl:mt-[4%]'/>
                        Documents</p>
                    </div>
                </div>
              </div>
              <div className='h-[100%] overflow-hidden pt-[2%] text-center'>
                  <table className='w-[100%] border-[#F3F3F3] border-t-2'>
                    <tr className=" text-[1.3em] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.9em]">
                      <th>Employee</th>
                      <th>Email Address</th>
                      <th>Position</th>
                      <th>Manage</th>
                    </tr>
                    {Object.keys(merchAccounts)
                      .slice(startIndex, endIndex)
                      .map((data, i) => (
                        <tr className='border-[#F3F3F3] border-t-2 p-[1%] my-[2%]' key={i}>
                          <td>{accNames[i]}</td>
                          {/* <td>{merchAccounts[data].email}</td>
                          <td>{merchAccounts[data].position}</td> */}
                          <button className='bg-[#DD2803] items-center text-white p-[1%] px-[16%] m-[7%] rounded-md'>
                            <p className='flex items-center text-center justify-center text-[1em]'>
                              <BsTrash className='text-[1em]' /> Delete
                            </p>
                          </button>
                        </tr>
                      ))}
                  </table>
              </div>
              <div className="flex justify-center w-full absolute bottom-8">
                <ThemeProvider theme={theme}>
                  <Pagination
                    count={Math.ceil(Object.keys(merchAccounts).length / recordsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    showFirstButton
                    showLastButton
                    color='primary'
                    shape='rounded'
                  />
                </ThemeProvider>
            </div>
        </div> 
    )
}

export default MerchantTeamDeets