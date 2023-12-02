import React, { useState } from 'react';
import config from "../../../../common/config"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { BsPencilFill } from 'react-icons/bs';
import { Divider, FormLabel, IconButton, Input } from '@mui/material';
import axios from 'axios';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '2%',
  boxShadow: 24,
  p: 4,
};



function ProfilePicture(props: { userProfile: any }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userName = props.userProfile.user
  const name = userName.split(' ').map((word: String) => word.charAt(0)).join('').toUpperCase()






  return (
    <div>
      <button className='bg-[#7f1d1d] text-[white] rounded-full w-40 h-40' onClick={handleOpen}>{name}</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ textAlign: 'center' }} id="modal-modal-title" variant="h5" component="h5">
            Profile Picture
          </Typography>
          <Divider />
          <Typography sx={{ textAlign: 'center' }} id="modal-modal-title" variant="h5" component="h5">
            Coming Soon!!
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default function EditProfile(props: { phoneData: String, updating: React.Dispatch<React.SetStateAction<boolean>> }) {

  const defaultUser = { userID: 0, user: "UNDEFINED", email: "UNDEFINED", type: "0", pic: "NULL" }


  const str = localStorage.getItem('userDetails');
  const userProfile = str ? JSON.parse(str) : defaultUser
  // const defaultAccount = props.defaultAcc;


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const [updateSuccess, updating] = useState(false);


  const ID = userProfile.userID;
  const [name, setName] = useState(userProfile.user);
  const [email, setEmail] = useState(userProfile.email);
  //   const [phoneData , fetchPhone] = useState('0');
  const [phone, setPhone] = useState(props.phoneData);


  //   const getUserPhone = async () =>{
  //       const fetchData = await axios(`${config.API}/user/retrieve`, {params:{'col': "account_id" , 'val' : ID}})

  //     fetchData.data.success ? fetchPhone(fetchData.data.users[0].contact_number) : alert('unable To fetch Data');  
  //     setPhone(phoneData)  
  // }
  //     useEffect(() =>{
  //         getUserPhone()
  //     },[])


  const submitHandler = async () => {

    if (name !== userProfile.user || email !== userProfile.email || phone !== props.phoneData) {
      const update = await axios.post(`${config.API}/user/edit`, { 'account_name': name, 'email_address': email, 'contact_number': phone }, { params: { 'userID': ID } })

      if (update.data.success) {
        userProfile.user = name;
        userProfile.email = email;

        localStorage.setItem('userDetails', JSON.stringify(userProfile));
        setTimeout(() => {
          props.updating(true);
        }, 5000);
        handleClose();
        // window.location.reload();
      }
      else {
        alert("Unable to update profile");
      }

    }
    else {
      handleClose()
    }


  }



  const closing = () => {
    setName(userProfile.user)
    setEmail(userProfile.email)
    setPhone(props.phoneData)

    handleClose()
  }

  return (
    <div>
      <IconButton sx={{ color: "black" }} onClick={handleOpen}><BsPencilFill /></IconButton>
      <Modal
        open={open}
        onClose={closing}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ textAlign: 'center' }} id="modal-modal-title" variant="h5" component="h5">
            Edit Profile
          </Typography>
          <Divider />
          <Box sx={{ display: "flex", height: '30vh' }}>
            <Box sx={{ display: "flex", alignItems: 'center', padding: 2 }}>
              <ProfilePicture userProfile={userProfile} />
            </Box>
            <Divider variant='middle' orientation='vertical' flexItem />
            <Box sx={{ display: "flex", margin: 4, flexDirection: "column", justifyContent: "center", alignItems: 'center' }}>
              <Box>
                <FormLabel htmlFor='name' sx={{ fontSize: 28, color: "black" }}>Name</FormLabel>
                <Input name='name' id='name' sx={{ fontSize: 18, color: "black" }} value={name} onChange={(e) => setName(e.target.value)}></Input>
              </Box>
              <Box>
                <FormLabel htmlFor='name' sx={{ fontSize: 28, color: "black" }}>Email</FormLabel>
                <Input name='name' sx={{ fontSize: 18, color: "black" }} value={email} onChange={(e) => setEmail(e.target.value)}></Input>
              </Box>
              <Box>
                <FormLabel htmlFor='name' sx={{ fontSize: 28, color: "black" }}>Phone</FormLabel>
                <Input name='name' sx={{ fontSize: 18, color: "black" }} value={phone} onChange={(e) => setPhone(e.target.value)}></Input>
              </Box>
            </Box>
          </Box>
          <Divider sx={{ marginBottom: '5%' }} />
          <Box sx={{ display: 'flex', justifyContent: "center" }}>

            <Button sx={{ display: 'flex', alignItems: "center" }} variant='contained' onClick={submitHandler}>Update Profile</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
