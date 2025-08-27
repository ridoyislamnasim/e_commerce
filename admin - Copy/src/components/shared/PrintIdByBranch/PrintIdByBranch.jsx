import { Icon } from '@iconify/react';
import React, { useState, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import img from '@/assets/images/logo/promise.png'
import { useSelector } from 'react-redux';



const PrintIdByBranch = ({ isPrintAllRiderListByBranch, isPrintAllMerchantsByBranch }) => {
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

    const { data } = useGetAllRiderByBranchByPaginationQuery({
        branch_id: auth?.user?.user_info?.branch_id,
        limit: 1000,
    });

    const { data: merchantData } = useGetAllMerchantsByBranchByPaginationQuery({
        branch_id: auth?.user?.user_info?.branch_id,
        limit: 1000,

    });



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
                        isPrintAllRiderListByBranch === true ?
                            <div>
                                <div className=' flex flex-col text-center items-center justify-center'>
                                    <img src={img} alt="img" className=' w-36 items-center' />
                                    <p className='text-2xl font-semibold'>E-Commerce</p>
                                    <p className='text-xl font-semibold mt-1'>Rider List Info</p>
                                    <p className='text-xl font-semibold mt-1'>Date: {formattedDate} </p>
                                </div>

                                <div className=' p-3 mt-5'>
                                    <div className='w-full overflow-x-auto text-gray-700'>
                                        <table style={tableStyle}>
                                            <thead>
                                                <tr>
                                                    <th className='font-bold text-[10px] ' style={thStyle}>SL</th>
                                                    <th className='font-bold text-[10px] ' style={thStyle}>Name </th>
                                                    <th className='font-bold text-[10px] ' style={thStyle}>Address </th>
                                                    <th className='font-bold text-[10px] ' style={thStyle}>Contact Number </th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    data?.data?.result?.map((details, index) => (
                                                        <tr key={details?.id}>
                                                            <td className='text-[8px] ' style={tdStyle}>{index + 1}</td>
                                                            <td className='text-[8px] ' style={tdStyle}>{details?.name}</td>
                                                            <td className='text-[8px] ' style={tdStyle}>{details?.address}</td>
                                                            <td className='text-[8px] ' style={tdStyle}>{details?.contact_number}</td>


                                                        </tr>
                                                    ))
                                                }

                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>

                            :
                            isPrintAllMerchantsByBranch === true ?
                                <div>
                                    <div className=' flex flex-col text-center items-center justify-center'>
                                        <img src={img} alt="img" className=' w-36 items-center' />
                                        <p className='text-2xl font-semibold'>E-Commerce</p>
                                        <p className='text-xl font-semibold mt-1'>Rider List Info</p>
                                        <p className='text-xl font-semibold mt-1'>Date: {formattedDate} </p>
                                    </div>

                                    <div className=' p-3 mt-5'>
                                        <div className='w-full overflow-x-auto text-gray-700'>
                                            <table style={tableStyle}>
                                                <thead>
                                                    <tr>
                                                        <th className='font-bold text-[10px] ' style={thStyle}>SL</th>
                                                        <th className='font-bold text-[10px] ' style={thStyle}>Merchant Id </th>
                                                        <th className='font-bold text-[10px] ' style={thStyle}>Name  </th>
                                                        <th className='font-bold text-[10px] ' style={thStyle}>Company Name </th>
                                                        <th className='font-bold text-[10px] ' style={thStyle}>Address </th>
                                                        <th className='font-bold text-[10px] ' style={thStyle}>Contact Number </th>
                                                        <th className='font-bold text-[10px] ' style={thStyle}>COD Charge </th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        merchantData?.data?.result?.map((details, index) => (
                                                            <tr key={details?.id}>
                                                                <td className='text-[8px] ' style={tdStyle}>{index + 1}</td>
                                                                <td className='text-[8px] ' style={tdStyle}>{details?.m_id}</td>
                                                                <td className='text-[8px] ' style={tdStyle}>{details?.name}</td>
                                                                <td className='text-[8px] ' style={tdStyle}>{details?.company_name}</td>
                                                                <td className='text-[8px] ' style={tdStyle}>{details?.address}</td>
                                                                <td className='text-[8px] ' style={tdStyle}>{details?.contact_number}</td>
                                                                <td className='text-[8px] ' style={tdStyle}>{details?.cod_charge}</td>


                                                            </tr>
                                                        ))
                                                    }

                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>

                                :
                                null}
                </div>
            </div>
        </div>
    );
};

export default PrintIdByBranch;
