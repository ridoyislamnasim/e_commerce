

// import Switch from "@/components/ui/switchCheck";
// import Card from '@/components/ui/Card';
// const SelectRolePermission = ({
//     label,
//     error,
//     required = false,
//     control,
//     setState,
//     setItem,
//     state,
//     defaultValue,
//     isMarked,
//     isDisabled,
//     className = '',
//     name,
// }) => {
//     console.log("default value", defaultValue)

//     const permissionItems = [
//         { value: 'banner', label: 'Banner Permission' },
//         { value: 'subChildCategory', label: 'Sub Child Category Permission' },
//         { value: 'product', label: 'product Permission' },
//         { value: 'aboutUs', label: 'About Us Permission' },
//     ];

//     return (
//         <div className={className}>
//             <Card title="Role Permission">
//                 <div className="flex flex-wrap   gap-5 pb-5">
//                     {permissionItems?.map((item, index) => (
//                         <div className=" pt-4 pr-5 gap-5">
//                             <span className="text-lg font-semibold pb-5">{item.label}</span>
//                             <div className="flex flex-wrap pt-4   gap-5">
//                                 <Switch
//                                     control={control}
//                                     name={`permissionsUpdates.${item.value}.access`}
//                                     label="Access Control"
//                                     // defaultChecked={data?.status}
//                                     defaultChecked={defaultValue?.[item.value]?.access || false}
//                                     badge
//                                     prevIcon="heroicons-outline:lock-closed"
//                                     nextIcon="heroicons-outline:lock-open"
//                                     activeClass="bg-green-500"
//                                 />
//                                 <Switch
//                                     control={control}
//                                     name={`permissionsUpdates.${item.value}.create`}
//                                     label="Create Permission"
//                                     // defaultChecked={data?.status}
//                                     badge
//                                     prevIcon="heroicons-outline:lock-closed"
//                                     nextIcon="heroicons-outline:lock-open"
//                                     activeClass="bg-green-500"
//                                 />
//                                 <Switch
//                                     control={control}
//                                     name={`permissionsUpdates.${item.value}.edit`}
//                                     label="Edit Permission"
//                                     // defaultChecked={data?.status}
//                                     badge
//                                     prevIcon="heroicons-outline:lock-closed"
//                                     nextIcon="heroicons-outline:lock-open"
//                                     activeClass="bg-green-500"
//                                 />
//                                 <Switch
//                                     control={control}
//                                     name={`permissionsUpdates.${item.value}.delete`}
//                                     label="Delete Permission"
//                                     // defaultChecked={data?.status}
//                                     badge
//                                     prevIcon="heroicons-outline:lock-closed"
//                                     nextIcon="heroicons-outline:lock-open"
//                                     activeClass="bg-green-500"
//                                 />
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </Card>
//         </div>
//     );
// };

// export default SelectRolePermission;


import Switch from "@/components/ui/switchCheck";
import Card from "@/components/ui/Card";

const SelectRolePermission = ({
    label,
    error,
    required = false,
    control,
    setState,
    setItem,
    state,
    defaultValue = {},
    isMarked,
    isDisabled,
    className = '',
    name,
}) => {
    const permissionItems = [
        { value: 'aboutUs', label: 'About Us Permission' },
        { value: 'banner', label: 'Banner Permission' },
        { value: 'category', label: 'Category Permission' },
        { value: 'subCategory', label: 'Sub Category Permission' },
        { value: 'chilsCategory', label: 'Sub Child Category Permission' },
        { value: 'subChilsCategory', label: 'Sub Child Category Permission' },
        { value: 'brand', label: 'Brand Permission' },
        { value: 'product', label: 'Product Permission' },
        { value: 'wishlist', label: 'Wishlist Permission' },
        { value: 'coupon', label: 'Coupon Permission' },
        { value: 'inventory', label: 'Inventory Permission' },
        { value: 'order', label: 'Order Permission' },
        { value: 'shippingMethod', label: 'Shipping Method Permission' },
        { value: 'paymentService', label: 'Payment Service Permission' },
        { value: 'contactInfo', label: 'Contact Info Permission' },
        { value: 'user', label: 'User Permission' },

    ];

    const getDefaultChecked = (permission, action) => {
        return defaultValue[permission]?.[action] || false;
    };

    return (
        <div className={className}>
            <Card title="Role Permission">
                <div className="flex flex-wrap  gap-5 pb-5">
                    {permissionItems.map((item, index) => (
                        <div key={index} className="pt-4 pr-5 w-80 gap-5">
                            <span className="text-lg font-semibold pb-5">{item.label}</span>
                            <div className="flex flex-wrap lg:w-48 pt-4 gap-5">
                                {['access', 'create', 'edit', 'delete'].map((action) => (
                                    <Switch
                                        key={action}
                                        control={control}
                                        name={`permissions.${item.value}.${action}`}
                                        label={`${action.charAt(0).toUpperCase() + action.slice(1)} Permission`}
                                        defaultChecked={getDefaultChecked(item.value, action)}
                                        badge
                                        prevIcon="heroicons-outline:lock-closed"
                                        nextIcon="heroicons-outline:lock-open"
                                        activeClass="bg-green-500"
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default SelectRolePermission;

