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
import EmployeeModal from '../modals/merchReviewModal/employeeModal'

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
  const [color,setColor] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [openEmpModal,setOpenEmpModal] = useState(false);

  //filter
  const [filter, setFilter] = useState('all');

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
              account.merch_status = merchant.merch_status;
            }
          }
        }
        //console.log("Accounts List: ",accountsList);
        setmerchAccounts(accountsList); 
        setTimeout(()=>{
          setLoading(false)
        },800)
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
  const approvedData: any[] = [];
  const resultData: any[] = [];
  const resultApprovedData: any[] = [];

  if(merchAccounts){
    merchAccounts.forEach(accountEntry => {
      const filteredAccounts: any = {};
      const filteredApproveAccounts: any = {};
      for (const id in accountEntry) {
        if (id === "merchant_name" || id === "logo" || id === "days_left" || id === "merchant_id" || id === "merch_status") {
          //console.log("1- AE", accountEntry[id],"\n",id);
          filteredAccounts[id] = accountEntry[id];
          filteredApproveAccounts[id] = accountEntry[id];
          // console.log("2- FA",filteredAccounts);
        } else if (accountEntry[id].status === 'Pending') {
          filteredAccounts[id] = accountEntry[id];
        }else if (accountEntry[id].status === 'Approved') {
          filteredApproveAccounts[id] = accountEntry[id];
        }
      }
    
      if (Object.keys(filteredAccounts).length > 0) {
        const keys = Object.keys(filteredAccounts);
        const condition =  (keys.length === 5 && keys.includes("merchant_name") && keys.includes("logo") && 
                            keys.includes("days_left") && keys.includes("merchant_id") && keys.includes("merch_status"))
        
        if(!condition){
          currentData.push(filteredAccounts);
        }
      }

      if (Object.keys(filteredApproveAccounts).length > 0) {
        approvedData.push(filteredApproveAccounts);
      }
    });

    //console.log("Current Data: ", currentData);

    currentData.forEach((entry) => {
      const keys = Object.keys(entry);

      const extraKeys = keys.filter(key => !["days_left", "logo", "merchant_id", "merchant_name","merch_status"].includes(key));

      //If Expired Na
      if(entry["days_left"] < 1 && entry["merch_status"]!="Active"){
        extraKeys.forEach((key)=>{
          axios.post(`${config.API}/user/delete?user_id=${key}`)
        })
        axios.post(`${config.API}/merchant/delete`,{merch_id:entry["merchant_id"]})
      }else{
        if (extraKeys.length > 1) {
          const extraKeysObject: any = {};
          extraKeys.forEach((key) => {
              extraKeysObject[key] = entry[key];
              delete entry[key];
          });

          const newArray: any[] = [];
          extraKeys.forEach((key) => {
              const newObject: any = {};
                newObject[key] = extraKeysObject[key];
                newObject["merchant_name"] = entry["merchant_name"];
                newObject["logo"] = entry["logo"];
                newObject["days_left"] = entry["days_left"];
                newObject["merchant_id"] = entry["merchant_id"];
                newObject["merch_status"] = entry["merch_status"];

                if(key){
                  newArray.push(newObject);
                }
          });

          resultData.push(...newArray);
        }else if(extraKeys.length == 1){
          //console.log("WENT IN HERE: ", entry);
          resultData.push(entry);
        } 
      }
    });

    approvedData.forEach((entry) => {
      console.log("APPROB: ",entry);
      const keys = Object.keys(entry);

      const extraKeys = keys.filter(key => !["days_left", "logo", "merchant_id", "merchant_name","merch_status"].includes(key));

      console.log("Extra? ",extraKeys);
      if (extraKeys.length > 1) {
        const extraKeysObject: any = {};
        extraKeys.forEach((key) => {
            extraKeysObject[key] = entry[key];
            delete entry[key];
        });

        const newArray: any[] = [];
        extraKeys.forEach((key) => {
            const newObject: any = {};
              newObject[key] = extraKeysObject[key];
              newObject["merchant_name"] = entry["merchant_name"];
              newObject["logo"] = entry["logo"];
              newObject["days_left"] = entry["days_left"];
              newObject["merchant_id"] = entry["merchant_id"];
              newObject["merch_status"] = entry["merch_status"];

              if(key){
                newArray.push(newObject);
              }
        });
        resultApprovedData.push(...newArray);
      }else if(extraKeys.length == 1){
        resultApprovedData.push(entry);
      } 
    });
  }

  //console.log("Approved DataSets: ",resultApprovedData);
  const combinedData = resultData.concat(resultApprovedData);
  const slicedData = resultData.slice(startIndex, endIndex);
  const slicedApproveData = resultApprovedData.slice(startIndex, endIndex);
  const slicedCombineData = combinedData.slice(startIndex,endIndex);

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

    for (const data of resultData) {
      if (data && data[Object.keys(data)[0]]) {
        const id = Object.keys(data)[0];
        const result = await fetchAccount(id);
        newData[id] = result;
      }
    }

    for (const data of resultApprovedData) {
      if (data && data[Object.keys(data)[0]]) {
        const id = Object.keys(data)[0];
        const result = await fetchAccount(id);
        newData[id] = result;
      }
    }

    //console.log("Fetch New Data: ",newData);
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
      merchRecord.form_deets = res.data?.formDeets;
      merchRecord.merch_status = "Active";
      axios.post(`${config.API}/merchant/update`,{
        merchant:merchRecord,
        address: merchRecord.address,
        settings: merchRecord.settings,
        accounts: merchRecord.accounts,
        form_deets: merchRecord.form_deets
      })
      .then((res)=>{
        if(res.data.success== true){
          setNotif('Approved Applicant!')
          setColor('#26580F')
          fetchMerchInfo();
          fetchDataForSlicedData();
        }
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
      //console.log("Accounts: ",accounts);
      if(Object.keys(accounts).length == 0){
        //console.log("Went in here>");
        //Only deletes Teams nga wa pa jud ni exist sa other tables sa db ha
        axios.post(`${config.API}/merchant/delete`,{merch_id:merch_id})
      }else{
        axios.post(`${config.API}/merchant/update`, {
          merchant: merchRecord,
          address: JSON.parse(merchRecord.address),
          settings: JSON.parse(merchRecord.settings),
          accounts: merchRecord.accounts,
          form_deets: merchRecord.form_deets
        })
      }

      const updatedID = Number(user_id);
      //Delete Account dayon!
      //console.log("Updated ID: ",updatedID)
      axios.post(`${config.API}/user/delete?user_id=${updatedID}`)
      .then((res)=>{
        if(res.data.success== true){
          setNotif('Denied Applicant!')
          setColor('#660605')
          fetchMerchInfo();
          fetchDataForSlicedData();
        }
      })
    })
    .catch((error) => {
      console.log("Error: ",error);
    });
  }

  const handlePageChange = (event:any, newPage:any) => {
    setCurrentPage(newPage);
  };

  //filters
  const filterRecords = () => {
    console.log("Merchant Accounts: ", merchAccounts);
    console.log("Sliced Data: ", slicedData);
    console.log("Sliced Approve Data: ", slicedApproveData);

    switch (filter) {
      case 'pending':
        return slicedData;
      case 'approved':
        return slicedApproveData;
      default:
        return slicedCombineData;
    }
  };
  
  const filteredData = filterRecords();

  const HandleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setFilter(event.target.value);
  };

  useEffect(()=>{
    setTimeout(()=>{
        setNotif('');
        setColor('#660605')
    }, 5200)
}, [notif]);

  const openApplicantModal=(userID:string,merch_id:number) =>{
     setOpenEmpModal(true);
     sessionStorage.setItem('employee_idtoView', userID);
     sessionStorage.setItem('company_id', merch_id.toString());
  }

    return (
        <div className='font-poppins w-[100%] bg-white h-[80vh] mt-[1%] rounded-2xl flex-row align-center overflow-y-auto'>
           {(notif !== '') && <Notification message={notif} color={color}/>}
           {openEmpModal && <EmployeeModal setOpenEmpModal={setOpenEmpModal}/>}
          <div>
            <div className='flex items-center py-[0.9%] border-[#F3F3F3] border-b-2 '>
              <p className='ml-[2%] text-gray-500 mr-[0.8%] xl:max-2xl:text-[0.7em]'>Filter by:</p>
              <select id="filterDropdown" name="filterDropdown"
                      className={`bg-transparent rounded-md h-8 w-[9vw] border border-black hover:bg-white transition duration-150 ease-out hover:ease-in xl:max-2xl:text-[0.6em]`} 
                      value={filter} onChange={HandleFilterChange}>
                        <option value="all">All Applications</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                </select>
            </div>
          {/* {merchTeam.filter(data => data.merch_status === 'Pending').map((data,i) => ( */}
          {filteredData.map((data, i) => (
          <div className='bg-white h-[172px] flex-row py-[0.5%] px-[2%] text-[#838383] border-[#F3F3F3] border-b-2 flex' key={i}>
          <div className='mr-[2%] pl-[3%] pt-[0.5%] flex'>
            <img src={data.logo!=null ? data.logo : 'https://imgur.com/ujJv4Jw.jpg'} className='w-[140px] h-[140px] object-cover rounded-[50px]' alt="Logo"/>
          </div>
          <div className='w-[55%] justify-center items-left pb-[0.5%] flex flex-col'>
            <p className='text-[1.5em] text-black font-bold'>{data.merchant_name}<br/></p>
            <p className='text-[1.2em] text-black'>{accountData[Object.keys(data)[0]] && accountData[Object.keys(data)[0]].account_name}<br/></p>
            <p className='text-[1.2em] text-[#838383] flex capitalize'>{data[Object.keys(data)[0]].position}</p>
            <div className='flex'>
              <p className={`text-[1em] text-[#838383] flex mr-[1%] ${(data.days_left < 2 && data.merch_status == "Pending") && 'animate-pulse text-red-500'}`}>
                {data.days_left > 1 ? data.days_left + ' days to go' : (data.days_left <= 1 && data.merch_status == "Pending" ? 'Expiring anytime now' : 'Merchant On Record')} • </p>
              <p className={`text-[1em] flex ${data[Object.keys(data)[0]].status === 'Approved' ? 'text-[#238700]' : 'text-[#FFB800]'}`}>{data[Object.keys(data)[0]].status}</p>
            </div>
          </div>
          <div className='w-[25%] flex flex-col p-[1%] pb-[1.5%] ml-[3%] justify-center items-center'>
            <div className='h-[33%] bg-[#FFB800] text-center m-[2%] w-[50%] text-black rounded-xl hover:cursor-pointer'
              onClick={()=>{ openApplicantModal(Object.keys(data)[0],data.merchant_id)}}>
              <div className={`${data[Object.keys(data)[0]].status == 'Pending' ? 'flex justify-center p-[1%] m-[2%]' : 'flex justify-center p-[2.2%] m-[2%]'} `}>
                <BiSearchAlt className={`text-[1.2em] mt-[1%]`}/>View More
              </div >
            </div>
            {data[Object.keys(data)[0]].status == 'Pending' &&
            <>
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
            </>
            }
          </div>
          </div>
          ))}

            <div className="flex justify-center w-[78%] left-[18%] absolute bottom-8 xl:max-2xl:left-[18%]">
              <ThemeProvider theme={theme}>
                <Pagination
                  count={filter == 'pending' ? Math.ceil(resultData.length / itemsPerPage) : filter == 'approved' ? Math.ceil(resultApprovedData.length / itemsPerPage): Math.ceil(combinedData.length / itemsPerPage)}
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