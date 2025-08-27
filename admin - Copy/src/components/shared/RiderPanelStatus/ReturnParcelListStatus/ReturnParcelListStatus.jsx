import React from 'react'

const ReturnParcelListStatus = ({ status }) => {

  const getRiderStatus = (status) => {
    let statusName = '';
    let className = '';

    if (status === 31) {
      statusName = 'Return Parcel Assign Branch Assign Reject';
      className = 'font-bold text-red-500 text-[15px]';
    }
    else if (status === 33) {
      statusName = 'Return Parcel Assign Branch Complete';
      className = 'font-bold text-red-500 text-[15px]';
    }

    return { statusName, className };
  }

  const { statusName, className } = getRiderStatus(status)

  return (
    <div>
      <p className={`${className}`}>
        {statusName}
      </p>
    </div>
  )
}

export default ReturnParcelListStatus