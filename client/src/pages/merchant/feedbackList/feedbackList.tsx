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
  account_name: string; // test
}

const FeedbackList = () => {
  const [feedback, setFeedback] = useState<feedbackList[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  const admerchDetails = localStorage.getItem('admerchDetails');
  const userID = admerchDetails ? JSON.parse(admerchDetails).userID : '0';

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFeedbackPage = feedback.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };
  const averageRating = feedback.length > 0
    ? feedback.reduce((acc, curr) => acc + curr.rating_value, 0) / feedback.length
    : 0;

  const fetchFeedback = async () => {
    try {
      const resFeedback = await axios.get(`${config.API}/feedback/retrieve`, {
        params: {
          col: 'merchant_id',
          val: 3, // Temporarily set merchant id
        },
      });

      const feedbackData = resFeedback.data.records;
      setFeedback(feedbackData);

      // Fetch account names for feedback
      // const promises = feedbackData.map(async (feedbackItem: feedbackList) => {
      //   try {
      //     const resAccount = await axios.get(`${config.API}/user/retrieve`, {
      //       params: {
      //         col: 'account_id',
      //         val: feedbackItem.account_id,
      //       },
      //     });

      //     return { ...feedbackItem, account_name: resAccount.data.account_name };
      //   } catch (accountError) {
      //     console.error('Error fetching account data:', accountError);
      //     return feedbackItem;
      //   }
      // });

      // const feedbackWithAccountNames = await Promise.all(promises);
      // setFeedback(feedbackWithAccountNames);
      // console.log(feedbackWithAccountNames); //account_name included 

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <div>
      <MerchAdHeader icon={RiMegaphoneFill} title="Feedback List" />
      <div className="bg-[#F3F3F3] h-[90vh] px-12 py-7">
        <div className="bg-[#FFFFFF] h-[85vh] p-4 rounded-[2rem] relative">
          <div className="flex font-poppins px-10 py-10">
            <h1 className="text-3xl font-bold">Merchant Rating</h1>
            <h1 className="text-2xl pl-5 font-medium">({averageRating.toFixed(1)})</h1>
            <Rating name="half-rating" precision={0.5} size="large" className="pl-5" readOnly value={averageRating} />
          </div>

          {currentFeedbackPage.length > 0 ? (
            currentFeedbackPage.map((fee) => (
              <div className="bg-[#F0E5D8] bg-opacity-50 rounded-[3rem] mx-16 mb-3 px-12 py-4" key={fee.feedback_id}>
                <div className="flex font-poppins">
                  <BsFillPersonFill className="rounded-full bg-[#F4D147] text-4xl p-1" />
                  <h3 className="text-2xl ml-2">{fee.account_name || 'Cannot Retrieve Name'}</h3>
                </div>
                <div className="pl-12">
                  <Rating name="half-rating" defaultValue={fee.rating_value} precision={1} size="small" readOnly />
                  <p className="opacity-50 text-xs">2022-06-18 11:00</p>
                  <p className="text-xl">{fee.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No feedback available.</p>
          )}

          <div className="flex justify-center mb-20 w-[100%] h-[7%]">
            <ThemeProvider theme={theme}>
              <Pagination
                count={Math.ceil(feedback.length / itemsPerPage)}
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
              Page {currentPage} of {Math.ceil(feedback.length / itemsPerPage)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackList;
