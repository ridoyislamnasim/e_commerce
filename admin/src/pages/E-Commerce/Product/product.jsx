import CustomPaginationTable from '@/components/shared/CustomTable/CustomPaginationTable';
import SkeletionTable from '@/components/skeleton/Table';
import MediaModal from '@/components/ui/MediaModal';
import envConfig from '@/configs/envConfig';
import useNoImage from '@/hooks/useNoImage';
import { useGetProductsByPaginationQuery } from '@/store/api/app/Product/productApiSlice';
import { useGetSingleRoleByIdQuery } from '@/store/api/app/Role/roleApiSlice';
import { extractYouTubeId } from '@/utils/extractYouTubeId';
import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

const Product = () => {
  const [paginationPage, setPaginationPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState('desc');
  const noImage = useNoImage();
  const [popup, setPopup] = useState({ show: false, mediaType: null, src: "" });
  const { auth } = useSelector((state) => state.auth);
  // Fetch Productss data
  const { data, isLoading: isProductsLoading, isError, error } =
    useGetProductsByPaginationQuery({
      page: paginationPage,
      limit: limit,
      order: order,
      warehouseRef: auth?.user?.warehouseRef,
      search: '',
    });

  // Fetch role permissions

  const { data: roleData, isLoading: isRoleLoading } = useGetSingleRoleByIdQuery({
    id: auth?.user?.roleRef,
    permission: 'product', // Adjusted permission key
  });

  const permission = useMemo(() => roleData?.data?.permissions?.product, [roleData]);
  // const permission = {
  //   "access": true,
  //   "create": true,
  //   "edit": true,
  //   "delete": true,
  // };

  // // Check if data or permissions are still loading
  // if (isProductsLoading || isRoleLoading) {
  //   return <SkeletionTable />;
  // }
  if (isProductsLoading) {
    return <SkeletionTable />;
  }

  // Handle errors
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!permission) {
    return <div>You do not have permission to view this data.</div>;
  }





  const handlePopup = (mediaType, src) => {
    setPopup({ show: true, mediaType, src });
  };

  const closePopup = () => setPopup({ show: false, mediaType: null, src: "" });


  const COLUMNS = [
    {
      Header: 'Product ID',
      accessor: 'productId',
      Cell: (row) => <span>{row.cell.value}</span>,
    },
    {
      Header: 'Name',
      accessor: 'name',
      Cell: (row) => <span>{row.cell.value}</span>,
    },
    {
      Header: 'Description',
      accessor: 'description',
      Cell: (row) =>
        <span className="line-clamp-2 overflow-hidden text-ellipsis">
          {row.cell.value}
        </span>,
    },
    {
      Header: 'Discount',
      accessor: 'discount',
      // Cell: (row) => <span>{row.cell.value}</span>,
      Cell: (row) => <span>{row.cell.value == true ? "YES" : "NO"}</span>,
    },
    {
      Header: "Warehouse Information",
      accessor: "WarehouseInformation", // Unique accessor
      Cell: ({ row }) => (
        <div className="space-y-2">
          <p>
            <strong>Warehouse Price:</strong> {row?.original?.warehousePrice}
          </p>
          <p>
            <strong>Warehouse Profit:</strong> {row?.original?.warehouseProfit}
          </p>
        </div>
      ),
    },
    {
      Header: "Wholesale Information",
      accessor: "WholesaleInformation", // Unique accessor
      Cell: ({ row }) => (
        <div className="">
          <p>
            <strong>Wholesale Price:</strong> {row?.original?.wholesalePrice}
          </p>
          <p>
            <strong>Wholesale Profit:</strong> {row?.original?.wholesaleProfit}
          </p>

        </div>
      ),
    },
    {
      Header: 'MRP Price',
      accessor: 'mrpPrice',
      Cell: (row) => <span>{row.cell.value}</span>,
    },
    {
      Header: 'Discount Type',
      accessor: 'discountType',
      Cell: (row) => <span>{row.cell.value || "N/A"}</span>,
    },
    {
      Header: 'Discount Amount',
      accessor: 'discountAmount',
      Cell: (row) => <span>{row.cell.value || "N/A"}</span>,
    },
    {
      Header: 'Price',
      accessor: 'price',
      Cell: (row) => <span>{row.cell.value}</span>,
    },
    {
      Header: 'Free Shipping',
      accessor: 'freeShipping',
      Cell: (row) => <span>{row.cell.value == true ? "YES" : "NO"}</span>,
    },
    {
      Header: 'Thumbnail Image',
      accessor: 'thumbnailImage',
      Cell: (row) => (
        <img
          src={`${envConfig.apiUrl}${row?.cell?.value}`}
          alt="slider"
          className="h-20 w-auto object-cover rounded-lg"
          onClick={() => handlePopup("image", `${envConfig.apiUrl}${row?.cell?.value}`)}
          onError={(e) => {
            e.target.onerror = null; // Prevents looping
            e.target.src = noImage;
          }}
        />
      ),
    },
    {
      Header: 'Back View Image',
      accessor: 'backViewImage',
      Cell: (row) => (
        <img
          src={`${envConfig.apiUrl}${row?.cell?.value}`}
          alt="slider"
          className="h-20 w-auto object-cover rounded-lg"
          onError={(e) => {
            e.target.onerror = null; // Prevents looping
            e.target.src = noImage;
          }}
        />
      ),
    },

    {
      Header: 'Images',
      accessor: 'images',
      // className: 'w-full', // Adjust width using Tailwind CSS
      Cell: (row) => (
        <div className="flex space-x-2 overflow-hidden max-w-full w-64">
          <>
            {row.cell.value && row.cell.value.length > 0 ? (
              row.cell.value.slice(0, 3).map((image, index) => (
                <img
                  key={index}
                  src={`${envConfig.apiUrl}${image}`}
                  alt={`image-${index}`}
                  className="h-20 w-auto object-cover rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null; // Prevents looping
                    e.target.src = noImage; // Fallback image
                  }}
                />
              ))
            ) : (
              <img
                src={noImage}
                alt="no-image"
                className="h-20 w-auto object-cover rounded-lg"
              />
            )}
          </>
        </div>
      ),
    },



    {
      Header: 'Video',
      accessor: 'videoUrl',
      id: 'videoEmbed',
      Cell: (row) => {
        const videoUrl = row?.cell?.value;
        if (!videoUrl || typeof videoUrl !== 'string') {
          return <span>No video available</span>;
        }

        const videoId = extractYouTubeId(videoUrl);

        // Check if videoId is valid
        if (!videoId) {
          return <span>Invalid video URL</span>;
        }

        // Render the YouTube embed iframe
        return (
          <iframe
            width="200"
            height="100"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        );
      },
    },
    {
      Header: 'Category',
      accessor: 'categoryRef.name',
      Cell: ({ cell: { value } }) => <span>{value || "N/A"}</span>,
    },
    {
      Header: 'Sub Category ',
      accessor: 'subCategoryRef.name',
      Cell: ({ cell: { value } }) => <span>{value || "N/A"}</span>,
    },
    {
      Header: 'Child Category ',
      accessor: 'childCategoryRef.name',
      Cell: ({ cell: { value } }) => <span>{value || "N/A"}</span>,
    },
    {
      Header: 'Sub Child Category ',
      accessor: 'subChildCategoryRef.name',
      Cell: ({ cell: { value } }) => <span>{value || "N/A"}</span>,
    },
    {
      Header: 'Brand',
      accessor: 'brandRef.name',
      Cell: ({ cell: { value } }) => <span>{value || "N/A"}</span>,
    },
  ];

  return (
    <>
      <CustomPaginationTable
        title="Products"
        COLUMNS={COLUMNS}
        data={data?.data}
        paginationPage={paginationPage}
        setPaginationPage={setPaginationPage}
        limit={limit}
        setLimit={setLimit}
        order={order}
        setOrder={setOrder}
        permission={permission}
      />
      <MediaModal
        show={popup.show}
        onClose={closePopup}
        mediaType={popup.mediaType}
        src={popup.src}
      />

    </>
  );
};

export default Product;
