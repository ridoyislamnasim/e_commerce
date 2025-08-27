import { useDeleteBannerMutation } from '@/store/api/app/Banner/bannerApiSlice';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDeleteCategoryMutation } from '@/store/api/app/Category/categoryApiSlice';
import { useDeleteWishListMutation } from '@/store/api/app/WishList/wishListApiSlice';
import { useDeleteProductMutation } from '@/store/api/app/Product/productApiSlice';
import { useDeleteChildCategoryMutation } from '@/store/api/app/ChildCategory/childCategoryApiSlice';
import { useDeleteSubChildCategoryMutation } from '@/store/api/app/SubChildCategory/subChildCategoryApiSlice';
import { useDeleteSubCategoryMutation } from '@/store/api/app/SubCategory/subCategoryApiSlice';
import { useDeleteBrandMutation } from '@/store/api/app/Brand/categoryApiSlice';
import { useDeleteRoleMutation } from '@/store/api/app/Role/roleApiSlice';
import { useDeleteUserMutation } from '@/store/api/app/User/userApiSlice';
import { useDeleteWarehouseMutation } from '@/store/api/app/Warehouse/warehouseApiSlice';
import { useDeleteInventoryMutation } from '@/store/api/app/Inventory/inventoryApiSlice';
import { useDeleteOrderMutation } from '@/store/api/app/Order/orderApiSlice';

const useDelete = () => {
	const { pathname } = useLocation();
	const pathArray = pathname.split('/');

	let hook = null;

	if (pathArray.includes('banner')) {
		hook = useDeleteBannerMutation;
	} else if (pathArray.includes('category')) {
		hook = useDeleteCategoryMutation;
	} else if (pathArray.includes('wish-list')) {
		hook = useDeleteWishListMutation;
	} else if (pathArray.includes('product')) {
		hook = useDeleteProductMutation;
	} else if (pathArray.includes('sub-category')) {
		hook = useDeleteSubCategoryMutation;
	} else if (pathArray.includes('child-category')) {
		hook = useDeleteChildCategoryMutation;
	} else if (pathArray.includes('sub-child-category')) {
		hook = useDeleteSubChildCategoryMutation;
	} else if (pathArray.includes('brand')) {
		hook = useDeleteBrandMutation;
	} else if (pathArray.includes('role')) {
		hook = useDeleteRoleMutation;
	} else if (pathArray.includes('user')) {
		hook = useDeleteUserMutation;
	} else if (pathArray.includes('warehouse')) {
		hook = useDeleteWarehouseMutation;
	} else if (pathArray.includes('inventory')) {
		hook = useDeleteInventoryMutation;
	}else if (pathArray.includes('order')) {
		hook = useDeleteOrderMutation;
	}

	const [deleteRecord, { isLoading, isError, error, isSuccess }] = hook
		? hook()
		: [
			() => { },
			{
				isLoading: false,
				isError: false,
				error: null,
				isSuccess: false,
			},
		];

	const handleDelete = async (id) => {
		withReactContent(Swal)
			.fire({
				  title: 'Are you sure?',
  text: 'You will not be able to recover this record!',
  icon: 'warning',
	showCancelButton: true,
	confirmButtonText: 'Yes, delete it!',
	cancelButtonText: 'No, cancel!',
	reverseButtons: true,
	customClass: {
		confirmButton: 'swal2-confirm-theme',
		cancelButton: 'swal2-cancel-theme',
	},
			})
			.then(async (result) => {
				if (result.isConfirmed) {
					// Delete the record
					try {
						await deleteRecord(id);

						if (isError) {
							throw new Error(error?.message || 'Something went wrong!');
						}

						Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
					} catch (error) {
						console.log(error);
						Swal.fire('Failed!', 'Failed to delete the record.', 'error');
					}
				}
			});
	};

	return {
		handleDelete,
	};
};

export default useDelete;
