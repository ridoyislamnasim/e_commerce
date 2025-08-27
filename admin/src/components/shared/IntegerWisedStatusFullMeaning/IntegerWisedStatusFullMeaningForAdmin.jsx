import React from 'react';

const IntegerWisedStatusFullMeaningForAdmin = ({ status, delivery_type, payment_type }) => {


    const getStatusText = (status, delivery_type, payment_type) => {
        let statusName = '';
        let className = '';

        if (status === 1) {
            statusName = 'Pickup Request';
            className = 'bg-yellow-500';
        } else if (status === 2) {
            statusName = 'Parcel Hold';
            className = 'bg-yellow-700';
        } else if (status === 3) {
            statusName = 'Deleted';
            className = 'bg-red-500';
        } else if (status === 4) {
            statusName = 'Re-schedule Pickup';
            className = 'bg-yellow-600';
        } else if (status === 5) {
            statusName = 'Assign for Pickup';
            className = 'bg-green-500';
        } else if (status === 6) {
            statusName = 'Rider Assign For Pick';
            className = 'bg-green-500';
        } else if (status === 7) {
            statusName = 'Pickup Run Cancel';
            className = 'bg-red-400';
        } else if (status === 8) {
            statusName = 'On the way to Pickup';
            className = 'bg-green-500';
        } else if (status === 9) {
            statusName = 'Pickup Rider Reject';
            className = 'bg-red-500';
        } else if (status === 10) {
            statusName = 'Rider Picked';
            className = 'bg-green-500';
        } else if (status === 11) {
            statusName = 'Picked Up';
            className = 'bg-green-500';
        } else if (status === 12) {
            statusName = 'On the Way To Delivery Hub';
            className = 'bg-blue-500';
        } else if (status === 13) {
            statusName = 'Hub Transfer Cancel';
            className = 'bg-yellow-500';
        } else if (status === 14) {
            statusName = 'At Delivery Hub';
            className = 'bg-teal-600';
        } else if (status === 15) {
            statusName = 'Delivery Hub Reject';
            className = 'bg-yellow-500';
        } else if (status === 16) {
            statusName = 'Assign For Delivery';
            className = 'bg-green-500';
        } else if (status === 17) {
            statusName = 'Out For Delivery';
            className = 'bg-green-500';
        } else if (status === 18) {
            statusName = 'Delivery Run Cancel';
            className = 'bg-yellow-500';
        } else if (status === 19) {
            statusName = 'On The Way To Delivery';
            className = 'bg-blue-500';
        } else if (status === 20) {
            statusName = 'Delivery Rider Reject';
            className = 'bg-yellow-500';
        } else if (status === 21) {
            statusName = 'Rider Delivered';
            className = 'bg-green-500';
        } else if (status === 22) {
            statusName = 'Partially Delivered';
            className = 'bg-green-500';
        } else if (status === 23) {
            statusName = 'Rescheduled';
            className = 'bg-yellow-500';
        } else if (status === 24) {
            statusName = 'Rider Return';
            className = 'bg-red-500';
        } else if (status === 25 && delivery_type === 1) {
            statusName = 'Delivered';
            className = 'bg-green-500';
        } else if (status === 25 && delivery_type === 2) {
            statusName = 'Partial Delivered';
            className = 'bg-green-500';
        } else if (status === 25 && delivery_type === 3) {
            statusName = 'Rescheduled';
            className = 'bg-yellow-500';
        } else if (status === 25 && delivery_type === 4) {
            statusName = 'Cancelled';
            className = 'bg-red-500';
        } else if (status === 26 && delivery_type === 2) {
            statusName = 'Partial Delivered Hub Transfer';
            className = 'bg-green-500';
        } else if (status === 27 && delivery_type === 2) {
            statusName = 'Partial Delivered & Hub Transfer Cancel';
            className = 'bg-red-500';
        } else if (status === 28 && delivery_type === 2) {
            statusName = 'Partial Delivered & Hub Transfer Complete';
            className = 'bg-green-500';
        } else if (status === 29 && delivery_type === 2) {
            statusName = 'Partial Delivered & Hub Transfer Reject';
            className = 'bg-red-500';
        } else if (status === 30 && delivery_type === 2) {
            statusName = 'Partial Delivered & Return Run Create';
            className = 'bg-gray-500';
        } else if (status === 31 && delivery_type === 2) {
            statusName = 'Partial Delivered Hub & Return Run start';
            className = 'bg-green-500';
        } else if (status === 32 && delivery_type === 2) {
            statusName = 'Partial Delivered Hub & Return Run Cancel';
            className = 'bg-red-500';
        } else if (status === 33 && delivery_type === 2) {
            statusName = 'Partial Delivered & Return Rider Accept';
            className = 'bg-green-500';
        } else if (status === 34 && delivery_type === 2) {
            statusName = 'Partial Delivered & Return Rider Reject';
            className = 'bg-yellow-500';
        } else if (status === 35 && delivery_type === 2) {
            statusName = 'Partial Delivered & Rider Returned';
            className = 'bg-green-500';
        } else if (status === 36 && delivery_type === 2) {
            statusName = 'Partial Delivered  & Returned';
            className = 'bg-green-500';
        } else if (status === 26 && delivery_type === 4) {
            statusName = 'Return Transfer';
            className = 'bg-gray-500';
        } else if (status === 27 && delivery_type === 4) {
            statusName = 'Return Transfer Cancel';
            className = 'bg-red-500';
        } else if (status === 28 && delivery_type === 4) {
            statusName = 'Return Transfer Complete';
            className = 'bg-green-500';
        } else if (status === 29 && delivery_type === 4) {
            statusName = 'Return Transfer Reject';
            className = 'bg-yellow-500';
        } else if (status === 30 && delivery_type === 4) {
            statusName = 'Return Run Create';
            className = 'bg-blue-500';
        } else if (status === 31 && delivery_type === 4) {
            statusName = 'Return Run start';
            className = 'bg-green-500';
        } else if (status === 32 && delivery_type === 4) {
            statusName = 'Return Run Cancel';
            className = 'bg-red-500';
        } else if (status === 33 && delivery_type === 4) {
            statusName = 'Return Run Rider Accept';
            className = 'bg-green-500';
        } else if (status === 34 && delivery_type === 4) {
            statusName = 'Return Run Rider Reject';
            className = 'bg-yellow-500';
        } else if (status === 35 && delivery_type === 4) {
            statusName = 'Return Run Complete';
            className = 'bg-green-500';
        } else if (status === 36 && delivery_type === 4) {
            statusName = 'Return Complete';
            className = 'bg-green-500';
        } else if (delivery_type === 1 && status === 25 && payment_type === 1) {
            statusName = 'Hub Payment Request';
            className = 'bg-blue-500';
        } else if (delivery_type === 1 && status === 25 && payment_type === 2) {
            statusName = 'Accounts Accept Payment';
            className = 'bg-green-500';
        } else if (delivery_type === 1 && status === 25 && payment_type === 3) {
            statusName = 'Accounts Reject Payment';
            className = 'bg-yellow-500';
        } else if (delivery_type === 1 && status === 25 && payment_type === 4) {
            statusName = 'Accounts Payment Request';
            className = 'bg-blue-500';
        } else if (delivery_type === 1 && status === 25 && payment_type === 5) {
            statusName = 'Paid';
            className = 'bg-green-500';
        } else if (delivery_type === 1 && status === 25 && payment_type === 6) {
            statusName = 'Merchant Payment Reject';
            className = 'bg-yellow-500';
        } else if (delivery_type === 2 && status === 25 && payment_type === 1) {
            statusName = 'Hub Delivery Exchange Payment Request';
            className = 'bg-blue-500';
        } else if (delivery_type === 2 && status === 25 && payment_type === 2) {
            statusName = 'Accounts Delivery Exchange Accept Payment';
            className = 'bg-green-500';
        } else if (delivery_type === 2 && status === 25 && payment_type === 3) {
            statusName = 'Accounts Delivery Exchange Reject Payment';
            className = 'bg-yellow-500';
        } else if (delivery_type === 2 && status === 25 && payment_type === 4) {
            statusName = 'Accounts Delivery Exchange Payment Request';
            className = 'bg-blue-500';
        } else if (delivery_type === 2 && status === 25 && payment_type === 5) {
            statusName = 'Accounts Delivery Exchange Payment Done';
            className = 'bg-green-500';
        } else if (delivery_type === 2 && status === 25 && payment_type === 6) {
            statusName = 'Merchant Delivery Exchange Payment Reject';
            className = 'bg-yellow-500';
        }

        return { statusName, className };
    };

    const { statusName, className } = getStatusText(status, delivery_type, payment_type);

    return (
        <div>
            <p className={`text-white text-center font-semibold rounded-sm  py-1 px-[2px] mb-2 ${className}  w-[200px] mx-auto `}>
                {statusName}
            </p>
        </div>
    );
};

export default IntegerWisedStatusFullMeaningForAdmin;
