import React, { useEffect } from 'react';

import { LuDelete } from "react-icons/lu";


const DeleteAndShowingSelectParcelsForMerchantDeliveryPayment = ({

    allSelectedIds,
    setAllSelectedIds,
    payableCharges,
}) => {

    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
    };

    const tdStyle = {
        border: '1px solid #dddddd',
        textAlign: 'center',
        padding: '8px',
    };

    const thStyle = {
        border: '1px solid #dddddd',
        textAlign: 'center',
        padding: '8px',
    };


    const handleDelete = (id) => {
        setAllSelectedIds(allSelectedIds.filter(item => item.id !== id))
    };


    // Helper function to find the matching totalPayableCharge
    const getTotalPayableCharge = (id) => {
        const match = payableCharges.find(charge => charge.id === id);
        return match ? match.totalPayableCharge : 0;
    };




    return (
        <div>
            <div className='mt-3'>

                 <div className='w-full overflow-x-auto mt-10 text-gray-700' >
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th className='font-bold text-sm' style={thStyle}>Delete</th>
                                <th className='font-bold text-sm' style={thStyle}>Invoice	</th>
                                <th className='font-bold  text-sm' style={thStyle}>Merchant Name	 </th>
                                <th className='font-bold  text-sm' style={thStyle}>Customer Name	</th>
                                <th className='font-bold text-sm' style={thStyle}>Amount</th>
                            </tr>
                        </thead>

                        <tbody>
                            {allSelectedIds?.map((item, index) => {
                                return (
                                    <tr key={index} className='bg-white'>

                                        <td className='text-xs' style={tdStyle}><LuDelete className='text-red-500 cursor-pointer text-lg ' onClick={() => handleDelete(item?.id)} /></td>
                                        <td className='text-xs' style={tdStyle}>{item?.parcel_invoice}</td>
                                        <td className='text-xs' style={tdStyle}>{item?.merchant?.company_name}</td>
                                        <td className='text-xs' style={tdStyle}>{item?.customer_name} Point</td>
                                        <td className='text-xs' style={tdStyle}>{getTotalPayableCharge(item?.id)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default DeleteAndShowingSelectParcelsForMerchantDeliveryPayment;