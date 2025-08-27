import Loading from '@/components/Loading';
import { Icon } from '@iconify/react';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import img from '@/assets/images/logo/promise.png'

const PrintCompleteDeliveryProcessingList = ({ completeDeliveryProcessinglistData }) => {

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
                        <p className='text-xl font-semibold mt-1'>Complete Delivery Payment List</p>
                        <p className='text-xl font-semibold mt-1'>Date: {formattedDate} </p>
                    </div>


                    <div>
                        <div className='border border-gray-200 mt-5'>
                            <div className=' text-gray-700'>
                                <table style={tableStyle}>
                                    <thead>
                                        <tr>
                                            <th className='font-bold text-[5px] ' style={thStyle}>SL</th>
                                            <th className='font-bold  text-[12px] ' style={thStyle}>Date</th>
                                            <th className='font-bold  text-[12px] ' style={thStyle}>Consignment</th>
                                            <th className='font-bold  text-[12px] ' style={thStyle}>Admin</th>
                                            <th className='font-bold  text-[12px] ' style={thStyle}>Payment Parcel</th>
                                            <th className='font-bold  text-[12px] ' style={thStyle}>Received Payment Parcel</th>
                                            <th className='font-bold  text-[12px] ' style={thStyle}>Payment Amount</th>
                                            <th className='font-bold  text-[12px] ' style={thStyle}>Received Payment Amount</th>
                                            <th className='font-bold  text-[12px] ' style={thStyle}>Status</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            completeDeliveryProcessinglistData?.data?.result?.map((details, index) => (
                                                <tr key={details?.id}>
                                                    <td className='text-[9px]' style={tdStyle}>{index + 1}</td>
                                                    <td className='text-[7px]' style={tdStyle}>{details?.action_date_time ? formatDate(details?.action_date_time) : null}</td>
                                                    <td className='text-[9px]' style={tdStyle}>{details?.payment_invoice}</td>
                                                    <td className='text-[9px]' style={tdStyle}>{details?.admin?.name}</td>
                                                    <td className='text-[9px]' style={tdStyle}>{details?.total_payment_parcel}</td>
                                                    <td className='text-[9px]' style={tdStyle}>{details?.total_payment_received_parcel}</td>
                                                    <td className='text-[9px]' style={tdStyle}>{parseFloat(details?.total_payment_amount)?.toFixed(2)}</td>
                                                    <td className='text-[9px]' style={tdStyle}>{details?.total_payment_received_amount}</td>
                                                    <td className='text-[9px]' style={tdStyle}>
                                                        {
                                                            details?.status === 1 ? <p>Send Requests</p> :
                                                                details?.status === 2 ? <p>Accept</p> :
                                                                    details?.status === 3 ? <p> Reject </p> : null
                                                        }
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

export default PrintCompleteDeliveryProcessingList;