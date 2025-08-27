import React from 'react'

const RiderPanelStatus = ({ status }) => {

    const getRiderStatus = (status) => {
        let statusName = '';
        let className = '';

        if (status === 6) {
            statusName = 'Pickup Run Start';
            className = 'font-bold text-green-500 text-[15px]';
        }
        else if (status === 8) {
            statusName = 'Pickup Rider Accept';
            className = 'font-bold text-green-500 text-[15px]';
        }
        else if (status === 17) {
            statusName = 'Delivery Run Start';
            className = 'font-bold text-green-500 text-[15px]';
        }
        else if (status === 19) {
            statusName = 'Delivery Rider Accept';
            className = 'font-bold text-green-500 text-[15px]';
        }
        else if (status === 21) {
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
        else if (status === 31) {
            statusName = 'Return Parcel Assign Branch Assign Reject';
            className = 'font-bold text-red-500 text-[15px]';
        }
        else if (status === 33) {
            statusName = 'Return Parcel Assign Branch Complete';
            className = 'font-bold text-red-500 text-[15px]';
        }
        else {
            statusName = 'None';
            className = 'font-bold text-yellow-500 text-[15px]';
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

export default RiderPanelStatus