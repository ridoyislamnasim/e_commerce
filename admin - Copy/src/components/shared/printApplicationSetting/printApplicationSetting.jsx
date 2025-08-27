import { Icon } from '@iconify/react';
import React, { useState, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import img from '@/assets/images/logo/promise.png'


const PrintApplicationSetting = ({ isPrintServiceType, isPrintItemType }) => {
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
    const { data: itemTypeData } = useGetItemTypesByPaginationQuery({
        limit: 1000,
    });
    const { data: serviceTypeData } = useGetServiceTypesByPaginationQuery({
        limit: 1000,
    });

    console.log("itemTypeData", itemTypeData)


    const componentRef = useRef(null);

    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options)



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
                    {isPrintServiceType == true ?
                        <div>
                            <div className=' flex flex-col text-center items-center justify-center'>
                                <img src={img} alt="img" className=' w-36 items-center' />
                                <p className='text-2xl font-semibold'>E-Commerce</p>
                                <p className='text-xl font-semibold mt-1'>Service Type list Info</p>
                                <p className='text-xl font-semibold mt-1'>Date: {formattedDate} </p>
                            </div>

                            <div className=' p-3 mt-5'>
                                <div className='w-full overflow-x-auto text-gray-700'>
                                    <table style={tableStyle}>
                                        <thead>
                                            <tr>
                                                <th className='font-bold text-[12px] ' style={thStyle}>SL</th>
                                                <th className='font-bold text-[12px] ' style={thStyle}>Service Area</th>
                                                <th className='font-bold text-[12px] ' style={thStyle}>Title</th>
                                                <th className='font-bold text-[12px] ' style={thStyle}>Rate</th>
                                                <th className='font-bold text-[12px] ' style={thStyle}>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                serviceTypeData?.data?.result?.map((details, index) => (
                                                    <tr key={details?.id}>
                                                        <td className='text-[11px] ' style={tdStyle}>{index + 1}</td>
                                                        <td className='text-[11px] ' style={tdStyle}>{details?.service_area?.name}</td>
                                                        <td className='text-[11px] ' style={tdStyle}>{details?.title}</td>
                                                        <td className='text-[11px] ' style={tdStyle}>{details?.rate}</td>
                                                        <td className='text-[11px]' style={tdStyle}>
                                                            {details?.status === (1 || true) ? "Active" : "Inactive"}
                                                        </td>
                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                        : isPrintItemType == true ?
                            <div>
                                <div className=' flex flex-col text-center items-center justify-center'>
                                    <img src={img} alt="img" className=' w-36 items-center' />
                                    <p className='text-2xl font-semibold'>E-Commerce</p>
                                    <p className='text-xl font-semibold mt-1'>Item Type list Info</p>
                                    <p className='text-xl font-semibold mt-1'>Date: {formattedDate} </p>
                                </div>

                                <div className=' p-3 mt-5'>
                                    <div className='w-full overflow-x-auto text-gray-700'>
                                        <table style={tableStyle}>
                                            <thead>
                                                <tr>
                                                    <th className='font-bold text-[12px] ' style={thStyle}>SL</th>
                                                    <th className='font-bold text-[12px] ' style={thStyle}>Service Area</th>
                                                    <th className='font-bold text-[12px] ' style={thStyle}>Title</th>
                                                    <th className='font-bold text-[12px] ' style={thStyle}>Rate</th>
                                                    <th className='font-bold text-[12px] ' style={thStyle}>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    itemTypeData?.data?.result?.map((details, index) => (
                                                        <tr key={details?.id}>
                                                            <td className='text-[11px] ' style={tdStyle}>{index + 1}</td>
                                                            <td className='text-[11px] ' style={tdStyle}>{details?.service_area?.name}</td>
                                                            <td className='text-[11px] ' style={tdStyle}>{details?.title}</td>
                                                            <td className='text-[11px] ' style={tdStyle}>{details?.rate}</td>
                                                            <td className='text-[11px]' style={tdStyle}>
                                                                {details?.status === (1 || true) ? "Active" : "Inactive"}
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

export default PrintApplicationSetting;