import React, {useState} from 'react'
import {SlOptions} from 'react-icons/sl'
import {IoPeopleOutline} from 'react-icons/io5'
import Logo from '../../assets/jjlogo.png'
import MerchantTeamDeets from './MerchantTeamDeets'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';

const theme = createTheme({
  palette: {
    primary: {
      main: '#DD2803',
    },
  },
});


sessionStorage.setItem('viewDetails', 'false')

const MerchantTeams = () => {

// const [currentPage, setCurrentPage] = useState<number>(1);
  // const itemsPerPage = 3;
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentMerchTeams = merchTeams.slice(indexOfFirstItem, indexOfLastItem);
  // const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
  //   setCurrentPage(page);
  // };

    const [buttonStatus, setbuttonStatus] = useState(false)

    return (
        <div className='h-[100%] py-[1%] font-poppins'>
            { sessionStorage.getItem('viewDetails') === 'false' ? 
            <div className='bg-white h-[25%] flex-row py-[1%] px-[2%] text-[#838383] border-[#F3F3F3] border-b-2 p-[1%] flex rounded-xl'>
                <div className='w-[20%] p-[0.5%] pl-[3%] flex'>
                  <img src={Logo} className='w-auto h-[100%] rounded-[50px]' alt="Logo"/>
                </div>
                <div className='w-[55%] justify-center items-left px-[1%] py-[2%] flex flex-col'>
                  <p className='text-[1.5em] text-black text-bold'>J & J Lechon Belly House</p>
                  <p className='text-[1.2em] text-black'>Talamban, Cebu City, Philippines</p>
                  <p className='text-[1.2em] text-[#838383] flex'><IoPeopleOutline className='text-[1.5em]'/> 10 members</p>
                </div>
                <div className='w-[25%] flex flex-col p-[1%] justify-center items-center text-black'>
                    <div className='hover:cursor-pointer w-auto h-auto transition-all' onClick={()=>setbuttonStatus(!buttonStatus)}>
                        <SlOptions className='text-[1.5em]'/>
                        {buttonStatus && 
                        <div className='w-[100%] items-right'>
                            <div className='bg-green-300 p-[1%] w-[110%] text-center border-[#838383] border-2 rounded-lg' onClick={()=>sessionStorage.setItem('viewDetails','true')}>
                                <p>View More</p>
                            </div>
                        </div>
                        }
                    </div>
                </div>
              </div>
            : <MerchantTeamDeets/> 
            }
            {/* <div className="flex justify-center mt-10 w-[100%] h-[0%]">
              <ThemeProvider theme={theme}>
                <Pagination
                  count={Math.ceil(merchTeams.length / itemsPerPage)}
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
                Page {1} of {1}
                Page {currentPage} of {Math.ceil(merchTeams.length / itemsPerPage)}
              </div>
            </div>  */}
        </div>
    )
}

export default MerchantTeams