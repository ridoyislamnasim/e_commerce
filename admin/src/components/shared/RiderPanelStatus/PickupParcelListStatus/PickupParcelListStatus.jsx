import React from 'react'

const PickupParcelListStatus = ({ status }) => {

  const getRiderStatus = (status) => {
    let statusName = '';
    let className = '';

    if (status === 6) {
      statusName = 'Delivery Run Start';
      className = 'font-bold text-green-500 text-[15px]';
    }
    else if (status === 8) {
      statusName = 'Delivery Rider Accept';
      className = 'font-bold text-green-500 text-[15px]';
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

export default PickupParcelListStatus