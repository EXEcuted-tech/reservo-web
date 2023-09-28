import React from 'react'

const ReserveCard: React.FC<ReserveCardProps> = (props) => {
    
  return (
    <div>
        <h1>{"January 18, 2023"}</h1>
        <div className='px-[5%] bg-white rounded-lg drop-shadow'>
        <table>
    <thead>
        <tr>  
            <th>Organizer</th>
            <th>Client Name</th>
            <th>Event Size</th>
            <th>Time</th>
            <th>Status</th>
            <th>Manage</th>
        </tr>
        </thead>
            <hr/>
            <tbody>
            {/* {records.map((record, index) => ( */}
              <tr key={index}>
                <td>{record.organizerName}</td>
                <td>{record.clientName}</td>
                <td>{record.eventSize}</td>
                <td>{record.time}</td>
                <td>{record.status}</td>
                <td>
            
              </tr>
            {/* ))} */}
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default ReserveCard