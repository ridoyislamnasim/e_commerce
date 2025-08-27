import CustomPaginationTable from '@/components/shared/CustomTable/CustomPaginationTable';
import SkeletionTable from '@/components/skeleton/Table';
import Badge from '@/components/ui/Badge';
import envConfig from '@/configs/envConfig';
import useNoImage from '@/hooks/useNoImage';


import { useGetRolesByPaginationQuery, useGetSingleRoleByIdQuery } from '@/store/api/app/Role/roleApiSlice';

import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

const Role = () => {
  const [paginationPage, setPaginationPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState('desc');
  const noImage = useNoImage();

  // Fetch childCategorys data
  const { data, isLoading: isRolesLoading, isError, error } =
    useGetRolesByPaginationQuery({
      page: paginationPage,
      limit: limit,
      order: order,
    });

  // Fetch role permissions
  const { isAuth, auth } = useSelector((state) => state.auth);
  const { data: roleData, isLoading: isRoleLoading } = useGetSingleRoleByIdQuery({
    id: auth?.user?.roleRef,
    permission: 'category',
  });

  // Memoize permissions to avoid unnecessary re-renders
  const permission = useMemo(() => roleData?.data?.permissions?.category, [roleData]);

  // Check if data or permissions are still loading
  if (isRolesLoading || isRoleLoading) {
    return <SkeletionTable />;
  }

  // Handle errors
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!permission) {
    return <div>You do not have permission to view this data.</div>;
  }

  const COLUMNS = [
    {
      Header: 'Role Name',
      accessor: 'role',
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    // {
    //   Header: 'Email',
    //   accessor: 'permissions',
    //   Cell: (row) => <span>{
    //     row?.cell?.value}</span>,
    // },

    // {
    //   Header: 'Permissions',
    //   accessor: 'permissions',
    //   Cell: ({ row }) => (
    //     <div className="text-sm leading-relaxed">
    //       {Object.entries(row.original.permissions).map(([key, value]) => (
    //         <div key={key}>
    //           <strong>{key}</strong>: 
    //           {` access: ${value.access}, create: ${value.create}, edit: ${value.edit}, delete: ${value.delete}`}
    //         </div>
    //       ))}
    //     </div>
    //   ),
    // },
    {
      Header: 'Permissions',
      accessor: 'permissions',
      Cell: ({ row }) => {
        const permissions = row.original.permissions;
        return (
          <div className="p-3  rounded-lg  max-w-full w-87 min-w-max ">
            <div className="grid grid-cols-1 gap-3">
              {Object.entries(permissions).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm font-semibold  capitalize">{key}</span>
                  <div className="flex space-x-1">
                    <Badge label="Access" value={value.access} className={value.access ? 'bg-green-500 text-white' : 'bg-danger-500 text-white'} />
                    <Badge label="Create" value={value.create} className={value.create ? 'bg-green-500 text-white' : 'bg-danger-500 text-white'} />
                    <Badge label="Edit" value={value.edit} className={value.edit ? 'bg-green-500 text-white' : 'bg-danger-500 text-white'} />
                    <Badge label="Delete" value={value.delete} className={value.delete ? 'bg-green-500 text-white' : 'bg-danger-500 text-white'} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      },
    },
    // {
    //   Header: 'Permissions',
    //   accessor: 'permissions2',
    //   Cell: ({ row }) => {
    //     const permissions = row.original.permissions;

    //     return (
    //       <div className="p-3 rounded-lg max-w-full w-87 min-w-max">
    //         <div className="grid grid-cols-1 gap-3">
    //           {Object.entries(permissions).map(([key, value]) => (
    //             <div key={key} className="flex flex-col">
    //               <span className="text-sm font-semibold capitalize">{key}</span>
    //               <div className="ml-4 mt-1 text-xs space-y-1">
    //                 <div>Access: <span className={value.access ? 'text-green-600' : 'text-red-600'}>{value.access ? 'true' : 'false'}</span></div>
    //                 <div>Create: <span className={value.create ? 'text-green-600' : 'text-red-600'}>{value.create ? 'true' : 'false'}</span></div>
    //                 <div>Edit: <span className={value.edit ? 'text-green-600' : 'text-red-600'}>{value.edit ? 'true' : 'false'}</span></div>
    //                 <div>Delete: <span className={value.delete ? 'text-green-600' : 'text-red-600'}>{value.delete ? 'true' : 'false'}</span></div>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     );
    //   },
    // }

  ];
  // const Badge = ({ label, value }) => {
  //   const bgColor = value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  //   const text = value ? 'Yes' : 'No';

  //   return (
  //     <span className={`px-2 py-1 text-xs font-semibold rounded ${bgColor}`}>
  //       {label}: {text}
  //     </span>
  //   );
  // };

  return (
    <>
      <CustomPaginationTable
        isView={false}
        title="Roles"
        COLUMNS={COLUMNS}
        data={data?.data}
        paginationPage={paginationPage}
        setPaginationPage={setPaginationPage}
        limit={limit}
        setLimit={setLimit}
        order={order}
        setOrder={setOrder}
        // defaultStatus={true}
        // permission={permission}
      />
    </>
  );
};

export default Role;
