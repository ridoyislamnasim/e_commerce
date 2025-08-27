import Loading from '@/components/Loading';
import { Icon } from '@iconify/react';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import img from '@/assets/images/logo/promise.png'

const PrintReturnRiderRunList = ({ returnRiderRunListPrintData }) => {

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

    const totalRunParcel = returnRiderRunListPrintData?.data?.result?.reduce((total, item) => {
        return total + parseFloat(item?.total_run_parcel || 0);
    }, 0);

    const totalRunCompleteParcel = returnRiderRunListPrintData?.data?.result?.reduce((total, item) => {
        return total + parseFloat(item?.total_run_complete_parcel || 0);
    }, 0);


    console.log("returnRiderRunListPrintData", returnRiderRunListPrintData)

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
                        <p className='text-xl font-semibold mt-1'>Return Rider Run List</p>
                        <p className='text-xl font-semibold mt-1'>Date: {formattedDate} </p>
                    </div>


                    <div>
                        <div className='border border-gray-200 mt-5'>
                            <div className=' text-gray-700'>
                                <table style={tableStyle}>
                                    <thead>
                                        <tr>
                                            <th className='font-bold text-[11px] ' style={thStyle}>SL</th>
                                            <th className='font-bold  text-[11px] ' style={thStyle}>Consignment</th>
                                            <th className='font-bold  text-[11px] ' style={thStyle}>Rider Name</th>
                                            <th className='font-bold  text-[11px] ' style={thStyle}>Rider Phone</th>
                                            <th className='font-bold  text-[11px] ' style={thStyle}>Create Date</th>
                                            <th className='font-bold  text-[11px] ' style={thStyle}>Complete Date</th>
                                            <th className='font-bold  text-[11px] ' style={thStyle}>Run Parcel</th>
                                            <th className='font-bold  text-[11px] ' style={thStyle}>Complete Parcel</th>
                                            <th className='font-bold  text-[11px] ' style={thStyle}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            returnRiderRunListPrintData?.data?.result?.map((details, index) => (
                                                <tr key={details?.id}>
                                                    <td className='text-[9px]' style={tdStyle}>{index + 1}</td>
                                                    <td className='text-[9px]' style={tdStyle}>{details?.run_invoice}</td>
                                                    <td className='text-[9px]' style={tdStyle}>{details?.rider?.name}</td>
                                                    <td className='text-[9px]' style={tdStyle}>{details?.rider?.contact_number}</td>
                                                    <td className='text-[7px]' style={tdStyle}>{details?.created_at ? formatDate(details?.created_at) : null}</td>
                                                    <td className='text-[9px]' style={tdStyle}>{details?.complete_date_time}</td>
                                                    <td className='text-[9px]' style={tdStyle}>{details?.total_run_parcel}</td>
                                                    <td className='text-[9px]' style={tdStyle}>{details?.total_run_complete_parcel}</td>
                                                    <td className='text-[9px]' style={tdStyle}>
                                                        {
                                                            details?.status === 1 ? <p>Run Create</p> :
                                                                details?.status === 2 ? <p>Run Start</p> :
                                                                    details?.status === 3 ? <p> Run Cancel </p> :
                                                                        details?.status === 4 ? <p> Run Complete </p> : null
                                                        }
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                    <tr>
                                        <td className='text-[15px]' style={tdStyle}></td>
                                        <td className='text-[15px]' style={tdStyle}></td>
                                        <td className='text-[15px]' style={tdStyle}></td>
                                        <td className='text-[15px]' style={tdStyle}></td>
                                        <td className='text-[15px]' style={tdStyle}></td>
                                        <td className='text-[13px]' style={tdStyle}>Total:</td>
                                        <td className='text-[13px]' style={tdStyle}>{totalRunParcel}</td>
                                        <td className='text-[13px]' style={tdStyle}>{totalRunCompleteParcel}</td>
                                        <td className='text-[13px]' style={tdStyle}></td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrintReturnRiderRunList;