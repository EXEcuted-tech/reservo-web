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

  const storedAcc = localStorage.getItem('userDetails');
  const navigate = useNavigate();
  
  useEffect(() => {

    const pathParts = window.location.pathname.split('/');
    if (pathParts.length >= 2) {
      setUrlPart(pathParts[1]);
    }

    if (storedAcc) {
      setUsername(JSON.parse(storedAcc).user);
    }
  }, [window.location.pathname]);

  const truncatedUsername = username.slice(0, 6);

  const handleMenuItemClick = (path:string, status:boolean) => {
    navigate(path);
  };

  return (
    <div className='font-poppins flex bg-white text-white h-[6rem]'>
        <div className='w-[63%] flex items-center'>
          <img src={logo} alt='Reservo Logo' className='ml-[5%] w-[15%]'/>
        </div>
        <div className='w-[30%] flex items-center'>
          <nav>
            <ul className='flex text-[1.2em] text-black'>
              <li className={`mr-28 hover:text-[#DD2803] cursor-pointer hover:animate-zoom-in-end
                              ${urlPart === '' ? 'text-[#DD2803]' : ''}`}
                onClick={()=>{navigate('/')}}>Home</li>
              <li className={`mr-28 hover:text-[#DD2803] cursor-pointer hover:animate-zoom-in-end
                            ${urlPart === 'about' ? 'text-[#DD2803]' : ''}`}
                onClick={()=>{navigate('/about')}}>About Us</li>
              <li className={`hover:text-[#DD2803] cursor-pointer hover:animate-zoom-in-end
                            ${urlPart === '/eaterychoice' ? 'text-[#DD2803]' : ''}`}
                onClick={()=>{navigate('/eaterychoice')}}>Eatery Choices</li>
            </ul>
          </nav>
        </div>
        <div className='flex items-center relative'>
          <BiSolidUserCircle className='text-black text-[2.5em]'/> {/*To be changed*/}
          <AiOutlineDown className='text-black mt-[6%] ml-[6%] text-[1.3em] hover:cursor-pointer hover:text-[#DD2803]'
           onClick={()=>{setShowMenu(!showMenu)}}/>
          {showMenu && 
            <div className={`absolute ${username ? 'h-[15vh]' : 'h-[11vh]'}  w-[6vw] left-0 z-50 bg-white text-black block top-[100%] animate-slide-down`}>
              <ul className='list-none pl-[15%]'>
                <li><hr className="w-[85px] pt-[10%]"/></li>
                {username
                ?
                 <li className='pb-[10%]'>Hi, {truncatedUsername}!</li>
                :
                  <li className='pb-[10%]'>Hi, Guest!</li>
                }
                
                <li><hr className="w-[85px] pt-[10%]"/></li>
                {/* <li className='hover:text-[#DD2803] cursor-pointer'>About Us</li> */}

                {username
                ?
                <>
                  <li className='flex hover:text-[#DD2803] cursor-pointer py-[8%] hover:animate-zoom-in'
                  onClick={()=>navigate('/accprofile')}>My Profile</li> 
                  <li className='flex hover:text-[#DD2803] cursor-pointer py-[8%] hover:animate-zoom-in'
                  onClick={()=>navigate('/logout')}>Log Out<BiSolidLogOutCircle className='ml-[2%] mt-[2%] text-[1.3em]'/></li>   
                </>           
                :
                  <li className='flex hover:text-[#DD2803] cursor-pointer py-[8%] hover:animate-zoom-in'
                  onClick={()=>navigate('/uslogin')}>Log In<RiLoginCircleFill className='ml-[2%] mt-[2%] text-[1.3em]'/></li> 
                }
                
              </ul>
            </div>
          }
        </div>
    </div>
  )
}

export default UserHeader