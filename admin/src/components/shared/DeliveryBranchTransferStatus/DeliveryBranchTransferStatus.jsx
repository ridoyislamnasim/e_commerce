
import React from 'react';

const DeliveryBranchTransferStatus = ({status}) => {
    return (
        <div>

            { status === 1 ? <div className='text-yellow-500 py-1 text-center'><p>Branch Transfer</p></div> :  status === 2 ? <div className='text-red-500 py-1  text-center'><p>Transfer Cancel</p></div> :  status === 3 ? <div className='text-green-500 py-1  text-center'><p>Transfer Complete </p></div> :  status === 4 ? <div className='text-red-500 py-1 text-center'><p>Transfer Reject</p></div> : null}
            
        </div>
    );
};

export default DeliveryBranchTransferStatus;