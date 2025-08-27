import Loading from '@/components/Loading';
// import { useGetBranchDeliveryReceivePaymentListByIdQuery } from '@/store/api/app/accountsPanel/branchPayment/branchPaymentApiSlice';
import { Icon } from '@iconify/react';
import React, { useState, useRef } from 'react';
import Barcode from 'react-barcode';
import { Link, useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import img from '@/assets/images/logo/promise.png'

import IntegerWisedStatusFullMeaningForAdmin from '../IntegerWisedStatusFullMeaning/IntegerWisedStatusFullMeaningForAdmin';

const PrintMerchantDeliveryPayemnt = ({ id }) => {
    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
    };

    const tdStyle = {
        border: '1px solid #dddddd',
        textAlign: 'center',
        padding: '8px 3px',
    };

    const thStyle = {
        border: '1px solid #dddddd',
        textAlign: 'center',
        padding: '8px 3px',
    };

    const componentRef = useRef(null);

    const { data, isLoading } = useGetMerchantPaymentDeliveryByIdQuery(id)
    console.log("dataPrint", data)

    const dataParcelMerchantDeliveryPayment = data?.data?.parcel_merchant_delivery_payment
    const dataParcel = data?.data?.parcel

    // console.log("data?.data?.parcel :::", data?.data?.parcel);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };


    const amountToBeCollect = data?.data?.parcel?.reduce((total, item) => {
        return total + parseFloat(item?.parcel?.total_collect_amount || 0);
    }, 0);

    const collectAmount = data?.data?.parcel?.reduce((total, item) => {
        return total + parseFloat(item?.parcel?.customer_collect_amount || 0);
    }, 0);

    const weightTotal = data?.data?.parcel?.reduce((total, item) => {
        return total + parseFloat(item?.parcel?.weight_package_charge || 0);
    }, 0);

    const codChargeTotal = data?.data?.parcel?.reduce((total, item) => {
        return total + parseFloat(item?.parcel?.cod_charge || 0);
    }, 0);

    const deliveryChargeTotal = data?.data?.parcel?.reduce((total, item) => {
        return total + parseFloat(item?.parcel?.delivery_charge || 0);
    }, 0);

    const returnChargeTotal = data?.data?.parcel?.reduce((total, item) => {
        return total + parseFloat(item?.parcel?.return_charge || 0);
    }, 0);

    const totalCharge = data?.data?.parcel?.reduce((total, item) => {
        return total + parseFloat(item?.parcel?.total_charge || 0);
    }, 0);

    const paidAmountTotal = data?.data?.parcel?.reduce((total, item) => {
        return total + parseFloat(item?.parcel?.merchant_paid_amount || 0);
    }, 0);



    // if (isLoading) {
    //     return <Loading />
    // }
    return (
        <div>
            <ReactToPrint
                trigger={() => (
                    <button className='border border-gray-200 p-1 rounded-sm'>
                        <Icon icon="heroicons:printer" />
                    </button>
                )}
                content={() => componentRef.current}
                documentTitle='Printing the parcel'
                pageStyle="body { -webkit-print-color-adjust: exact; margin: 0; padding: 20px; } @page { size: auto; margin: 20mm; }"
            />


            <div style={{ display: 'none' }}>

                <div className='w-full mt-10 text-gray-700 block ' ref={componentRef}  >

                    <div className=' flex flex-col text-center items-center justify-center'>
                        <img src={img} alt="img" className=' w-36 items-center' />
                        <p className='text-2xl font-semibold'>E-Commerce</p>
                        <p className='text-xl font-semibold mt-1'>Merchent Delivery Payment Info</p>
                    </div>





                    <div className="grid md:grid-cols-2 grid-cols-1 mt-5 gap-8">
                        <div className="customer-info border border-gray-500 p-5 rounded-lg mb-2">
                            <h5 className="mb-4"> Payment Info </h5>

                            <div className="flex border-b border-black-300 space-y-1">
                                <span className="w-[40%]">Consignment</span>
                                <span className="w-[10%]">:</span>
                                <span className="w-[45%]">
                                    {dataParcelMerchantDeliveryPayment?.merchant_payment_invoice ? dataParcelMerchantDeliveryPayment?.merchant_payment_invoice : ""}
                                </span>
                            </div>

                            <div className="flex border-b border-black-300 space-y-1">
                                <span className="w-[40%]"> Date</span>
                                <span className="w-[10%]">:</span>
                                <span className="w-[45%]">
                                    {dataParcelMerchantDeliveryPayment?.date_time ? formatDate(dataParcelMerchantDeliveryPayment?.date_time) : ""}
                                </span>
                            </div>


                            <div className="flex border-b border-black-300 space-y-1">
                                <span className="w-[40%]">Total Payment Parcel	</span>
                                <span className="w-[10%]">:</span>
                                <span className="w-[45%]">
                                    {dataParcelMerchantDeliveryPayment?.total_payment_parcel ? dataParcelMerchantDeliveryPayment?.total_payment_parcel : ""}
                                </span>
                            </div>

                            <div className="flex border-b border-black-300 space-y-1">
                                <span className="w-[40%]">Total Payment Amount	</span>
                                <span className="w-[10%]">:</span>
                                <span className="w-[45%]">
                                    {dataParcelMerchantDeliveryPayment?.total_payment_amount ? dataParcelMerchantDeliveryPayment?.total_payment_amount : ""}
                                </span>
                            </div>

                            <div className="flex border-b border-black-300 space-y-1">
                                <span className="w-[40%]">Reference	</span>
                                <span className="w-[10%]">:</span>
                                <span className="w-[45%]">
                                    {dataParcelMerchantDeliveryPayment?.transfer_reference ? dataParcelMerchantDeliveryPayment?.transfer_reference : ""}
                                </span>
                            </div>

                            <div className="flex border-b border-black-300 space-y-1">
                                <span className="w-[40%]">Delivery Payment Note	</span>
                                <span className="w-[10%]">:</span>
                                <span className="w-[45%]">
                                    {dataParcelMerchantDeliveryPayment?.note ? dataParcelMerchantDeliveryPayment?.note : ""}
                                </span>
                            </div>

                        </div>

                        <div>
                            <div className="customer-info border border-gray-500 p-5 rounded-lg mb-3">
                                <h5 className="mb-4">Merchant Info</h5>
                                <div className="flex border-b mt-2 border-black-300">
                                    <span className="w-[45%]">Name</span>
                                    <span className="w-[10%]">:</span>
                                    <span className="w-[45%]">
                                        <p>{data?.data?.parcel?.[0]?.parcel?.merchant?.company_name}</p>
                                    </span>
                                </div>
                                <div className="flex border-b mt-2 border-black-300">
                                    <span className="w-[45%]">Contact Number</span>
                                    <span className="w-[10%]">:</span>
                                    <span className="w-[45%]">
                                        <p>{data?.data?.parcel?.[0]?.parcel?.merchant?.contact_number}</p>

                                    </span>
                                </div>
                                <div className="flex border-b mt-3 border-black-300">
                                    <span className="w-[45%]">Address</span>
                                    <span className="w-[10%]">:</span>
                                    <span className="w-[45%]">
                                        {data?.data?.parcel?.[0]?.parcel?.merchant?.address}

                                    </span>
                                </div>

                            </div>

                        </div>
                    </div>


                    <div className='border border-gray-200 mt-5'>
                        <div className=' text-gray-700'>
                            <table style={tableStyle}>
                                <thead>
                                    <tr>
                                        <th className='font-bold text-xs' style={thStyle}>SL</th>
                                        <th className='font-bold  text-xs' style={thStyle}>Invoice</th>
                                        <th className='font-bold  text-xs' style={thStyle}>Order ID</th>
                                        <th className='font-bold  text-xs' style={thStyle}>Status</th>
                                        <th className='font-bold text-xs' style={thStyle}>Customer  Name</th>
                                        <th className='font-bold text-xs' style={thStyle}>Customer  Number</th>
                                        <th className='font-bold text-xs' style={thStyle}>Amount to be collect</th>
                                        <th className='font-bold text-xs' style={thStyle}>Collected</th>
                                        <th className='font-bold text-xs' style={thStyle}>Weight Charge</th>
                                        <th className='font-bold text-xs' style={thStyle}>COD Charge</th>
                                        <th className='font-bold text-xs' style={thStyle}>Delivery</th>
                                        <th className='font-bold text-xs' style={thStyle}>Return</th>
                                        <th className='font-bold text-xs' style={thStyle}>Total Charge</th>
                                        <th className='font-bold text-xs' style={thStyle}>Paid Amount</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        data?.data?.parcel?.map((details, index) => (
                                            <tr key={details?.id}>
                                                <td className='text-[9px]' style={tdStyle}>{index + 1}</td>
                                                <td className='text-[9px]' style={tdStyle}>{details?.parcel?.parcel_invoice}</td>
                                                <td className='text-[9px]' style={tdStyle}>{details?.parcel?.merchant_order_id}</td>
                                                <td className='text-[9px]' style={tdStyle}>
                                                    <IntegerWisedStatusFullMeaningForAdmin
                                                        status={details?.parcel?.status}
                                                        delivery_type={details?.parcel?.delivery_type}
                                                        payment_type={details?.parcel?.payment_type}
                                                    />
                                                </td>
                                                <td className='text-[9px]' style={tdStyle}>{details?.parcel?.customer_name}</td>
                                                <td className='text-[9px]' style={tdStyle}>{details?.parcel?.customer_contact_number}</td>
                                                <td className='text-[9px]' style={tdStyle}>{details?.parcel?.total_collect_amount}</td>
                                                <td className='text-[9px]' style={tdStyle}>{details?.parcel?.customer_collect_amount}</td>
                                                <td className='text-[9px]' style={tdStyle}>{details?.parcel?.weight_package_charge}</td>
                                                <td className='text-[9px]' style={tdStyle}>{details?.parcel?.cod_charge}</td>
                                                <td className='text-[9px]' style={tdStyle}>{details?.parcel?.delivery_charge}</td>
                                                <td className='text-[9px]' style={tdStyle}>{details?.parcel?.return_charge}</td>
                                                <td className='text-[9px]' style={tdStyle}>{details?.parcel?.total_charge}</td>
                                                <td className='text-[9px]' style={tdStyle}>{details?.parcel?.merchant_paid_amount}</td>

                                            </tr>

                                        ))
                                    }
                                    <tr>
                                        <td className='text-[9px]' style={tdStyle}></td>
                                        <td className='text-[9px]' style={tdStyle}></td>
                                        <td className='text-[9px]' style={tdStyle}></td>
                                        <td className='text-[9px]' style={tdStyle}></td>
                                        <td className='text-[9px]' style={tdStyle}></td>
                                        <td className='text-[15px]' style={tdStyle}>Total: </td>
                                        <td className='text-[9px]' style={tdStyle}>{parseFloat(amountToBeCollect).toFixed(2)}</td>
                                        <td className='text-[9px]' style={tdStyle}>{parseFloat(collectAmount).toFixed(2)}</td>
                                        <td className='text-[9px]' style={tdStyle}>{parseFloat(weightTotal).toFixed(2)}</td>
                                        <td className='text-[9px]' style={tdStyle}>{parseFloat(codChargeTotal).toFixed(2)}</td>
                                        <td className='text-[9px]' style={tdStyle}>{parseFloat(deliveryChargeTotal).toFixed(2)}</td>
                                        <td className='text-[9px]' style={tdStyle}>{parseFloat(returnChargeTotal).toFixed(2)}</td>
                                        <td className='text-[9px]' style={tdStyle}>{parseFloat(totalCharge).toFixed(2)}</td>
                                        <td className='text-[9px]' style={tdStyle}>{parseFloat(paidAmountTotal).toFixed(2)}</td>

                                    </tr>

                                </tbody>
                            </table>
                        </div>

                    </div>


                    <div className='flex justify-between p-20 text-center'>
                        <div>
                            <p className='border border-b bg-black-500 w-[120%] mx-auto' />
                            <p className='text-center ml-5'>Merchant Signature</p>
                        </div>
                        <div>
                            <p className='border border-b bg-black-900 w-[120%] mx-auto' />
                            <p className='text-center ml-5'>Authority</p>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    );
};

export default PrintMerchantDeliveryPayemnt;