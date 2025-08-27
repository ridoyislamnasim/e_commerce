import Loading from '@/components/Loading';
// import { useGetBranchDeliveryReceivePaymentListByIdQuery } from '@/store/api/app/accountsPanel/branchPayment/branchPaymentApiSlice';
import { Icon } from '@iconify/react';
import React, { useState, useRef } from 'react';
import Barcode from 'react-barcode';
import { Link, useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import img from '@/assets/images/logo/promise.png'
import { useForm } from 'react-hook-form';
import StatusAllParcelPrint from './StatusAllParcelPrint';

const PrintPendingRescheduleParcel = ({ pendingRescheduleParcelData }) => {

    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
    };

    const tdStyle = {
        border: '1px solid #dddddd',
        textAlign: 'center',
        padding: '5px',
    };

    const thStyle = {
        border: '1px solid #dddddd',
        textAlign: 'center',
        padding: '5px',
    };

    const componentRef = useRef(null);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    console.log("v", pendingRescheduleParcelData)


    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options)

    return (
        <div>
            <ReactToPrint
                trigger={() => {
                    return (
                        <button className='border border-gray-200 text-white p-[9px] bg-blue-500 rounded-sm'>
                            <Icon icon="heroicons:printer" />
                        </button>
                    )
                }}
                content={() => componentRef.current}
                documentTitle='Printing the parcel'
                pageStyle="body { -webkit-print-color-adjust: exact; margin: 0; padding: 5px; } @page { size: auto; margin: 20mm; }"
            />


            <div className='hidden '>
                <div className='w-full mt-10 text-gray-700 ' ref={componentRef} >

                    <div className=' flex flex-col text-center items-center justify-center'>
                        <img src={img} alt="img" className=' w-36 items-center' />
                        <p className='text-2xl font-semibold'>E-Commerce</p>
                        <p className='text-xl font-semibold mt-1'>Pending/Reschedule Delivery Parcels List</p>
                        <p className='text-xl font-semibold mt-1'>Date: {formattedDate} </p>
                    </div>

                    <div>
                        <div className='border border-gray-200 mt-5'>
                            <div className=' text-gray-700'>
                                <table style={tableStyle}>
                                    <thead>
                                        <tr>
                                            <th className='font-bold text-[5px] ' style={thStyle}>SL</th>
                                            <th className='font-bold  text-[5px] ' style={thStyle}>Invoice</th>
                                            <th className='font-bold  text-[5px] ' style={thStyle}>Merchant Order ID</th>
                                            <th className='font-bold  text-[5px] ' style={thStyle}>Date/Time</th>
                                            <th className='font-bold  text-[5px] ' style={thStyle}>Company Name</th>
                                            <th className='font-bold text-[5px] ' style={thStyle}>Customer Name</th>
                                            <th className='font-bold text-[5px] ' style={thStyle}>Customer Number</th>
                                            <th className='font-bold text-[5px] ' style={thStyle}>Customer Address</th>
                                            <th className='font-bold  text-[5px] ' style={thStyle}> Distric</th>
                                            <th className='font-bold  text-[5px] ' style={thStyle}> Area</th>
                                            <th className='font-bold  text-[5px] ' style={thStyle}>Product Price</th>
                                            <th className='font-bold text-[5px] ' style={thStyle}>Collection Amount </th>
                                            <th className='font-bold text-[5px] ' style={thStyle}>COD Charge</th>
                                            <th className='font-bold text-[5px] ' style={thStyle}>Delivery Charge</th>
                                            <th className='font-bold text-[5px] ' style={thStyle}>Weight Package Charge</th>
                                            <th className='font-bold text-[5px] ' style={thStyle}>Total Charge</th>
                                            <th className='font-bold  text-[5px] ' style={thStyle}>Status</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            pendingRescheduleParcelData?.data?.result?.map((details, index) => (
                                                <tr key={details?.id}>
                                                    <td className='text-[5px]' style={tdStyle}>{index + 1}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.parcel_invoice}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.merchant_order_id}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.date}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.merchant?.company_name}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.customer_name}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.customer_contact_number}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.customer_address}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.district?.name}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.area?.name}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.product_value} </td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.total_collect_amount}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.cod_charge}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.delivery_charge}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.weight_package_charge}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.total_charge}</td>
                                                    <td className='text-[5px]' style={tdStyle}>
                                                        <StatusAllParcelPrint
                                                            status={details?.status}
                                                            delivery_type={details?.delivery_type}
                                                            payment_type={details?.payment_type}
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
                </div>
            </div>
        </div>
    );
};

export default PrintPendingRescheduleParcel;