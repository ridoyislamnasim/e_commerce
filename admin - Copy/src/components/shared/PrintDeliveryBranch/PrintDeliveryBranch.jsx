import Loading from '@/components/Loading';
// import { useGetSingleDeliveryBranchTransferByIdQuery } from '@/store/api/app/DeliveryBranchTransfer/deliveryBranchTransferApiSlice';
import { Icon } from '@iconify/react';
import React, { useState, useRef } from 'react';
import Barcode from 'react-barcode';
import { Link, useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';

const PrintDeliveryBranch = ({ id }) => {
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

    const componentRef = useRef(null);

    const { data, isLoading } = useGetSingleDeliveryBranchTransferByIdQuery(id)



    // if (isLoading) {
    //     return <Loading />
    // }

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    return (
        <div>
            <ReactToPrint
                trigger={() => {
                    return (
                        <button className='border border-gray-200 p-1 rounded-sm'>
                            <Icon icon="heroicons:printer" />
                        </button>
                    )
                }}
                content={() => componentRef.current}
                documentTitle='Printing the parcel'
                pageStyle="body { -webkit-print-color-adjust: exact; margin: 0; padding: 5px; } @page { size: auto; margin: 20mm; }"

            />


            <div className='hidden'>
                <div className='w-full overflow-x-auto mt-10 text-gray-700 ' ref={componentRef} >

                    <div className='text-center'>
                        <p className='text-2xl font-semibold'>E-Commerce</p>
                        <p className='text-xl font-semibold mt-1'>Delivery Branch Transfer</p>
                        <p className=''><span className='text-xl font-semibold '>Consignment: </span> <span>{data?.data?.delivery_transfer_invoice}</span></p>
                        <p className=''><span className='text-xl font-semibold '>Date: </span> <span>{formatDate(new Date())}</span></p>
                        <div className='flex gap-3 items-center justify-center mt-1'>
                            <p className=''><span className='text-xl font-semibold '>From: </span> <span>{data?.data?.from_branch?.name}</span> </p>
                            <p className=''><span className='text-xl font-semibold '>To: </span> <span>{data?.data?.to_branch?.name}</span> </p>
                        </div>
                    </div>



                    <div className='border border-gray-200 p-3 mt-5'>
                        <p className='font-semibold  text-lg mb-2 '>Delivery Branch Transfer </p>
                        <div className='w-full overflow-x-auto text-gray-700'>
                            <div className='grid grid-cols-3 border-t border-l border-r border-gray-200 p-1'>
                                <p>Consignment</p>
                                <p>:</p>
                                <p>{data?.data?.delivery_transfer_invoice}</p>
                            </div>

                            <div className='grid grid-cols-3 border-t border-l border-r border-gray-200 p-1'>
                                <p>Create Date</p>
                                <p>:</p>
                                <p>{data?.data?.created_at}</p>
                            </div>

                            <div className='grid grid-cols-3 border-t border-l border-r border-gray-200 p-1'>
                                <p>Total Transfer</p>
                                <p>:</p>
                                <p>{data?.data?.total_transfer_parcel}</p>
                            </div>

                            <div className='grid grid-cols-3 border-t border-l border-r border-gray-200 p-1'>
                                <p>Total Transfer Received</p>
                                <p>:</p>
                                <p>{data?.data?.total_transfer_received_parcel}</p>
                            </div>

                            <div className='grid grid-cols-3 border-t border-l border-r border-gray-200 p-1'>
                                <p>Status</p>
                                <p>:</p>
                                <p>{data?.data?.status}</p>
                            </div>

                            <div className='grid grid-cols-3 border-t border-l border-r border-gray-200 p-1'>
                                <p>Note</p>
                                <p>:</p>
                                <p>{data?.data?.note}</p>
                            </div>
                        </div>

                    </div>


                    <div className='border border-gray-200 p-3 mt-5'>
                        <p className='font-semibold  text-lg mb-2 '>Delivery Transfer Parcel</p>
                        <div className='w-full overflow-x-auto text-gray-700'>
                            <table style={tableStyle}>
                                <thead>
                                    <tr>
                                        <th className='font-bold text-[11px] ' style={thStyle}>SL</th>
                                        <th className='font-bold  text-[11px] ' style={thStyle}>Order ID </th>
                                        <th className='font-bold  text-[11px] ' style={thStyle}>Status</th>
                                        <th className='font-bold text-[11px] ' style={thStyle}>Company Name</th>
                                        <th className='font-bold text-[11px] ' style={thStyle}>Customer Name</th>
                                        <th className='font-bold text-[11px] ' style={thStyle}>Customer Address</th>
                                        <th className='font-bold text-[11px] ' style={thStyle}>Collection Amount </th>
                                        <th className='font-bold text-[11px] ' style={thStyle}>Complete Note </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        data?.data?.delivery_branch_transfer_details?.map((details, index) => (
                                            <tr key={details?.id}>
                                                <td className='text-[10px] ' style={tdStyle}>{index + 1}</td>
                                                <td className='text-[10px] ' style={tdStyle}>{details?.parcel?.parcel_invoice}</td>
                                                <td className='text-[10px] ' style={tdStyle}>
                                                    {details?.status === 1 ? 'Transfer Create' :
                                                        details?.status === 2 ? 'Transfer Cancel' :
                                                            details?.status === 3 ? 'Transfer Received' :
                                                                details?.status === 4 ? 'Transfer Reject' :
                                                                    ''}
                                                </td>
                                                <td className='text-[10px] ' style={tdStyle}>{details?.parcel?.merchant?.company_name}</td>
                                                <td className='text-[10px] ' style={tdStyle}>{details?.parcel?.customer_name}</td>
                                                <td className='text-[10px] ' style={tdStyle}>{details?.parcel?.customer_address}</td>
                                                <td className='text-[10px] ' style={tdStyle}> {details?.parcel?.total_collect_amount}</td>
                                                <td className='text-[10px] ' style={tdStyle}> {details?.parcel?.note}</td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    );
};

export default PrintDeliveryBranch;