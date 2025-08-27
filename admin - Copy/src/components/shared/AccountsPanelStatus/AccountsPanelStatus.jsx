// 1_delivery_branch_send_accounts_paid_request, 
// 2_accounts_paid_request_accept, 
// 3_accounts_paid_request_reject,

import React from 'react'

const AccountsPanelStatus = ({ status }) => {

    const getRiderStatus = (status) => {
        let statusName = '';
        let className = '';

        if (status === 1) {
            statusName = 'Payment Paid Request';
            className = 'font-bold text-green-500 text-[15px]';
        }
        else if (status === 2) {
            statusName = 'Payment Accept';
            className = 'font-bold text-green-500 text-[15px]';
        }
        else if (status === 3) {
            statusName = 'Payment Reject';
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

export default AccountsPanelStatus