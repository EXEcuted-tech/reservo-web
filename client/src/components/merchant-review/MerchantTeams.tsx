import React, {useState, useEffect} from 'react'
import {SlOptions} from 'react-icons/sl'
import {IoPeopleOutline} from 'react-icons/io5'
import MerchantTeamDeets from './MerchantTeamDeets'
import axios from 'axios'
import config from '../../common/config'
import MerchantPagination from './MerchantPagination'
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#DD2803',
      }
    },
  });

sessionStorage.setItem('viewDetails', 'false')

const MerchantTeams = () => {
    const [buttonStatus, setbuttonStatus] = useState(false)
    const [merchTeam , setmerchantTeam ] = useState([{}])
    const [merchAddress, setmerchAddress] = useState([{}])
    const [merchAccounts, setmerchAccounts] = useState([{}])

    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [recordsPerPage] = useState(4)

    const [selectedMerchantID, setSelectedMerchantID] = useState(null);

    const paginate = (pageNumbers) => setCurrentPage(pageNumbers)

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

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    const currentPages = merchTeam.slice(firstIndex,lastIndex)

    const handleMoreDetailsClick = (merchantID) => {
    sessionStorage.setItem('viewDetails', 'true');
    setSelectedMerchantID(merchantID);
    };

    return (
        <div className='h-[100%] py-[1%] font-poppins relative'>
            { sessionStorage.getItem('viewDetails') === 'false' ?    
            <div> 
            {currentPages.map((data,i) => (
                <div className='bg-white h-[180px] flex-row py-[1%] px-[2%] text-[#838383] border-[#F3F3F3] border-b-2 p-[1%] flex rounded-xl'
                key={i}>
                    <div className='w-[20%] p-[0.5%] pl-[3%] flex'>
                        <img src={data.logo} className='w-auto h-[100%] rounded-[50px]' alt="Logo"/>
                        </div>
                        <div className='w-[55%] justify-center items-left px-[1%] py-[2%] flex flex-col'>
                        <p className='text-[1.5em] text-black text-bold'>{data.merchant_name}</p>
                        <p className='text-[1.2em] text-black'>{merchAddress[i].barangay} {merchAddress[i].municipality}, {merchAddress[i].region}</p>
                        <p className='text-[1.2em] text-[#838383] flex'><IoPeopleOutline className='text-[1.5em]'/> {Object.keys(merchAccounts[i]).length} members</p>
                        </div>
                        <div className='w-[25%] flex flex-col p-[1%] justify-center items-center text-black'>
                        <div className='hover:cursor-pointer w-auto h-auto transition-all' onClick={()=>setbuttonStatus(!buttonStatus)}>
                            <SlOptions className='text-[1.5em]'/>
                            {buttonStatus && 
                            <div className='w-[100%] items-right'>
                                <div className='bg-green-300 p-[1%] w-[110%] text-center border-[#838383] border-2 rounded-lg' onClick={()=>handleMoreDetailsClick(data.merchant_id)}>
                                    <p>View More</p>
                                </div>
                            </div>
                            }
                        </div>
                        </div>  
                </div>  
            ))}
            <div className="flex justify-center w-full absolute bottom-8">
                <ThemeProvider theme={theme}>
                    <Pagination
                        count={Math.ceil(merchTeam.length / recordsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        showFirstButton
                        showLastButton
                        color='primary'
                        shape="rounded"
                    />
                </ThemeProvider>
            </div>
            <MerchantPagination 
            dataPerPage={recordsPerPage} 
            totalData={currentPages.length} 
            paginate={paginate}/>
            </div> 
            : <MerchantTeamDeets merchantID={selectedMerchantID}/>
            }
        </div>
    )
}

export default MerchantTeams