import React from 'react';

const ReturnBranchTransferStatus = ({status}) => {
    return (
        <div>

            { status === 1 ? <div className='text-yellow-500 text-center'><p>Return Request</p></div> :  status === 2 ? <div className='text-red-500 py-1 text-center'><p>Return Cancel</p></div> :  status === 3 ? <div className='text-green-500 py-1  text-center'><p>Return Request Accept </p></div> :  status === 4 ? <div className='text-red-500 py-1 text-center'><p>Return Request Reject</p></div> : null}
            
        </div>
    );
};

export default ReturnBranchTransferStatus;