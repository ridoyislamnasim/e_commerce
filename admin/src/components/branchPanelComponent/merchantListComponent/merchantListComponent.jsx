import Card from '@/components/ui/Card';
import { Icon } from '@iconify/react';
import React, { useRef } from 'react'
import { useSelector } from 'react-redux';
import ReactToPrint from 'react-to-print';
import img from '@/assets/images/logo/promise.png'

const MerchantListComponent = ({ data }) => {
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

    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options)

    const componentRef = useRef(null);

    console.log("dataMerchant list::", data)
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
                    documentTitle='Printing the parcel'
                    pageStyle="print"
                />
            </div>


            <Card title="Merchant List" noborder>
                <div className=" overflow-x-auto -mx-6" >
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ">
                            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                                <thead className="bg-slate-200 dark:bg-slate-700">
                                    <tr>
                                        <th scope="col" className=" table-th ">#</th>
                                        <th scope="col" className=" table-th "> Merchant Id</th>
                                        <th scope="col" className=" table-th ">Name</th>
                                        <th scope="col" className=" table-th ">Company Name</th>
                                        <th scope="col" className=" table-th "> Address</th>
                                        <th scope="col" className=" table-th ">Contact Number</th>
                                        <th scope="col" className=" table-th ">COD Charge </th>

                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                                    {data?.map((row, index) => (
                                        <tr
                                            key={index}
                                            className=" even:bg-slate-200 dark:even:bg-slate-700"
                                        >
                                            <td className="table-td">{index + 1}</td>
                                            <td className="table-td">{row?.m_id}</td>
                                            <td className="table-td">{row?.name}</td>
                                            <td className="table-td">{row?.company_name}</td>
                                            <td className="table-td">{row?.address}</td>
                                            <td className="table-td">{row?.contact_number}</td>
                                            <td className="table-td">{row?.cod_charge}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Print */}
            <div className=' hidden' >
                <div ref={componentRef}>
                    <div className=' flex flex-col text-center items-center justify-center' >
                        <img src={img} alt="img" className=' w-36 items-center' />
                        <p className='text-2xl font-semibold'>E-Commerce</p>
                        <p className='text-xl font-semibold mt-1'>Merchant list Info</p>
                        <p className='text-xl font-semibold mt-1'>Date: {formattedDate} </p>
                    </div>

                    <div className=' p-3 mt-5'>
                        <div className='w-full overflow-x-auto text-gray-700'>
                            <table style={tableStyle}>
                                <thead>
                                    <tr>
                                        <th className='font-bold text-[12px] ' style={thStyle}>SL</th>
                                        <th className='font-bold text-[12px] ' style={thStyle}>Merchant Id </th>
                                        <th className='font-bold text-[12px] ' style={thStyle}>Name </th>
                                        <th className='font-bold text-[12px] ' style={thStyle}>Company Name </th>
                                        <th className='font-bold text-[12px] ' style={thStyle}>Address </th>
                                        <th className='font-bold text-[12px] ' style={thStyle}>Contact Number </th>
                                        <th className='font-bold text-[12px] ' style={thStyle}>COD Charge </th>
                                        <th className='font-bold text-[12px] ' style={thStyle}>Status </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data?.map((details, index) => (
                                            <tr key={details?.id}>
                                                <td className='text-[11px] ' style={tdStyle}>{index + 1}</td>
                                                <td className='text-[11px] ' style={tdStyle}>{details?.m_id}</td>
                                                <td className='text-[11px] ' style={tdStyle}>{details?.name}</td>
                                                <td className='text-[11px] ' style={tdStyle}>{details?.company_name}</td>
                                                <td className='text-[11px] ' style={tdStyle}>{details?.address}</td>
                                                <td className='text-[11px] ' style={tdStyle}>{details?.contact_number}</td>
                                                <td className='text-[11px] ' style={tdStyle}>{details?.cod_charge}</td>
                                                <td className='text-[11px]' style={tdStyle}>
                                                    {details?.status === (true) ? "Active" : "Inactive"}
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
    )
}

export default MerchantListComponent