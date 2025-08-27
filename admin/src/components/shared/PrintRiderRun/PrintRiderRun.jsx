import Loading from '@/components/Loading';
import { useGetSingleRiderRunByIdQuery } from '@/store/api/app/GenerateDeliveryRiderRunApiSlice/generateDeliveryRiderRunApiSlice';
import { Icon } from '@iconify/react';
import React, { useState, useRef } from 'react';
import Barcode from 'react-barcode';
import { Link, useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import logo from '../../../assets/images/logo/promise.png'

const PrintRiderRun = ({ id }) => {

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

    const { data, isLoading } = useGetSingleRiderRunByIdQuery(id)



    // if (isLoading) {
    //     return <Loading />
    // }


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
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

                    <div className='flex justify-between items-center mb-10'>
                        <div className='w-40 h-auto'>
                            <img src={logo} alt="" />
                        </div>

                        <div className='w-[40%]'>
                            <div>
                                <div className='border-t border-l border-r border-gray-300 p-1 grid grid-cols-2 text-sm '>
                                    <div className='border-r border-gray-300 font-semibold'>
                                        <p>Consignment</p>
                                    </div>
                                    <div className='pl-1'>
                                        <p>{data?.data?.run_invoice}</p>
                                    </div>
                                </div>

                                <div className='border-t border-l border-r border-gray-300 p-1 grid grid-cols-2 text-sm '>
                                    <div className='border-r border-gray-300 font-semibold'>
                                        <p>Rider Name</p>
                                    </div>
                                    <div className='pl-1'>
                                        <p>{data?.data?.rider?.name}</p>
                                    </div>
                                </div>

                                <div className='border-t border-l border-r border-gray-300 p-1 grid grid-cols-2 text-sm '>
                                    <div className='border-r border-gray-300 font-semibold'>
                                        <p>Rider ID</p>
                                    </div>
                                    <div className='pl-1'>
                                        <p>{data?.data?.rider?.r_id}</p>
                                    </div>
                                </div>

                                <div className='border-t border-l border-r border-gray-300 p-1 grid grid-cols-2 text-sm '>
                                    <div className='border-r border-gray-300 font-semibold'>
                                        <p>Reporting Branch</p>
                                    </div>
                                    <div className='pl-1'>
                                        <p>{data?.data?.branche?.name}</p>
                                    </div>
                                </div>

                                <div className='border border-gray-300 p-1 grid grid-cols-2 text-sm '>
                                    <div className='border-r border-gray-300 font-semibold'>
                                        <p>Date Of Dispatched</p>
                                    </div>
                                    <div className='pl-1'>
                                        <p>{ data?.data?.created_at ? formatDate(data?.data?.created_at) : null}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='w-full overflow-x-auto text-gray-700'>
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th className='font-bold text-[11px] ' style={thStyle}>SL</th>
                                    <th className='font-bold  text-[11px] ' style={thStyle}>Order ID </th>
                                    <th className='font-bold  text-[11px] ' style={thStyle}>Merchant  Id</th>
                                    <th className='font-bold text-[11px] ' style={thStyle}>Merchant</th>
                                    <th className='font-bold text-[11px] ' style={thStyle}>Merchant Address</th>
                                    <th className='font-bold text-[11px] ' style={thStyle}>Customer Delivery Area</th>
                                    <th className='font-bold text-[11px]' style={thStyle}>Customer Name  </th>
                                    <th className='font-bold text-[11px] ' style={thStyle}>Customer Phone </th>
                                    <th className='font-bold text-[11px] ' style={thStyle}>Signature </th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    data?.data?.rider_run_details?.map((details, index) => (
                                        <tr key={details?.id}>
                                            <td className='text-[9px] ' style={tdStyle}>{index + 1}</td>
                                            <td className='text-[9px] ' style={tdStyle}>{details?.parcel?.parcel_invoice}</td>
                                            <td className='text-[9px] ' style={tdStyle}>{details?.parcel?.merchant_order_id}</td>
                                            <td className='text-[9px] ' style={tdStyle}>{details?.parcel?.merchant?.company_name}</td>
                                            <td className='text-[9px] ' style={tdStyle}>{details?.parcel?.merchant?.address}</td>
                                            <td className='text-[9px] ' style={tdStyle}>{details?.parcel?.customer_address}</td>
                                            <td className='text-[9px] ' style={tdStyle}>{details?.parcel?.customer_name}</td>
                                            <td className='text-[9px] ' style={tdStyle}>{details?.parcel?.customer_contact_number}</td>
                                            <td className='text-[9px] ' style={tdStyle}></td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default PrintRiderRun;