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
import PaymentStatusAllParcel from './PaymentStatusAllParcel';
// import ReturnStatusAllParcel from './ReturnStatusAllParcel';

const PrintAllParcelBranch = ({ dataForExportBranch }) => {

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




    // Data Print
    const productValueTotalDataPrint = dataForExportBranch?.data?.result?.reduce((total, item) => {
        return total + parseFloat(item?.product_value || 0);
    }, 0);

    const collectedAmountTotalDataPrint = dataForExportBranch?.data?.result?.reduce((total, item) => {
        return total + parseFloat(item?.customer_collect_amount || 0);
    }, 0);

    const codeChargeTotalDataPrint = dataForExportBranch?.data?.result?.reduce((total, item) => {
        return total + parseFloat(item?.cod_charge || 0);
    }, 0);

    const totalChanrgeDataPrint = dataForExportBranch?.data?.result?.reduce((total, item) => {
        return total + parseFloat(item?.total_charge || 0);
    }, 0);


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
                        <p className='text-xl font-semibold mt-1'>Parcel list Info</p>
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
                                            <th className='font-bold  text-[5px] ' style={thStyle}>Order ID</th>
                                            <th className='font-bold  text-[5px] ' style={thStyle}>Date/Time</th>
                                            <th className='font-bold  text-[5px] ' style={thStyle}>Status</th>
                                            <th className='font-bold  text-[5px] ' style={thStyle}>Parcel OTP</th>
                                            <th className='font-bold  text-[5px] ' style={thStyle}>Company Name</th>
                                            <th className='font-bold text-[5px] ' style={thStyle}>Customer Name</th>
                                            <th className='font-bold text-[5px] ' style={thStyle}>Customer Number</th>
                                            <th className='font-bold text-[5px] ' style={thStyle}>Customer Address</th>
                                            <th className='font-bold  text-[5px] ' style={thStyle}> Distric</th>
                                            <th className='font-bold  text-[5px] ' style={thStyle}> Area</th>
                                            <th className='font-bold  text-[5px] ' style={thStyle}>Service Type</th>
                                            <th className='font-bold  text-[5px] ' style={thStyle}>Item Type</th>
                                            <th className='font-bold  text-[5px] ' style={thStyle}>Product Price</th>
                                            <th className='font-bold text-[5px] ' style={thStyle}>Collected </th>
                                            <th className='font-bold text-[5px] ' style={thStyle}>COD Charge</th>
                                            <th className='font-bold text-[5px] ' style={thStyle}>Total Charge</th>
                                            <th className='font-bold  text-[5px] ' style={thStyle}>Remark</th>
                                            <th className='font-bold  text-[5px] ' style={thStyle}>Payment status</th>
                                            <th className='font-bold  text-[5px] ' style={thStyle}>Return Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            dataForExportBranch?.data?.result?.map((details, index) => (
                                                <tr key={details?.id}>
                                                    <td className='text-[5px]' style={tdStyle}>{index + 1}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.parcel_invoice}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.merchant_order_id}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.date}</td>
                                                    <td className='text-[5px]' style={tdStyle}>
                                                        <StatusAllParcelPrint
                                                            status={details?.status}
                                                            delivery_type={details?.delivery_type}
                                                            payment_type={details?.payment_type}
                                                        />
                                                    </td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.parcel_code}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.merchant?.company_name}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.customer_name}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.customer_contact_number}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.customer_address}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.district?.name}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.area?.name}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.service_type?.title}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.item_type?.title}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.product_value} </td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.customer_collect_amount}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.cod_charge}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.total_charge}</td>
                                                    <td className='text-[5px]' style={tdStyle}>{details?.parcel_note}</td>
                                                    <td className='text-[5px]' style={tdStyle}>
                                                        {/* {
                                                            details?.payment_type === 1 ? <p>Branch Payment Request</p> :
                                                                details?.payment_type === 2 ? <p>Accounts Accept Payment</p> :
                                                                    details?.payment_type === 3 ? <p>Accounts Reject Payment</p> :
                                                                        details?.payment_type === 4 ? <p>Accounts Payment Request</p> :
                                                                            details?.payment_type === 5 ? <p>Accounts Payment Done</p> :
                                                                                details?.payment_type === 6 ? <p>Merchant Payment Reject</p> : null
                                                        } */}
                                                        <PaymentStatusAllParcel
                                                            status={details?.status}
                                                            delivery_type={details?.delivery_type}
                                                            payment_type={details?.payment_type}
                                                        />
                                                    </td>
                                                    <td className='text-[5px]' style={tdStyle}>
                                                        <ReturnStatusAllParcel
                                                            status={details?.status}
                                                            delivery_type={details?.delivery_type}
                                                        />
                                                    </td>




                                                </tr>

                                            ))
                                        }

                                        <tr>
                                            <td className='text-[11px]' style={tdStyle}></td>
                                            <td className='text-[11px]' style={tdStyle}></td>
                                            <td className='text-[11px]' style={tdStyle}></td>
                                            <td className='text-[11px]' style={tdStyle}></td>
                                            <td className='text-[11px]' style={tdStyle}></td>
                                            <td className='text-[11px]' style={tdStyle}></td>
                                            <td className='text-[11px]' style={tdStyle}></td>
                                            <td className='text-[11px]' style={tdStyle}></td>
                                            <td className='text-[11px]' style={tdStyle}></td>
                                            <td className='text-[11px]' style={tdStyle}></td>
                                            <td className='text-[11px]' style={tdStyle}></td>
                                            <td className='text-[11px]' style={tdStyle}></td>
                                            <td className='text-[11px]' style={tdStyle}></td>
                                            <td className='text-[13px]' style={tdStyle}>Total: </td>
                                            <td className='text-[11px]' style={tdStyle}> {parseFloat(productValueTotalDataPrint).toFixed(2)} </td>
                                            <td className='text-[11px]' style={tdStyle}> {parseFloat(collectedAmountTotalDataPrint).toFixed(2)} </td>
                                            <td className='text-[11px]' style={tdStyle}> {parseFloat(codeChargeTotalDataPrint).toFixed(2)} </td>
                                            <td className='text-[11px]' style={tdStyle}> {parseFloat(totalChanrgeDataPrint).toFixed(2)} </td>
                                            <td className='text-[11px]' style={tdStyle}></td>
                                            <td className='text-[11px]' style={tdStyle}></td>
                                            <td className='text-[11px]' style={tdStyle}></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>



                    {/* 
                    <div className='flex justify-between p-24 text-center'>
                        <div>
                            <p className='border border-b bg-black-500 w-[120%] mx-auto' />
                            <p className='text-center ml-5'>Merchant Signature</p>
                        </div>
                        <div>
                            <p className='border border-b bg-black-900 w-[120%] mx-auto' />
                            <p className='text-center ml-5'>Authority</p>
                        </div>
                    </div> */}



                </div>
            </div>
        </div>
    );
};

export default PrintAllParcelBranch;