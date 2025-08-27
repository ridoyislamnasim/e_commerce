import { Icon } from '@iconify/react';
import React, { useState, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import img from '@/assets/images/logo/promise.png'
import StatusAllParcelPrint from '../../PrintAllParcel/StatusAllParcelPrint';
import { useSelector } from 'react-redux';
// import { useGetAllDeliveryBranchTransferListByPaginationQuery } from '@/store/api/app/DeliveryBranchTransfer/deliveryBranchTransferApiSlice';
import ReturnBranchTransferStatus from '../../ReturnBranchTransferStatus/ReturnBranchTransferStatus';
import DeliveryBranchTransferStatus from '../../DeliveryBranchTransferStatus/DeliveryBranchTransferStatus';


const PrintDeliveryParcel = ({ isPrintReceivedBranchTransfer }) => {
    const { isAuth, auth } = useSelector((state) => state.auth);

    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
    };

    const tdStyle = {
        border: '1px solid #dddddd',
        textAlign: 'center',
        padding: '7px',
    };

    const thStyle = {
        border: '1px solid #dddddd',
        textAlign: 'center',
        padding: '7px',
    };

    const { data: receivedBranchTransferData } = useGetAllDeliveryBranchTransferListByPaginationQuery({
        limit: 1000,
        to_branch_id: auth?.user?.user_info?.branch_id,
        from_branch_id: auth?.user?.user_info?.branch_id,
    });


    console.log("receivedBranchTransferData", receivedBranchTransferData)


    const componentRef = useRef(null);

    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options)

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };


    return (
        <div>
            <div className='flex justify-end w-full pb-2'>
                <ReactToPrint
                    trigger={() => {
                        return (
                            <button className=' flex border gap-1 border-gray-200 p-2 w-[80px] rounded-md bg-blue-600'>
                                <p className=' text-white dark:text-white' >Print</p>
                                <Icon icon="heroicons:printer" className=' mt-1 text-white' />
                            </button>
                        );
                    }}
                    content={() => componentRef.current}
                    documentTitle='Printing the Rider'
                    pageStyle="body { -webkit-print-color-adjust: exact; margin: 0; padding: 5px; } @page { size: auto; margin: 20mm; }"

                />
            </div>


            <div className='hidden'>
                <div className='w-full overflow-x-auto mt-10 text-gray-700 ' ref={componentRef} >
                    {
                        isPrintReceivedBranchTransfer === true ?
                            <div>
                                <div className=' flex flex-col text-center items-center justify-center'>
                                    <img src={img} alt="img" className=' w-36 items-center' />
                                    <p className='text-2xl font-semibold'>E-Commerce</p>
                                    <p className='text-xl font-semibold mt-1'>Received Hub Transfer List Info</p>
                                    <p className='text-xl font-semibold mt-1'>Date: {formattedDate} </p>
                                </div>

                                <div className=' p-3 mt-5'>
                                    <div className='w-full overflow-x-auto text-gray-700'>
                                        <table style={tableStyle}>
                                            <thead>
                                                <tr>
                                                    <th className='font-bold text-[10px] ' style={thStyle}>SL</th>
                                                    <th className='font-bold text-[10px] ' style={thStyle}>Consignment </th>
                                                    <th className='font-bold text-[10px] ' style={thStyle}>Branch Name</th>
                                                    <th className='font-bold text-[10px] ' style={thStyle}>Branch Address</th>
                                                    <th className='font-bold text-[10px] ' style={thStyle}>Branch Contact Number</th>
                                                    <th className='font-bold text-[10px] ' style={thStyle}>Create Date</th>
                                                    <th className='font-bold text-[10px] ' style={thStyle}>Received Date</th>
                                                    <th className='font-bold text-[10px] ' style={thStyle}>Transfer Parcel</th>
                                                    <th className='font-bold text-[10px] ' style={thStyle}>Received Parcel</th>
                                                    <th className='font-bold text-[10px] ' style={thStyle}>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    receivedBranchTransferData?.data?.result?.map((details, index) => (
                                                        <tr key={details?.id}>
                                                            <td className='text-[8px] ' style={tdStyle}>{index + 1}</td>
                                                            <td className='text-[8px] ' style={tdStyle}>{details?.delivery_transfer_invoice}</td>
                                                            <td className='text-[8px] ' style={tdStyle}>{details?.to_branch?.name}</td>
                                                            <td className='text-[8px] ' style={tdStyle}>{details?.to_branch?.address}</td>
                                                            <td className='text-[8px] ' style={tdStyle}>{details?.to_branch?.contact_number}</td>
                                                            <td className='text-[8px] ' style={tdStyle}>{formatDate(details?.created_at)} </td>
                                                            <td className='text-[8px] ' style={tdStyle}>{formatDate(details?.received_date_time)} </td>
                                                            <td className='text-[8px] ' style={tdStyle}>{details?.total_transfer_parcel} </td>
                                                            <td className='text-[8px] ' style={tdStyle}>{details?.total_transfer_received_parcel} </td>
                                                            <td className='text-[8px]' style={tdStyle}>
                                                                <DeliveryBranchTransferStatus
                                                                    status={details?.status}
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))
                                                }

                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>

                            : null}
                </div>
            </div>
        </div>
    );
};

export default PrintDeliveryParcel;
