import { Icon } from '@iconify/react';
import React, { useState, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import img from '@/assets/images/logo/logo-c-white.svg'
import { useGetInventorysQuery } from '@/store/api/app/Inventory/inventoryApiSlice';
import { useSelector } from 'react-redux';


const PrintAll = ({ selectedIds, isPrintInventory, isPrintBranchUser, isPrintBranch }) => {
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

    const { data: InventoryData, isLoading, isError, error } = useGetInventorysQuery(
        { warehouseRef: auth?.user?.warehouseRef },
        {
            skip: selectedIds.length > 0,
        }
    );
    const finalInventoryData = selectedIds.length === 0 ? InventoryData?.data : selectedIds;


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
                />
            </div>


            <div className='hidden'>
                <div className='w-full overflow-x-auto mt-10 text-gray-700 ' ref={componentRef} >
                    {isPrintBranchUser == true ?
                        <div>
                            <div className=' flex flex-col text-center items-center justify-center'>
                                <img src={img} alt="img" className=' w-36 items-center' />
                                <p className='text-2xl font-semibold'>E-Commerce</p>
                                <p className='text-xl font-semibold mt-1'>Branch user list Info</p>
                                <p className='text-xl font-semibold mt-1'>Date: {formattedDate} </p>
                            </div>


                            <div className=' p-3 mt-5'>
                                <div className='w-full overflow-x-auto text-gray-700'>
                                    <table style={tableStyle}>
                                        <thead>
                                            <tr>
                                                <th className='font-bold text-[9px] ' style={thStyle}>SL</th>
                                                <th className='font-bold text-[9px] ' style={thStyle}> Name</th>
                                                <th className='font-bold text-[9px] ' style={thStyle}>Email </th>
                                                <th className='font-bold text-[9px] ' style={thStyle}>Branch  </th>
                                                <th className='font-bold text-[9px] ' style={thStyle}>District  </th>
                                                <th className='font-bold text-[9px] ' style={thStyle}>Area  </th>
                                                <th className='font-bold text-[9px] ' style={thStyle}>Status  </th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                branchUserData?.data?.result?.map((details, index) => (
                                                    <tr key={details?.id}>
                                                        <td className='text-[8px] ' style={tdStyle}>{index + 1}</td>
                                                        <td className='text-[8px] ' style={tdStyle}>{details?.name}</td>
                                                        <td className='text-[8px] ' style={tdStyle}>{details?.email}</td>
                                                        <td className='text-[8px] ' style={tdStyle}>{details?.branche?.name}</td>
                                                        <td className='text-[8px] ' style={tdStyle}>{details.branche?.area?.district?.name}</td>
                                                        <td className='text-[8px] ' style={tdStyle}>{details?.branche?.area?.name}</td>
                                                        <td className='text-[8px]' style={tdStyle}>
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
                        : isPrintInventory == true ?
                            <div>
                                <div className=' flex flex-col text-center items-center justify-center'>
                                    <img src={img} alt="img" className=' w-36 items-center' />
                                    <p className='text-2xl font-semibold'>E-Commerce</p>
                                    <p className='text-xl font-semibold mt-1'>Inventory list Info</p>
                                    <p className='text-xl font-semibold mt-1'>Date: {formattedDate} </p>
                                </div>


                                <div className=' p-3 mt-5'>
                                    <div className='w-full overflow-x-auto text-gray-700'>
                                        <table style={tableStyle}>
                                            <thead>
                                                <tr>
                                                    <th className='font-bold text-[9px] ' style={thStyle}>SL</th>
                                                    <th className='font-bold text-[9px] ' style={thStyle}> Inventory ID</th>
                                                    <th className='font-bold text-[9px] ' style={thStyle}>Quantity </th>
                                                    <th className='font-bold text-[9px] ' style={thStyle}>Available Quantity  </th>
                                                    <th className='font-bold text-[9px] ' style={thStyle}>Sold Quantity  </th>
                                                    <th className='font-bold text-[9px] ' style={thStyle}>Hold Quantity  </th>
                                                    <th className='font-bold text-[9px] ' style={thStyle}>Level  </th>
                                                    <th className='font-bold text-[9px] ' style={thStyle}>Color Name  </th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    finalInventoryData?.map((details, index) => (
                                                        <tr key={details?.id}>
                                                            <td className='text-[8px] ' style={tdStyle}>{index + 1}</td>
                                                            <td className='text-[8px] ' style={tdStyle}>{details?.inventoryID}</td>
                                                            <td className='text-[8px] ' style={tdStyle}>{details?.quantity}</td>
                                                            <td className='text-[8px] ' style={tdStyle}>{details?.availableQuantity}</td>
                                                            <td className='text-[8px] ' style={tdStyle}>{details?.soldQuantity}</td>
                                                            <td className='text-[8px] ' style={tdStyle}>{details?.holdQuantity}</td>
                                                            <td className='text-[8px] ' style={tdStyle}>{details?.level || 'N/A'}</td>
                                                            <td className='text-[8px] ' style={tdStyle}>{details?.name || 'N/A'}</td>

                                                        </tr>
                                                    ))
                                                }

                                            </tbody>
                                        </table>
                                    </div>

                                </div>  </div>
                            : isPrintBranch == true ?
                                <div>
                                    <div className=' flex flex-col text-center items-center justify-center'>
                                        <img src={img} alt="img" className=' w-36 items-center' />
                                        <p className='text-2xl font-semibold'>E-Commerce</p>
                                        <p className='text-xl font-semibold mt-1'>Branch list Info</p>
                                        <p className='text-xl font-semibold mt-1'>Date: {formattedDate} </p>
                                    </div>

                                    <div className=' p-3 mt-5'>
                                        <div className='w-full overflow-x-auto text-gray-700'>
                                            <table style={tableStyle}>
                                                <thead>
                                                    <tr>
                                                        <th className='font-bold text-[9px] ' style={thStyle}>SL</th>
                                                        <th className='font-bold text-[9px] ' style={thStyle}> Name</th>
                                                        <th className='font-bold text-[9px] ' style={thStyle}>Email </th>
                                                        <th className='font-bold text-[9px] ' style={thStyle}>Address  </th>
                                                        <th className='font-bold text-[9px] ' style={thStyle}>Type  </th>
                                                        <th className='font-bold text-[9px] ' style={thStyle}>Parent  </th>
                                                        <th className='font-bold text-[9px] ' style={thStyle}>District  </th>
                                                        <th className='font-bold text-[9px] ' style={thStyle}>Area  </th>
                                                        <th className='font-bold text-[9px] ' style={thStyle}>Status  </th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        branchData?.data?.result?.map((details, index) => (
                                                            <tr key={details?.id}>
                                                                <td className='text-[8px] ' style={tdStyle}>{index + 1}</td>
                                                                <td className='text-[8px] ' style={tdStyle}>{details?.name}</td>
                                                                <td className='text-[8px] ' style={tdStyle}>{details?.email}</td>
                                                                <td className='text-[8px] ' style={tdStyle}>{details?.address}</td>
                                                                <td className='text-[8px]' style={tdStyle}>
                                                                    {details?.type === 1 ? "Parent Branch" : "Sub Branch"}
                                                                </td>
                                                                <td className='text-[8px]' style={tdStyle}>
                                                                    {details?.type === 1 ? "Default" : " "}
                                                                </td>
                                                                <td className='text-[8px] ' style={tdStyle}>{details?.district?.name}</td>
                                                                <td className='text-[8px] ' style={tdStyle}>{details?.area?.name}</td>
                                                                <td className='text-[8px]' style={tdStyle}>
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

export default PrintAll;