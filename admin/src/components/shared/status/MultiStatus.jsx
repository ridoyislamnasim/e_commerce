import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { useUpdateAreaStatusMutation } from '@/store/api/app/ApplicationSetting/Area/areaApiSlice';
import { useGetOrderQuery, useUpdateOrderStatusMutation } from '@/store/api/app/Order/orderApiSlice';
import { useUpdateTransferStatusMutation } from '@/store/api/app/Transfer/transferApiSlice';
import { useSelector } from 'react-redux';
// Import other necessary hooks here...

const orderOptions = [
  { value: '', label: 'Select Order Status' },
  { value: 'OrderPlaced', label: 'Order Placed' },
  { value: 'DeliveredPending', label: 'Delivery Pending' },
  { value: 'Delivered', label: 'Delivered' },
  { value: 'Cancelled', label: 'Cancelled' },
  { value: 'Hold', label: 'On Hold' },
  { value: 'InReview', label: 'In Review' },
]

const transferOptions = [
  { value: '', label: 'Select Order Status' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Reject', label: 'Reject' },
]
const transferOptionsSend = [
  { value: '', label: 'Select Order Status' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Reject', label: 'Cancle' },
]
// "pending", "completed", "cancel"

const MultiStatus = ({ id, status, option = '' }) => {
  const { isAuth, auth } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const pathArray = pathname.split('/');
  console.log("=============", id, status, option)
  console.log("=============", auth?.user?.warehouseRef)
  let hook = null;
  let fetchQuery = null;
  let defaultOptions = [];

  if (pathArray.includes('area')) {
    hook = useUpdateAreaStatusMutation;
    fetchQuery = '';
  } else if (pathArray.includes('order')) {
    hook = useUpdateOrderStatusMutation;
    fetchQuery = '';
    defaultOptions = orderOptions;
  } else if (pathArray.includes('received-transfer')) {
    hook = useUpdateTransferStatusMutation;
    fetchQuery = '';
    const nowTransfer = []
    if (status == 'Reject') {
      nowTransfer.push({ value: '', label: "Reject" })
    } else if (status == 'Completed') {
      nowTransfer.push({ value: '', label: "Completed" })
    }
    defaultOptions =  nowTransfer?.length>0 ? nowTransfer : transferOptions;
    // defaultOptions = nowTransfer;
  } else if (pathArray.includes('send-transfer')) {
    hook = useUpdateTransferStatusMutation;
    fetchQuery = '';
    const nowTransfer = []
    if (status == 'Reject') {
      nowTransfer.push({ value: '', label: "Reject" })
    } else if (status == 'Pending') {
      nowTransfer.push({ value: '', label: "Pending" })
    }
    defaultOptions = nowTransfer.length > 0 ? nowTransfer : transferOptionsSend;
  }
  // Add other conditions for different statuses...

  const [updateStatus, { isLoading }] = hook
    ? hook()
    : [() => { }, { isLoading: false }];
  const { data, isFetching } = fetchQuery ? fetchQuery() : { data: [], isFetching: false };

  const options = data?.data
    ? [
      ...defaultOptions,
      ...data.data.map((item) => ({
        value: item.status,
        label: `${item.status || item.title || 'Item'}`,
      })),
    ]
    : defaultOptions;
  const warehouseRef = auth?.user?.warehouseRef
  const handleChange = async (e) => {
    const newStatus = e.target.value;
    if (!newStatus) return;
    try {
      await updateStatus({ id, status: newStatus, warehouseRef }).unwrap();
      toast.success('Status updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="w-full">
      <select
        value={status}
        onChange={handleChange}
        className=" basic-multi-select block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MultiStatus;
