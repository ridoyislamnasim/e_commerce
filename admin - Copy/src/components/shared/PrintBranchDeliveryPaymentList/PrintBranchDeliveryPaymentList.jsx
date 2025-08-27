import Loading from '@/components/Loading';
// import { useGetBranchDeliveryReceivePaymentListByIdQuery } from '@/store/api/app/accountsPanel/branchPayment/branchPaymentApiSlice';
import { Icon } from '@iconify/react';
import React, { useState, useRef } from 'react';
import Barcode from 'react-barcode';
import { Link, useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';

const PrintBranchDeliveryPaymentList = ({ id }) => {
    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
    };

    const tdStyle = {
        border: '1px solid #dddddd',
        textAlign: 'center',
        padding: '2px',
    };

    const thStyle = {
        border: '1px solid #dddddd',
        textAlign: 'center',
        padding: '3px',
    };

    const componentRef = useRef(null);

    const { data, isLoading } = useGetBranchDeliveryReceivePaymentListByIdQuery(id)


    const dataParcelDeliveryPayment = data?.data?.parcel_delivery_payment
    const dataParcel = data?.data?.parcel


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    // if (isLoading) {
    //     return <Loading />
    // }
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
                pageStyle="body { -webkit-print-color-adjust: exact; margin: 0; padding: 20px; } @page { size: auto; margin: 20mm; }"

            />


            <div className='hidden'>
                <div className='w-full overflow-x-auto mt-10 text-gray-700 ' ref={componentRef} >

                    <div className='text-center'>
                        <p className='text-2xl font-semibold'>E-Commerce</p>
                        <p className='text-xl font-semibold mt-1'>Delivery Payment Information</p>
                        <p className=''><span className='text-xl font-semibold '>Consignment: </span> <span> {dataParcelDeliveryPayment?.payment_invoice} </span></p>
                        <p className=''><span className='text-xl font-semibold '>Date: </span> <span>{formatDate(new Date())}</span></p>
                    </div>



                    {/* <div className='border border-gray-200 p-3 mt-5'>
                        <p className='font-semibold  text-lg mb-2 '>Delivery Branch Transfer </p>
                        <div className='w-full overflow-x-auto text-gray-700'>
                            <div className='grid grid-cols-3 border-t border-l border-r border-gray-200 p-1'>
                                <p>Consignment</p>
                                <p>:</p>
                                <p>{dataParcelDeliveryPayment?.payment_invoice}</p>
                            </div>

                            <div className='grid grid-cols-3 border-t border-l border-r border-gray-200 p-1'>
                                <p>Create Date</p>
                                <p>:</p>
                                <p>{formatDate(dataParcelDeliveryPayment?.created_at)}</p>
                            </div>

                            <div className='grid grid-cols-3 border-t border-l border-r border-gray-200 p-1'>
                                <p>Total Payment Parcel :</p>
                                <p>:</p>
                                <p>{dataParcelDeliveryPayment?.total_payment_parcel}</p>
                            </div>

                            <div className='grid grid-cols-3 border-t border-l border-r border-gray-200 p-1'>
                                <p>Total Payment Amount</p>
                                <p>:</p>
                                <p>{dataParcelDeliveryPayment?.total_payment_amount}</p>
                            </div>

                            <div className='grid grid-cols-3 border-t border-l border-r border-gray-200 p-1'>
                                <p>Status</p>
                                <p>:</p>
                                {dataParcelDeliveryPayment?.status === 3 ? <>
                                    <span className="w-[45%] text-center rounded-full bg-red-500 text-red ">
                                        Payment Reject
                                    </span>
                                </> : <>
                                    <span className="w-[45%] text-center rounded-full bg-green-500 text-green ">
                                        {dataParcelDeliveryPayment?.status === 1 ? "Payment Request" :
                                            dataParcelDeliveryPayment?.status === 2 ? "Payment Accept" : ""}
                                    </span>
                                </>}
                            </div>

                            <div className='grid grid-cols-3 border-t border-l border-r border-gray-200 p-1'>
                                <p>Delivery Payment Note :</p>
                                <p>:</p>
                                <p>{dataParcelDeliveryPayment?.note}</p>
                            </div>
                        </div>

                        <div className='border border-gray-200 p-3 mt-5'>
                            <p className='font-semibold  text-lg mb-2 '>Branch Information</p>
                            <div className='w-full overflow-x-auto text-gray-700'>
                                <div className='grid grid-cols-3 border-t border-l border-r border-gray-200 p-1'>
                                    <p>Name</p>
                                    <p>:</p>
                                    <p>{dataParcelDeliveryPayment?.branche?.name}</p>
                                </div>

                                <div className='grid grid-cols-3 border-t border-l border-r border-gray-200 p-1'>
                                    <p>Contact Number</p>
                                    <p>:</p>
                                    <p>{dataParcelDeliveryPayment?.branche?.contact_number}</p>
                                </div>

                                <div className='grid grid-cols-3 border-t border-l border-r border-gray-200 p-1'>
                                    <p>Address :</p>
                                    <p>:</p>
                                    <p>{dataParcelDeliveryPayment?.branche?.address}</p>
                                </div>
                            </div>

                        </div>

                    </div> */}

                    <div className=' grid grid-cols-2 w-full mt-10'>
                        <div>
                            <div className='w-[80%]'>
                                <div>
                                    <p className='font-semibold  text-lg mb-2 '>Delivery Branch Transfer</p>

                                    <div className='border-t border-l border-r border-gray-300 p-1 grid grid-cols-2 text-sm '>
                                        <div className='border-r border-gray-300 font-semibold'>
                                            <p>Consignment</p>
                                        </div>
                                        <div className='pl-1'>
                                            <p>{dataParcelDeliveryPayment?.payment_invoice}</p>

                                        </div>
                                    </div>

                                    <div className='border-t border-l border-r border-gray-300 p-1 grid grid-cols-2 text-sm '>
                                        <div className='border-r border-gray-300 font-semibold'>
                                            <p>Create Date</p>
                                        </div>
                                        <div className='pl-1'>
                                            <p>{dataParcelDeliveryPayment?.created_at ? formatDate(dataParcelDeliveryPayment?.created_at) : null}</p>
                                        </div>
                                    </div>

                                    <div className='border-t border-l border-r border-gray-300 p-1 grid grid-cols-2 text-sm '>
                                        <div className='border-r border-gray-300 font-semibold'>
                                            <p>Total Payment Amount</p>

                                        </div>
                                        <div className='pl-1'>
                                            <p>{dataParcelDeliveryPayment?.total_payment_amount}</p>


                                        </div>
                                    </div>

                                    <div className='border border-gray-300 p-1 grid grid-cols-2 text-sm '>
                                        <div className='border-r border-gray-300 font-semibold'>
                                            <p>Status</p>

                                        </div>
                                        <div className='px-2'>
                                            {dataParcelDeliveryPayment?.status === 3 ? <>
                                                <span className="w-[45%] text-center bg-red-500 text-white ">
                                                    Payment Reject
                                                </span>
                                            </> : <>
                                                <span className="w-[45%] text-center bg-green-500 000 text-white ">
                                                    {dataParcelDeliveryPayment?.status === 1 ? "Payment Request" :
                                                        dataParcelDeliveryPayment?.status === 2 ? "Payment Accept" : ""}
                                                </span>
                                            </>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='w-[80%]'>
                                <div>
                                    <p className='font-semibold  text-lg mb-2 '>Branch Information</p>

                                    <div className='border-t border-l border-r border-gray-300 p-1 grid grid-cols-2 text-sm '>
                                        <div className='border-r border-gray-300 font-semibold'>
                                            <p>Name</p>
                                        </div>
                                        <div className='pl-1'>
                                            <p>{dataParcelDeliveryPayment?.branche?.name}</p>
                                        </div>
                                    </div>

                                    <div className='border-t border-l border-r border-gray-300 p-1 grid grid-cols-2 text-sm '>
                                        <div className='border-r border-gray-300 font-semibold'>
                                            <p>Contact Number</p>
                                        </div>
                                        <div className='pl-1'>
                                            <p>{dataParcelDeliveryPayment?.branche?.contact_number}</p>
                                        </div>
                                    </div>

                                    <div className='border border-gray-300 p-1 grid grid-cols-2 text-sm '>
                                        <div className='border-r border-gray-300 font-semibold'>
                                            <p>Address :</p>
                                        </div>
                                        <div className='pl-1'>
                                            <p>{dataParcelDeliveryPayment?.branche?.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='border border-gray-200 p-3 mt-5'>
                        <p className='font-semibold  text-lg mb-2 '>Delivery Payment Information</p>
                        <div className='w-full text-gray-700'>
                            <table style={tableStyle}>
                                <thead>
                                    <tr>
                                        <th className='font-bold text-sm' style={thStyle}>SL</th>
                                        <th className='font-bold  text-sm' style={thStyle}>Invoice</th>
                                        <th className='font-bold  text-sm' style={thStyle}>Order ID</th>
                                        <th className='font-bold  text-sm' style={thStyle}>Status</th>
                                        <th className='font-bold text-sm' style={thStyle}>Company Name</th>
                                        <th className='font-bold text-sm' style={thStyle}>Merchant Number</th>
                                        <th className='font-bold text-sm' style={thStyle}>Merchant Address</th>
                                        <th className='font-bold text-sm' style={thStyle}>Customer Name  </th>
                                        <th className='font-bold text-sm' style={thStyle}>Amount </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        dataParcel?.map((details, index) => (
                                            <tr key={details?.id}>
                                                <td className='text-[9px] ' style={tdStyle}>{index + 1}</td>
                                                <td className='text-[9px] ' style={tdStyle}>{details?.parcel?.parcel_invoice}</td>
                                                <td className='text-[9px] ' style={tdStyle}>{details?.parcel?.merchant_order_id}</td>
                                                <td className='text-[9px] ' style={tdStyle}>
                                                    {details?.status === 1 ? 'Paid Request' :
                                                        details?.status === 2 ? 'Payment Accept' :
                                                            details?.status === 3 ? 'Payment Accept' :
                                                                ''}
                                                </td>
                                                <td className='text-[9px] ' style={tdStyle}>{details?.parcel?.merchant?.company_name}</td>
                                                <td className='text-[9px] ' style={tdStyle}>{details?.parcel?.merchant?.contact_number}</td>
                                                <td className='text-[9px] ' style={tdStyle}>{details?.parcel?.merchant?.address}</td>
                                                <td className='text-[9px] ' style={tdStyle}> {details?.parcel?.customer_name}</td>
                                                <td className='text-[9px] ' style={tdStyle}> {details?.parcel?.total_collect_amount}</td>
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

export default PrintBranchDeliveryPaymentList;