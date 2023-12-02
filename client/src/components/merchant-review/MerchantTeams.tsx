import React, {useState, useEffect} from 'react'
import {SlOptions} from 'react-icons/sl'
import {IoPeopleOutline} from 'react-icons/io5'
import MerchantTeamDeets from './MerchantTeamDeets'
import axios from 'axios'
import config from '../../common/config'
import MerchantPagination from './MerchantPagination'
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DocumentsModal from '../modals/merchReviewModal/documentsModal'

const theme = createTheme({
    palette: {
      primary: {
        main: '#DD2803',
      }
    },
  });

sessionStorage.setItem('viewDetails', 'false')

const MerchantTeams = () => {
    const [merchTeam , setmerchantTeam ] = useState<any[]>([{}])
    const [merchAddress, setmerchAddress] = useState<any[]>([{}])
    const [merchAccounts, setmerchAccounts] = useState<any[]>([{}])

    const [openDocModal,setOpenDocModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [recordsPerPage] = useState(3)
    const [viewDetails,setViewDetails] = useState(false);

    //const [selectedMerchantID, setSelectedMerchantID] = useState(null);

    const paginate = (pageNumbers: any) => setCurrentPage(pageNumbers)

    const fetchMerchInfo = async() => {
        try {
            setLoading(true)
            const val = "Active"
            await axios.get(`${config.API}/merchant/retrieve_many?col=merch_status&val=${val}`)
            .then((res)=>{
                console.log("Response MerchTeams: ",res);
                if(res.data.success == true){
                    setmerchantTeam(res.data.merchant)
                    setmerchAddress(res.data.address)
                    setmerchAccounts(res.data.accounts)
                }
            })
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMerchInfo();
        //console.log("Current Data: ",currentData);
    }, []);

    const handlePageChange = (event: any, newPage:any) => {
        setCurrentPage(newPage);
    };

    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    const currentData = merchTeam.slice(firstIndex,lastIndex)

    const [buttonStatusArray, setButtonStatusArray] = useState(Array(currentData.length).fill(false));

    const handleMoreDetailsClick = (merchantID:any) => {
        //sessionStorage.setItem('viewDetails', 'true');
        const newButtonStatusArray = new Array(buttonStatusArray.length).fill(false);
        setButtonStatusArray(newButtonStatusArray);
        sessionStorage.setItem('merchTeam_id', merchantID);
        console.log("Merchant ID: ",merchantID);
        setViewDetails(true);
    };

    return (
        <div>
          {openDocModal && <DocumentsModal setOpenDocModal={setOpenDocModal}/>}

        <div className='h-[96.5%] py-[1%] font-poppins relative'>
            { viewDetails === false ?    
            <div> 
            {currentData.map((data,i) => (
                <div className='bg-white h-[200px] flex-row pt-[1.5%] pb-[1%] shadow-md my-[2%] px-[2%] text-[#838383] flex rounded-3xl'
                key={i}>
                        <div className='w-[15%] p-[0.5%] pl-[3%] flex'>
                        <img src={data.logo!=null ? data.logo : 'https://imgur.com/ujJv4Jw.jpg'} className='w-[140px] h-[140px] object-cover rounded-[50px]' alt="Logo"/>
                        </div>
                        <div className='w-[55%] justify-start items-left py-[2%] flex flex-col'>
                            <p className='text-[1.5em] text-black font-bold'>{data.merchant_name}</p>
                            <p className='text-[1.2em] text-black'>{merchAddress[i].barangay} {merchAddress[i].municipality}, {merchAddress[i].region}</p>
                            <p className='text-[1.2em] text-[#838383] flex'><IoPeopleOutline className='text-[1.5em]'/> {Object.keys(merchAccounts[i]).length} members</p>
                        </div>
                        <div className='w-[30%] relative pl-[25%] flex flex-col p-[1%] text-black'>
                            <div
                                className='hover:cursor-pointer w-auto h-auto transition-all'
                                onClick={() => {
                                    const newButtonStatusArray = [...buttonStatusArray];
                                    const trueIndex = newButtonStatusArray.indexOf(true);

                                    if(trueIndex!=-1){
                                        newButtonStatusArray[trueIndex] = false;
                                    }

                                    if(trueIndex!=i){
                                        newButtonStatusArray[i] = !newButtonStatusArray[i];
                                    }

                                    setButtonStatusArray(newButtonStatusArray);
                                }}
                            >
                                <SlOptions className='text-[1.5em]'/>
                            </div>
                            {buttonStatusArray[i] && (
                                    <div className='w-[20%] absolute right-[10%] top-[18.5%]'>
                                    <div
                                        className='text-[0.8em] p-[1%] w-[110%] text-center border-gray-400 border-[1px] rounded-lg shadow-md'
                                        onClick={() => handleMoreDetailsClick(data.merchant_id)}
                                    >
                                        <p className='hover:cursor-pointer'>View More</p>
                                    </div>
                                    </div>
                                )}
                        </div>  
                </div>  
            ))}
            <MerchantPagination 
            dataPerPage={recordsPerPage} 
            totalData={currentPages.length} 
            paginate={paginate}/>
            </div> 
            : <MerchantTeamDeets merchantID={selectedMerchantID}/>
            }
        </div>

        <div className="flex justify-center w-[78%] absolute bottom-8 left-[18%]">
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
            </div> 
            : 
            <>
                <MerchantTeamDeets setViewDetails={setViewDetails} setOpenDocModal={setOpenDocModal}/>
            </>
            }
        </div>
        </div>
    )
}

export default MerchantTeams