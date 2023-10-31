import React,{useState,useEffect} from 'react'
import logo from '../../assets/temp-logo-2.png'
import {BiSolidUserCircle,BiSolidLogOutCircle} from 'react-icons/bi'
import {AiOutlineDown} from 'react-icons/ai'
import {RiLoginCircleFill} from 'react-icons/ri'
import {useNavigate} from 'react-router-dom';

const UserHeader = () => {
  const [showMenu,setShowMenu] = useState(false);
  const [username,setUsername] = useState("");
  const [urlPart, setUrlPart] = useState('');
  const [shortLet,setShortLet] = useState("");
  const [profPic,setProfPic] = useState('');

  const storedAcc = localStorage.getItem('userDetails');
  const navigate = useNavigate();
  
  useEffect(() => {

    const pathParts = window.location.pathname.split('/');
    if (pathParts.length >= 2) {
      setUrlPart(pathParts[1]);
    }

    if (storedAcc) {
      setUsername(JSON.parse(storedAcc).user);
      setProfPic(JSON.parse(storedAcc).pic);
    }

    if(username){
      getShortLetter(username);
    }
  }, [window.location.pathname,username]);

  const truncatedUsername = username.slice(0, 6);

  const getShortLetter = (name:string) => {
    const nameParts = name.split(' ');
    if (nameParts.length === 1) {
      setShortLet(nameParts[0].charAt(0).toUpperCase());
    } else if (nameParts.length > 1) {
      setShortLet(nameParts[0].charAt(0).toUpperCase() + nameParts[1].charAt(0).toUpperCase());
    }
  };
  
  const handleMenuItemClick = (path:string, status:boolean) => {
    navigate(path);
  };

  return (
    <div className='font-poppins flex bg-white text-white h-[6rem] xs:max-sm:h-[5rem] xl:max-2xl:h-[5.5rem]'>
        <div className='w-[63%] flex items-center xs:max-sm:w-[30%] xl:max-2xl:w-[60%]'>
          <img src={logo} alt='Reservo Logo' className='ml-[5%] w-[15%] xs:max-sm:ml-[10%] xs:max-sm:w-[70%]'/>
        </div>
        <div className='w-[30%] flex items-center xs:max-sm:w-[55%] xl:max-2xl:w-[32%]'>
          <nav className="xl:max-2xl:ml-[5%]">
            <ul className='flex text-[1.2em] text-black xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em]'>
              <li className={`mr-28 hover:text-[#DD2803] cursor-pointer hover:animate-zoom-in-end xs:max-sm:mr-8 xs:max-sm:pt-2 xl:max-2xl:mr-16
                              ${urlPart === '' ? 'text-[#DD2803]' : ''}`}
                onClick={()=>{navigate('/')}}>Home</li>
              <li className={`mr-28 hover:text-[#DD2803] text-center cursor-pointer hover:animate-zoom-in-end xs:max-sm:mr-8 xl:max-2xl:mr-16
                            ${urlPart === 'about' ? 'text-[#DD2803]' : ''}`}
                onClick={()=>{navigate('/about')}}>About Us</li>
              <li className={`hover:text-[#DD2803] text-center cursor-pointer hover:animate-zoom-in-end xs:max-sm:mr-8 xl:max-2xl:mr-16
                            ${urlPart === '/eaterychoice' ? 'text-[#DD2803]' : ''}`}
                onClick={()=>{navigate('/eaterychoice')}}>Eatery  Choices</li>
            </ul>
          </nav>
        </div>


        <div className='flex items-center relative'>
          {username ?
          ( profPic ? (
              <div className="relative inline-flex items-center justify-center w-11 h-11 overflow-hidden bg-[#DD2803] rounded-full dark:bg-gray-600 xs:max-sm:w-9 xs:max-sm:h-8">
                <img src={profPic} className="w-11 h-11 object-cover rounded-2xl xl:max-2xl:w-[7rem]" />
              </div>
            ) : (
              <div className="relative inline-flex items-center justify-center w-11 h-10 overflow-hidden bg-[#DD2803] rounded-full dark-bg-gray-600 xs:max-sm:w-9 xs:max-sm:h-8">
                <span className="font-medium text-white dark:text-gray-300">{shortLet}</span>
              </div>
            )
          ) : (
            <BiSolidUserCircle className='text-black text-[2.5em] xs:max-sm:text-[1.8em] xl:max-2xl:text-[1.8em]'/>
          )}
          <AiOutlineDown className='text-black mt-[6%] ml-[6%] text-[1.3em] hover:cursor-pointer hover:text-[#DD2803] xs:max-sm:ml-0 xl:max-2xl:text-[1em]'
           onClick={()=>{setShowMenu(!showMenu)}}/>
          {showMenu && 
            <div className={`absolute ${username ? 'h-[15vh]' : 'h-[11vh]'}  w-[6vw] left-0 z-50 bg-white text-black block top-[100%] animate-slide-down xs:max-sm:top-[80%] xs:max-sm:w-[15vw] xl:max-2xl:top-[80%]`}>
              <ul className='list-none pl-[15%] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.7em]'>
                <li><hr className="w-[85px] pt-[10%] xs:max-sm:w-[60px] xl:max-2xl:w-[60px]"/></li>
                {username
                ?
                 <li className='pb-[10%]'>Hi, {truncatedUsername}!</li>
                :
                  <li className='pb-[10%]'>Hi, Guest!</li>
                }
                
                <li><hr className="w-[85px] pt-[10%]  xl:max-2xl:w-[60px]"/></li>
                {/* <li className='hover:text-[#DD2803] cursor-pointer'>About Us</li> */}

                {username
                ?
                <>
                  <li className='flex hover:text-[#DD2803] cursor-pointer py-[8%] hover:animate-zoom-in'
                  onClick={()=>navigate('/accprofile')}>My Profile</li> 
                  <li className='flex hover:text-[#DD2803] cursor-pointer py-[8%] hover:animate-zoom-in'
                  onClick={()=>{
                    localStorage.removeItem('userDetails');
                    navigate('/logout');
                  }}>Log Out<BiSolidLogOutCircle className='ml-[2%] mt-[2%] text-[1.3em]'/></li>   
                </>           
                :
                  <li className='flex hover:text-[#DD2803] cursor-pointer py-[8%] xs:max-sm:py-0 xs:max-sm:leading-[15px] hover:animate-zoom-in'
                  onClick={()=>navigate('/uslogin')}>Log In<RiLoginCircleFill className='ml-[2%] mt-[2%] text-[1.3em] xs:max-sm:ml-0'/></li> 
                }
                
              </ul>
            </div>
          }
        </div>
    </div>
  )
}

export default UserHeader