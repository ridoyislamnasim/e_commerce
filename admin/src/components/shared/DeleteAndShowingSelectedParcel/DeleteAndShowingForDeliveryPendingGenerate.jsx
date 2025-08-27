import React, { useEffect } from 'react';

import { LuDelete } from "react-icons/lu";


const DeleteAndShowingForDeliveryPendingGenerate = ({
    selectedIds,
    setSelectedIds,

    foundParcelsByBarcode,
    setFoundParcelsByBarcode,

    data,
    selectedDatabaseIds,
    setSelectedDatabaseIds,
    extractedParcels,
}) => {


    const handleDelete = (id) => {
        setSelectedIds(selectedIds.filter(item => item.id !== id))
    };

    useEffect(() => {
        setSelectedDatabaseIds(extractedParcels || []);
    }, [data]);


    const handleDeleteDatabaseIds = (id) => {
        setSelectedDatabaseIds(selectedDatabaseIds.filter(item => item.id !== id))
    };


    const handleDeleteBarcodeParcels = (id) => {
        setFoundParcelsByBarcode(foundParcelsByBarcode.filter(item => item.id !== id))
    };

    console.log("selectedIds", selectedIds);

    return (
        <div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-2 mt-3'>
                {selectedIds?.map((item) => (
                    <div key={item?.id} className='flex  items-center border border-gray-300 p-3 justify-between rounded-sm bg-white '>
                        <div>
                            <div className='' >
                                <div>
                                    <p className='text-sm text-black font-semibold'>{item?.parcel_invoice}</p>
                                </div>

                            </div>

                            <div className='text-sm mt-2'>
                                <p>{item?.merchant_order_id}</p>
                                <p>{item?.merchant?.company_name}</p>
                                <p>Cash: {item?.customer_collect_amount}</p>
                            </div>
                        </div>

                        <div className=''>
                            <LuDelete className='text-red-500 cursor-pointer text-3xl' onClick={() => handleDelete(item?.id)} />
                        </div>
                    </div>
                ))}
            </div>



            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-2 mt-3'>
                {selectedDatabaseIds?.map((item) => (
                    <div key={item?.id} className='flex  items-center border border-gray-300 p-3 justify-between rounded-sm bg-white '>
                        <div>
                            <div className='' >
                                <div>
                                    <p className='text-sm text-black font-semibold'>{item?.parcel_invoice}</p>
                                </div>

                            </div>

                            <div className='text-sm mt-2'>
                                <p>{item?.merchant_order_id}</p>
                                <p>{item?.merchant?.company_name}</p>
                                <p>Cash: {item?.customer_collect_amount}</p>
                            </div>
                        </div>

                        <div className=''>
                            <LuDelete className='text-red-500 cursor-pointer text-3xl' onClick={() => handleDelete(item?.id)} />
                        </div>
                    </div>
                ))}
            </div>



            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-2 mt-3'>
                {foundParcelsByBarcode?.map((item) => (
                    <div key={item?.id} className='flex  items-center border border-gray-300 p-3 justify-between rounded-sm bg-white '>
                        <div>
                            <div className='' >
                                <div>
                                    <p className='text-sm text-black font-semibold'>{item?.parcel_invoice}</p>
                                </div>

                            </div>

                            <div className='text-sm mt-2'>
                                <p>{item?.merchant_order_id}</p>
                                <p>{item?.merchant?.company_name}</p>
                                <p>Cash: {item?.customer_collect_amount}</p>
                            </div>
                        </div>

                        <div className=''>
                            <LuDelete className='text-red-500 cursor-pointer text-3xl' onClick={() => handleDelete(item?.id)} />
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default DeleteAndShowingForDeliveryPendingGenerate;