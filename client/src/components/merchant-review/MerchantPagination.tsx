import React from 'react'

const MerchantPagination = ({dataPerPage, totalData, paginate}) => {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalData/dataPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="">
                        <a onClick={() => paginate(number)} href='/#' className=''>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default MerchantPagination