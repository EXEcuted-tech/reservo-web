import React, {useState, useEffect} from 'react'
import {IoPeopleOutline} from 'react-icons/io5'
import {SlOptions} from 'react-icons/sl'
import {BiSearchAlt} from 'react-icons/bi'
import {AiOutlineCheck} from 'react-icons/ai'
import {RxCross2} from 'react-icons/rx'
import axios from 'axios'
import config from '../../common/config'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';

const theme = createTheme({
  palette: {
    primary: {
      main: '#DD2803',
    }
  },
});

const MerchantApplications = () => {
  const [merchTeam , setmerchantTeam ] = useState([{}])
  const [merchAddress, setmerchAddress] = useState([{}])
  const [merchAccounts, setmerchAccounts] = useState([{}])
  const [loading, setLoading] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const fetchMerchInfo = async() => {
    try {
        setLoading(true)
        const responseMerchInfo = await axios.get(`${config.API}/merchant/retrieve_all`)
        setmerchantTeam(responseMerchInfo.data.merchant)
        setmerchAddress(responseMerchInfo.data.address)
        setmerchAccounts(responseMerchInfo.data.accounts)
        setLoading(false)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    fetchMerchInfo();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const currentData = merchTeam
  //   .filter(data => data.merch_status === 'Pending')
  //   .slice(startIndex, endIndex);

  const handlePageChange = (event:any, newPage:any) => {
    setCurrentPage(newPage);
  };

    return (
        <div className='w-[100%] bg-white h-[90%] mt-[1%] rounded-ss-2xl flex-row align-center overflow-y-auto'>
          <div>
          {/* {merchTeam.filter(data => data.merch_status === 'Pending').map((data,i) => ( */}
          {/* {currentData.map((data, i) => (
          <div className='bg-white h-[180px] flex-row py-[1%] px-[2%] text-[#838383] border-[#F3F3F3] border-b-2 p-[1%] flex' key={i}>
          <div className='w-[20%] p-[0.5%] pl-[3%] flex'>
          <img src={data.logo} className='w-auto h-[150px] rounded-[50px]' alt="Logo"/>
          </div>
          <div className='w-[55%] justify-center items-left px-[1%] py-[2%] flex flex-col'>
            <p className='text-[1.5em] text-black text-bold'>{data.merchant_name}<br/></p>
            <p className='text-[1.2em] text-black'>Kathea Mari Mayol<br/></p>
            <p className='text-[1.2em] text-[#838383] flex'>Chief Marketing Officer</p>
            <div className='flex'>
              <p className='text-[1em] text-[#838383] flex mr-[1%]'>{data.days_left} days to go • </p>
              <p className={`text-[1em] flex ${data.merch_status === 'Active' ? 'text-[#238700]' : 'text-[#FFB800]'}`}>{data.merch_status}</p>
            </div>
          </div>
          <div className='w-[25%] flex flex-col p-[1%] justify-center items-center'>
            <div className='h-[33%] bg-[#FFB800] text-center m-[2%] w-[50%] text-black rounded-sm hover:cursor-pointer'>
              <div className='flex justify-center p-[1%] m-[2%]'>
                <BiSearchAlt className='text-[1.2em] mt-[1%]'/>View More
              </div >
            </div>
            <div className='h-[33%] bg-[#3B9C00] text-center m-[2%] w-[50%] text-white rounded-sm hover:cursor-pointer'>
              <div className='flex justify-center p-[1%] m-[2%]'>
                <AiOutlineCheck className='text-[1.2em] mt-[1%]'/>Approve
              </div >
            </div>
            <div className='h-[33%] bg-[#DD2803] text-center m-[2%] w-[50%] text-white rounded-sm hover:cursor-pointer'>
              <div className='flex justify-center p-[1%] m-[2%]'>
                <RxCross2 className='text-[1.2em] mt-[1%]'/>Deny
              </div >
            </div>
          </div>
          </div>
          ))} */}
            <div className="flex justify-center w-[78%] absolute bottom-1">
              <ThemeProvider theme={theme}>
                <Pagination
                  count={Math.ceil(merchTeam.length / itemsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  showFirstButton
                  showLastButton
                  color='primary'
                  shape="rounded"
                />
              </ThemeProvider>
            </div>
          </div>       
        </div> 
    )
}

export default MerchantApplications