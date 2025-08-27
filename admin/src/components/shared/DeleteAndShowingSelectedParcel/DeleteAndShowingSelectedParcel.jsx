import React, { useEffect } from 'react';

import { LuDelete } from "react-icons/lu";


const DeleteAndShowingSelectedParcel = ({
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


    return (
        <div>
            <div className='grid md:grid-cols-3 grid-cols-2 gap-2 mt-3'>
                {selectedIds?.map((item) => (
                    <div className='flex gap-2 items-center border border-gray-300 p-1 justify-center rounded-sm bg-white ' key={item?.id}>
                        <div>
                            <p className='text-sm'>{item?.parcel_invoice}</p>
                        </div>
                        <div className='w-5'>
                            <LuDelete className='text-red-500 cursor-pointer' onClick={() => handleDelete(item?.id)} />
                        </div>
                    </div>
                ))}
            </div>

            <div className='grid md:grid-cols-3 grid-cols-2 gap-2 mt-3'>
                {selectedDatabaseIds?.map((item) => (
                    <div className='flex gap-2 items-center border border-gray-300 p-1 justify-center rounded-sm  bg-white' key={item?.id}>
                        <p className='text-sm'>{item?.parcel_invoice}</p>
                        <LuDelete className='text-red-500 cursor-pointer' onClick={() => handleDeleteDatabaseIds(item?.id)} />
                    </div>
                ))}
            </div>

            <div className='grid md:grid-cols-3 grid-cols-2 gap-2 mt-3'>
                {    foundParcelsByBarcode?.map((item) => (
                    <div className='flex gap-2 items-center border border-gray-300 p-1 justify-center rounded-sm bg-white ' key={item?.id}>
                        <p className='text-sm'>{item?.parcel_invoice}</p>
                        <LuDelete className='text-red-500 cursor-pointer' onClick={() => handleDeleteBarcodeParcels(item?.id)} />
                    </div>
                ))}
            </div>


        </div>
    );
};

export default DeleteAndShowingSelectedParcel;