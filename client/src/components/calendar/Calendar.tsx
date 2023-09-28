import React from 'react'

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
    const listdays = days.map((d) => <li key={d.day} className='w-[15%] m-[1%] bg-white rounded-2xl border-black border-2'>{d.day}</li>);

    return(

        <div className='bg-red-200 h-[80vh] flex'>
            <div className='bg-[#840705] m-[2%] w-[100%] rounded-2xl p-[3%] flex '>
                <div className='bg-pink-200 w-[100%] text-center m-0'>
                    <ul className='flex flex-row'>
                        {listdays}
                    </ul>
                    <ul className='flex h-[18%] text-right items-end border-black border-2'>
                        <li className='w-[15%] h-[90%] m-[1%] bg-white rounded-2xl pr-[1%]'>1</li>
                        <li className='w-[15%] h-[90%] m-[1%] bg-white rounded-2xl pr-[1%]'>2</li>
                        <li className='w-[15%] h-[90%] m-[1%] bg-white rounded-2xl pr-[1%]'>3</li>
                        <li className='w-[15%] h-[90%] m-[1%] bg-white rounded-2xl pr-[1%]'>4</li>
                        <li className='w-[15%] h-[90%] m-[1%] bg-white rounded-2xl pr-[1%]'>5</li>
                        <li className='w-[15%] h-[90%] m-[1%] bg-white rounded-2xl pr-[1%]'>6</li>
                        <li className='w-[15%] h-[90%] m-[1%] bg-white rounded-2xl pr-[1%]'>7</li>
                    </ul>
                    <ul className='flex h-[18%]'>
                        <li className='w-[15%] m-[1%] bg-white rounded-2xl'>8</li>
                        <li className='w-[15%] m-[1%] bg-white rounded-2xl'>9</li>
                        <li className='w-[15%] m-[1%] bg-white rounded-2xl'>10</li>
                        <li className='w-[15%] m-[1%] bg-white rounded-2xl'>11</li>
                        <li className='w-[15%] m-[1%] bg-white rounded-2xl'>12</li>
                        <li className='w-[15%] m-[1%] bg-white rounded-2xl'>13</li>
                        <li className='w-[15%] m-[1%] bg-white rounded-2xl'>14</li>
                    </ul>
                    <ul className='flex h-[18%]'>
                        <li className='w-[15%] m-[1%] bg-white rounded-2xl'>15</li>
                        <li className='w-[15%] m-[1%] bg-white rounded-2xl'>16</li>
                        <li className='w-[15%] m-[1%] bg-white rounded-2xl'>17</li>
                        <li className='w-[15%] m-[1%] bg-white rounded-2xl'>18</li>
                        <li className='w-[15%] m-[1%] bg-white rounded-2xl'>19</li>
                        <li className='w-[15%] m-[1%] bg-white rounded-2xl'>20</li>
                        <li className='w-[15%] m-[1%] bg-white rounded-2xl'>21</li>
                    </ul>
                    <ul className='flex h-[18%]'>
                        <li className='w-[15%] m-[1%] bg-white rounded-2xl'>22</li>
                        <li className='w-[15%] m-[1%] bg-white rounded-2xl'>23</li>
                        <li className='w-[15%] m-[1%] bg-white rounded-2xl'>24</li>
                        <li className='w-[15%] m-[1%] bg-white rounded-2xl'>25</li>
                        <li className='w-[15%] m-[1%] bg-white rounded-2xl'>26</li>
                        <li className='w-[15%] m-[1%] bg-white rounded-2xl'>27</li>
                        <li className='w-[15%] m-[1%] bg-white rounded-2xl'>28</li>
                    </ul>
                    <ul className='flex h-[18%]'>
                        <li className='w-[15%] m-[1%] bg-white rounded-2xl'>29</li>
                        <li className='w-[15%] m-[1%] bg-white rounded-2xl'>30</li>
                        <li className='w-[15%] m-[1%] bg-white rounded-2xl'>31</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Calendar