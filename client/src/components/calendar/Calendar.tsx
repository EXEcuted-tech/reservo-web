import React from 'react'
import button from "./../../assets/Button.png"

const Calendar = ()=> {
    const days = [
        {"day": "Sun"},
        {"day": "Mon"},
        {"day": "Tues"},
        {"day": "Wed"},
        {"day": "Thu"},
        {"day": "Fri"},
        {"day": "Sat"},
    ]
    const listdays = days.map((d) => <li key={d.day} className='w-[8%] m-[1.4%] ml-[4.3%] text-xl font-semibold bg-white rounded-2xl border-black border-2 xl:max-2xl:text-[0.9em]'>{d.day}</li>);

    return(

        <div className=' bg-white h-[82vh] flex xs:max-sm:h-full'>
            <div className='bg-[#840705] m-[2%] w-[100%] rounded-2xl p-[2%] flex xs:max-sm:w-[150%] xs:max-sm:h-full '>
                <div className= 'w-[100%] text-center m-0 xl:max-2xl:text-[0.95em]'>
                    <ul className='flex flex-row'>
                        {listdays}
                    </ul>
                    <ul className='flex h-[15%] mt-[1.5%] text-right items-end'>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[4%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>1</li>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[6%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>2</li>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[6%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>3</li>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[6%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>4</li>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[6%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>5</li>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[6%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>6</li>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[6%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>7</li>
                    </ul>
                    <ul className='flex h-[15%] mt-[1.5%] text-right items-end'>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[4%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>8</li>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[6%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>9</li>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[6%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>10</li>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[6%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>11</li>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[6%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>12</li>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[6%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>13
                        <img src={button} className="pl-[25%] pt-[3%] xl:max-2xl:w-[8vh] xl:max-2xl:mt-[-10%]"></img>
                        </li>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[6%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>14</li>
                    </ul>
                    <ul className='flex h-[15%] mt-[1.5%] text-right items-end'>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[4%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>15</li>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[6%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>16</li>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[6%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>17</li>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[6%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>18
                        <img src={button} className="pl-[30%] pt-[3%] xl:max-2xl:w-[8vh] xl:max-2xl:mt-[-10%]"></img>
                        </li>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[6%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>19</li>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[6%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>20</li>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[6%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>21</li>
                    </ul>
                    <ul className='flex h-[15%] mt-[1.5%] text-right items-end'>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[4%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>22</li>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[6%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>23</li>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[6%] bg-white border-black border-2 rounded-2xl pr-[1%]'>24</li>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[6%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>25</li>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[6%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>26</li>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[6%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>27</li>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[6%] bg-white border-black border-2 rounded-2xl pr-[1%]'>28</li>
                    </ul>
                    <ul className='flex h-[15%] mt-[1.5%] text-right items-end'>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[4%] bg-white border-black border-2 rounded-2xl pr-[1%]'>29</li>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[6%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>30</li>
                        <li className='w-[7%] h-[100%] m-[1%] ml-[6%] bg-white  border-black border-2 rounded-2xl pr-[1%]'>31</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Calendar