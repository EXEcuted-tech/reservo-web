import React, { useEffect, useState } from 'react';
import MerchAdHeader from '../../../components/headers/MerchAdHeader';
import { RiMegaphoneFill } from 'react-icons/ri';
import Rating from '@mui/material/Rating';
import { BsFillPersonFill } from 'react-icons/bs';
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import config from '../../../common/config';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#DD2803',
    },
  },
});

interface feedbackList {
  feedback_id: number;
  account_id: number;
  merchant_id: number;
  rating_value: number;
  comment: string;
  account_name: string;
}

const FeedbackList = () => {
  const [feedback, setFeedback] = useState<Array<{feedback: feedbackList, clientName: String}>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;
  const merchID = Number(localStorage.getItem('merch_id'));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFeedbackPage = feedback.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };
  const averageRating = feedback.length > 0
    ? feedback.reduce((acc, curr) => acc + curr.feedback.rating_value, 0) / feedback.length
    : 0;

  const fetchFeedback = async () => {
    const col = 'merchant_id';
    const val = merchID;
    try {
      const resFeedback = await axios.get(`${config.API}/feedback/retrieve?col=${col}&val=${val}`);
      const feedbackRec = [];
      const feedbackData = resFeedback.data.records;
      for(const feedback of feedbackData){
        const clientName = await getClient(feedback.account_id);
        feedbackRec.push({feedback, clientName});
      }
      setFeedback(feedbackRec);
    } catch (err) {
      //PUT ERROR NOTIF 
    }
  };

  const getClient = async (id: number) => {
    try {
      const col = 'account_id';
      const val = id;
      
      const response = await axios.get(`${config.API}/user/retrieve?col=${col}&val=${val}`);

      if(response.data.status === 200) {
        return response.data.users[0].account_name;
      }
      return '';
    }catch (error){
      //PUT ERROR NOTIF 
      return '';
    }
  }

  useEffect(() => {
    fetchFeedback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="animate-fade-in ">
      <MerchAdHeader icon={RiMegaphoneFill} title="Feedback List" />
      <div className="bg-[#F3F3F3] h-[90vh] px-12 py-7 overflow-y-auto xs:max-sm:px-2">
        <div className="bg-[#FFFFFF] h-[85vh] p-4 rounded-[2rem] relative xs:max-sm:w-[100%] xl:max-2xl:h-[100vh]">
          <div className="flex font-poppins px-10 py-10 xs:max-sm:py-2 xs:max-sm:px-2">
            <h1 className="text-3xl font-bold xs:max-sm:text-[1.5em] xl:max-2xl:text-2xl">
              Merchant Rating</h1>
            <h1 className="text-2xl pl-5 font-medium xs:max-sm:text-[0.9em] xl:max-2xl:text-xl xl:max-2xl:pl-1">
              ({averageRating.toFixed(1)})</h1>
            <Rating name="half-rating" precision={0.5} size="large" className="pl-5 xs:max-sm:scale-75 xl:max-2xl:scale-75 xl:max-2xl:pl-1" 
            readOnly value={averageRating} />
          </div>

          {currentFeedbackPage.length > 0 ? (
            currentFeedbackPage.map(({feedback, clientName}, index) => (
              <div className="bg-[#F0E5D8] bg-opacity-50 rounded-[3rem] mx-16 mb-3 px-12 py-4 xs:max-sm:w-full xs:max-sm:overflow-x-auto xs:max-sm:px-6 xs:max-sm:mx-0 xs:max-sm:my-4" 
              key={feedback.feedback_id}>
                <div className="flex font-poppins">
                  <BsFillPersonFill className="rounded-full bg-[#F4D147] text-4xl p-1 xs:max-sm:text-2xl xl:max-2xl:text-2xl" />
                  <h3 className="text-2xl ml-2 xs:max-sm:text-[1em] xs:max-sm:mt-[-1%] xl:max-2xl:text-[1em] xl:max-2xl:mt-[-0.5%]">{clientName || 'Cannot Retrieve Name'}</h3>
                </div>

                <div className="flex items-center pl-12">
                  <Rating className="half-rating xs:max-sm:ml-[-9%] xs:max-sm:mr-[4%] xl:max-2xl:scale-75 ml-[-0.5%]" defaultValue={feedback.rating_value} precision={1} size="small" readOnly />
                  <p className="opacity-50 text-xs"> 2022-06-18 11:00</p>
                </div>

                <p className={`text-xl xs:max-sm:text-[1em] xs:max-sm:ml-[10%] xl:max-2xl:text-[1em] ml-[3.5%] ${feedback.comment ?'text-black':'text-[#bbbbbb] italic' }`}>{feedback.comment ? feedback.comment : 'User did not provide a comment.'}</p>
              </div>
            ))
          ) : (
            <p>No feedback available.</p>
          )}

      <div className="mt-[5%] xs:max-sm:mt-[15%] xl:max-2xl:mt-[5%]">
          <div className="flex justify-center w-[100%] h-[7%] ">
            <ThemeProvider theme={theme}>
              <Pagination
                count={Math.ceil(feedback.length / itemsPerPage)}
                shape="rounded"
                showFirstButton
                showLastButton
                color="primary"
                className="text-xl"
                onChange={handlePageChange}
                page={currentPage}
              />
            </ThemeProvider>
          </div>
          <div className="text-[#969696] text-lg flex justify-center mb-[2%] xs:max-sm:text-base xl:max-2xl:text-[0.9em]">
              Page {currentPage} of {Math.ceil(feedback.length / itemsPerPage)}
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackList;
