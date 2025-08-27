import React from 'react'

const DeliveryCompleteParcelListStatus = ({ status }) => {

  const getRiderStatus = (status) => {
    let statusName = '';
    let className = '';

    if (status === 21) {
      statusName = 'Complete Delivery';
      className = 'font-bold text-green-500 text-[15px]';
    }
    else if (status === 22) {
      statusName = 'Partial Delivery';
      className = 'font-bold text-green-500 text-[15px]';
    }
    else if (status === 25) {
      statusName = 'Delivery Run Complete';
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

export default DeliveryCompleteParcelListStatus