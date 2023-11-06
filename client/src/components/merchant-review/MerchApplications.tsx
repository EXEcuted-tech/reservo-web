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
import Notification from '../alerts/Notification'

const theme = createTheme({
  palette: {
    primary: {
      main: '#DD2803',
    }
  },
});

const MerchantApplications = () => {
  const [merchAccounts , setmerchAccounts ] = useState<any[]>([])
  const [accountData, setAccountData] = useState<{ [key: string]: any }>({});
  // const [merchAddress, setmerchAddress] = useState([{}])
  const [loading, setLoading] = useState(false)
  const [notif,setNotif] = useState('');
  const [color,setColor] = useState('')

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const fetchMerchInfo = async() => {
    try {
        setLoading(true)
        const responseMerchInfo = await axios.get(`${config.API}/merchant/retrieve_all`)
        const merchants = responseMerchInfo.data.merchant;
        const accountsList = responseMerchInfo.data.accounts;
        
        if(accountsList){
          for (const accountId in accountsList) {
            const account = accountsList[accountId];
  
            const merchant = merchants.find((merchant:any) => {
                const accountStr = JSON.stringify(account);
                const found = merchant.accounts === accountStr;
                return found;
            });
  
            if (merchant) {
              account.merchant_name = merchant.merchant_name;
              account.logo = merchant.logo;
              account.days_left = merchant.days_left;
              account.merchant_id = merchant.merchant_id;
            }
          }
        }

        setmerchAccounts(accountsList); 
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
  
  const currentData: any[] = [];
  if(merchAccounts){
    merchAccounts.forEach(accountEntry => {
      const filteredAccounts: any = {};
      for (const id in accountEntry) {
        if (id === "merchant_name" || id === "logo" || id === "days_left" || id === "merchant_id") {
          filteredAccounts[id] = accountEntry[id];
        } else if (accountEntry[id].status === 'Pending') {
          filteredAccounts[id] = accountEntry[id];
        }
      }
    
      if (Object.keys(filteredAccounts).length > 0) {
        const keys = Object.keys(filteredAccounts);
        const condition =  (keys.length === 4 && keys.includes("merchant_name") && keys.includes("logo") && 
                            keys.includes("days_left") && keys.includes("merchant_id"))
        if(!condition){
          currentData.push(filteredAccounts);
        }
      }
    });
  }


  const slicedData = currentData.slice(startIndex, endIndex);

  const fetchAccount = async (id:string) => {
    try {
      const response = await axios.get(`${config.API}/user/retrieve?col=account_id&val=${id}`);
      return response.data.users[0];
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }

  useEffect(() => {
    fetchDataForSlicedData();
  }, [merchAccounts,notif]);
  
  const fetchDataForSlicedData = async () => {
    const newData: { [key: string]: any } = {};
    for (const data of slicedData) {
      if (data && data[Object.keys(data)[0]]) {
        const id = Object.keys(data)[0];
        const result = await fetchAccount(id);
        newData[id] = result;
      }
    }
    setAccountData(newData);
  };


  const approveApplicant = (user_id:string,merch_id:number) =>{
    let merchRecord:MerchData;

    axios.get(`${config.API}/merchant/retrieve?col=merchant_id&val=${merch_id}`)
    .then((res)=>{
      merchRecord=res.data.merchant;
      const accounts = JSON.parse(merchRecord.accounts);

      if (accounts[user_id]) {
        accounts[user_id].status = "Approved";
      }

      merchRecord.accounts = accounts;
      merchRecord.address = JSON.parse(merchRecord.address);
      merchRecord.settings = JSON.parse(merchRecord.settings);
      merchRecord.form_deets = res.data.formDeets;

      axios.post(`${config.API}/merchant/update`,{
        merchant:merchRecord,
        address: merchRecord.address,
        settings: merchRecord.settings,
        accounts: merchRecord.accounts,
        formDeets: merchRecord.form_deets
      })
      .then((res)=>{

      })
    })
  }

  const denyApplicant = (user_id:string,merch_id:number) =>{
    axios.get(`${config.API}/merchant/retrieve?col=merchant_id&val=${merch_id}`)
    .then((res) => {
      const merchRecord: MerchData = res.data.merchant;
      const accounts = JSON.parse(merchRecord.accounts);

      if (accounts[user_id]) {
        delete accounts[user_id];
      }

      merchRecord.accounts = accounts;
      merchRecord.form_deets = res.data?.formDeets;
      console.log("Accounts: ",accounts);
      if(Object.keys(accounts).length == 0){
        console.log("Went in here>");
        //Only deletes Teams nga wa pa jud ni exist sa other tables sa db ha
        axios.post(`${config.API}/merchant/delete`,{merch_id:merch_id})
      }else{
        console.log("Merchant Rec: ",merchRecord)
        axios.post(`${config.API}/merchant/update`, {
          merchant: merchRecord,
          address: merchRecord.address,
          settings: merchRecord.settings,
          accounts: merchRecord.accounts,
          formDeets: merchRecord.form_deets
        })
      }

      //Delete Account dayon!
      setNotif('Denied Applicant!')
      setColor('#660605')
      fetchDataForSlicedData();
    })
    .catch((error) => {
      
    });
  }

  const handlePageChange = (event:any, newPage:any) => {
    setCurrentPage(newPage);
  };

  useEffect(()=>{
    setTimeout(()=>{
        setNotif('');
        setColor('#660605')
    }, 5200)
}, [notif]);

    return (
        <div className='font-poppins w-[100%] bg-white h-[90%] mt-[1%] rounded-ss-2xl flex-row align-center overflow-y-auto'>
           {(notif !== '') && <Notification message={notif} color={color}/>}
          <div>
            <div className='flex items-center py-[0.9%] border-[#F3F3F3] border-b-2'>
              <p className='ml-[2%] text-gray-500 mr-[0.8%]'>Filter by:</p>
              <select id="filterDropdown" name="filterDropdown"
                      className={`bg-transparent rounded-md h-8 w-[9vw] border border-black hover:bg-white transition duration-150 ease-out hover:ease-in`}>
                        <option value="option1">All Applications</option>
                        <option value="option2">Pending</option>
                        <option value="option3">Approved</option>
                </select>
            </div>
          {/* {merchTeam.filter(data => data.merch_status === 'Pending').map((data,i) => ( */}
          {slicedData.map((data, i) => (
          <div className='bg-white h-[180px] flex-row py-[1%] px-[2%] text-[#838383] border-[#F3F3F3] border-b-2 p-[1%] flex' key={i}>
          <div className='mr-[2%] pl-[3%] flex'>
            <img src={data.logo!=null ? data.logo : 'https://imgur.com/ujJv4Jw.jpg'} className='w-[150px] h-[150px] object-cover rounded-[50px]' alt="Logo"/>
          </div>
          <div className='w-[55%] justify-center items-left py-[2%] flex flex-col'>
            <p className='text-[1.5em] text-black font-bold'>{data.merchant_name}<br/></p>
            <p className='text-[1.2em] text-black'>{accountData[Object.keys(data)[0]] && accountData[Object.keys(data)[0]].account_name}<br/></p>
            <p className='text-[1.2em] text-[#838383] flex capitalize'>{data[Object.keys(data)[0]].position}</p>
            <div className='flex'>
              <p className='text-[1em] text-[#838383] flex mr-[1%]'>{data.days_left} days to go • </p>
              <p className={`text-[1em] flex ${data[Object.keys(data)[0]].status === 'Approved' ? 'text-[#238700]' : 'text-[#FFB800]'}`}>{data[Object.keys(data)[0]].status}</p>
            </div>
          </div>
          <div className='w-[25%] flex flex-col p-[1%] justify-center items-center'>
            <div className='h-[33%] bg-[#FFB800] text-center m-[2%] w-[50%] text-black rounded-xl hover:cursor-pointer'>
              <div className='flex justify-center p-[1%] m-[2%]'>
                <BiSearchAlt className='text-[1.2em] mt-[1%]'/>View More
              </div >
            </div>
            <div className='h-[33%] bg-[#3B9C00] text-center m-[2%] w-[50%] text-white rounded-xl hover:cursor-pointer'
              onClick={() => approveApplicant(Object.keys(data)[0],data.merchant_id)}>
              <div className='flex justify-center p-[1%] m-[2%]'>
                <AiOutlineCheck className='text-[1.2em] mt-[1%]'/>Approve
              </div >
            </div>
            <div className='h-[33%] bg-[#DD2803] text-center m-[2%] w-[50%] text-white rounded-xl hover:cursor-pointer'
            onClick={() => denyApplicant(Object.keys(data)[0],data.merchant_id)}>
              <div className='flex justify-center p-[1%] m-[2%]'>
                <RxCross2 className='text-[1.2em] mt-[1%]'/>Deny
              </div >
            </div>
          </div>
          </div>
          ))}
            <div className="flex justify-center w-[78%] absolute bottom-1">
              <ThemeProvider theme={theme}>
                <Pagination
                  count={Math.ceil(merchAccounts.length / itemsPerPage)}
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