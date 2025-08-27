// import { useUpdateAreaStatusMutation } from '@/store/api/app/ApplicationSetting/Area/areaApiSlice';
// import { useUpdateDistrictStatusMutation } from '@/store/api/app/ApplicationSetting/District/districtApiSlice';
// import { useUpdateServiceAreaWeightPackageMutation, useUpdateServiceAreaWeightPackageStatusMutation } from '@/store/api/app/ApplicationSetting/ServiceAreaWeightPackage/serviceAreaWeightPackageApiSlice';
// import { useUpdateServiceTypeStatusMutation } from '@/store/api/app/ApplicationSetting/ServiceTypeApiSlice';
// import { useUpdateItemTypeStatusMutation } from '@/store/api/app/ApplicationSetting/itemTypeApiSlice';
// import { useUpdateServiceAreaStatusMutation } from '@/store/api/app/ApplicationSetting/serviceAreaApiSlice';
// import { useUpdateWeightTypeStatusMutation } from '@/store/api/app/ApplicationSetting/weightPackagesApiSlice';
// import { useUpdateNoticeStatusMutation } from '@/store/api/app/Notice/noticeApiSlice';



// import { useUpdateExpenseStatusMutation, useUpdateExpensesStatusMutation } from '@/store/api/app/accountsPanel/Income&expense/expense/expenseApiSlice';
// import { useUpdateExpenseHeadsStatusMutation } from '@/store/api/app/accountsPanel/Income&expense/expenseHead/expenseHeadApiSlice';
// import { useUpdateStaffStatusMutation } from '@/store/api/app/accountsPanel/staff/staffApiSlice';
// import { useDeleteStaffPaymentMutation, useUpdateStaffPaymentMutation } from '@/store/api/app/accountsPanel/staffPayment/staffPaymentApiSlice';
// import { useUpdateBlogStatusMutation } from '@/store/api/app/website/blog/blogApiSlice';
// import { useUpdateCustomerFeedbackStatusMutation } from '@/store/api/app/website/customerFeedback/customerFeedbackApiSlice';
// import { useUpdateDeliveryServiceStatusMutation } from '@/store/api/app/website/deliveryService/deliveryServiceApiSlice';
// import { useUpdateDesignationStatusMutation } from '@/store/api/app/website/designation/designationApiSlice';
// import { useUpdateFeatureStatusMutation } from '@/store/api/app/website/feature/featureApiSlice';
// import { useUpdateFrequentlyAskQuestionStatusMutation } from '@/store/api/app/website/frequentlyAskQuestion/frequentlyAskQuestionApiSlice';
// import { useUpdateNewsLetterStatusMutation } from '@/store/api/app/website/newsLetter/newsLetterApiSlice';
// import { useUpdateObjectiveStatusMutation } from '@/store/api/app/Category/categoryApiSlice';
// import {
// 	useUpdateOfficesStatusMutation
// } from '@/store/api/app/website/offices/officesApiSlice';
// import { useUpdatePageContentStatusMutation } from '@/store/api/app/website/pageContent/pageContentApiSlice';
// import { useUpdateParcelStepStatusMutation } from '@/store/api/app/website/parcelStep/parcelStepApiSlice';
// import { useUpdatePartnerStatusMutation } from '@/store/api/app/website/partner/partnerApiSlice';
// import { useUpdateSliderStatusMutation } from '@/store/api/app/website/banner/bannerApiSlice';
// import { useUpdateSocilLinkStatusMutation } from '@/store/api/app/website/socialLink/socialLinkApiSlice';
// import { useUpdateTeamMemberStatusMutation } from '@/store/api/app/website/teamMember/teamMemberApiSlice';
// import { useUpdateVisitorMessagessStatusMutation } from '@/store/api/app/website/visitorMessages/visitorMessagesApiSlice';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Status = ({ id, status }) => {
	const { pathname } = useLocation();
	const pathArray = pathname.split('/');

	let hook = null;

	if (pathArray.includes('banner')) {
		// hook = useUpdateSliderStatusMutation;
	} else if (pathArray.includes('designation')) {
		hook = useUpdateDesignationStatusMutation;
	} else if (pathArray.includes('offices')) {
		hook = useUpdateOfficesStatusMutation;
	} else if (pathArray.includes('branch')) {
		hook = useUpdateBranchStatusMutation;
	} else if (pathArray.includes('branch-users')) {
		hook = useUpdateBranchUserStatusMutation;
	} else if (pathArray.includes('merchant')) {
		hook = useUpdateMerchantStatusMutation;
	} else if (pathArray.includes('rider')) {
		hook = useUpdateRiderStatusMutation;
	} else if (pathArray.includes('teamMember')) {
		hook = useUpdateTeamMemberStatusMutation;
	} else if (pathArray.includes('partner')) {
		hook = useUpdatePartnerStatusMutation;
	} else if (pathArray.includes('customerFeedback')) {
		hook = useUpdateCustomerFeedbackStatusMutation;
	}
	// else if (pathArray.includes('objective')) {
	// 	hook = useUpdateObjectiveStatusMutation;
	// } 
	else if (pathArray.includes('deliveryService')) {
		hook = useUpdateDeliveryServiceStatusMutation;
	} else if (pathArray.includes('feature')) {
		hook = useUpdateFeatureStatusMutation;
	} else if (pathArray.includes('blog')) {
		hook = useUpdateBlogStatusMutation;
	} else if (pathArray.includes('socialLink')) {
		hook = useUpdateSocilLinkStatusMutation;
	} else if (pathArray.includes('parcelStep')) {
		hook = useUpdateParcelStepStatusMutation;
	} else if (pathArray.includes('pageContent')) {
		hook = useUpdatePageContentStatusMutation;
	} else if (pathArray.includes('visitor-messages')) {
		hook = useUpdateVisitorMessagessStatusMutation;
	} else if (pathArray.includes('news-letter')) {
		hook = useUpdateNewsLetterStatusMutation;
	} else if (pathArray.includes('service-area')) {
		hook = useUpdateServiceAreaStatusMutation;
	} else if (pathArray.includes('weight-package')) {
		hook = useUpdateWeightTypeStatusMutation;
	} else if (pathArray.includes('service-type')) {
		hook = useUpdateServiceTypeStatusMutation;
	} else if (pathArray.includes('item-type')) {
		hook = useUpdateItemTypeStatusMutation;
	} else if (pathArray.includes('district')) {
		hook = useUpdateDistrictStatusMutation;
	} else if (pathArray.includes('area')) {
		hook = useUpdateAreaStatusMutation;
	} else if (pathArray.includes('notice')) {
		hook = useUpdateNoticeStatusMutation;
	}
	else if (pathArray.includes('weight-custom-charge')) {
		hook = useUpdateServiceAreaWeightPackageStatusMutation;
	}
	else if (pathArray.includes('staff')) {
		hook = useUpdateStaffStatusMutation;
	}
	else if (pathArray.includes('expence')) {
		hook = useUpdateExpenseStatusMutation;
	}
	else if (pathArray.includes('expenceHead')) {
		hook = useUpdateExpenseHeadsStatusMutation;
	}
	else if (pathArray.includes('staffPayment')) {
		hook = useDeleteStaffPaymentMutation;
	}

	const [updateStatus, { isLoading, isError, error, isSuccess }] = hook
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

	const handleToggleStatus = async () => {
		try {
			const newStatus = status ? 0 : 1;

			await updateStatus({
				id,
				status: newStatus,
			});

			toast.success('Status updated successfully');
		} catch (error) {
			console.log(error);
			toast.error('Failed to update status');
		}
	};

	return (
		<span className="block w-full">
			<span
				onClick={handleToggleStatus}
				className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 cursor-pointer ${status
					? 'text-success-500 bg-success-500'
					: 'text-danger-500 bg-danger-500'
					} 
       `}
			>
				{status ? 'Active' : 'Inactive'}
			</span>
		</span>
	);
};

export default Status;
