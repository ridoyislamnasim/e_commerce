
import React from 'react';

const PaymentStatusAllParcel = ({ status, payment_type, delivery_type }) => {
    let status_name = "";
    let class_name = "";

    console.log("status", status);
    console.log("payment_type", payment_type);
    console.log("delivery_type", delivery_type);

    if (status >= 25 && (delivery_type === 1 || delivery_type === 2 || delivery_type === 4) && payment_type) {
        if (payment_type === 1) {
            status_name = "Hub Payment Request";
        } else if (payment_type === 2) {
            status_name = "Accounts Accept Payment";
        } else if (payment_type === 3) {
            status_name = "Accounts Reject Payment";
        } else if (payment_type === 4) {
            status_name = "Accounts Payment Request";
        } else if (payment_type === 5) {
            status_name = " Accounts Payment Done";
        } else if (payment_type === 6) {
            status_name = "Merchant Payment Reject";
        } else {
            null
        }
    }

    return (
        <div className={` ${class_name}`}>
            <p className="">{status_name}</p>
        </div>
    );
};

export default PaymentStatusAllParcel;


