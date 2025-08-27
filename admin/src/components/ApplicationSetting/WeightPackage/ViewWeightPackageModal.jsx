import React from "react";

const ViewWeightPackageModal = ({ singleWeightPackage }) => {
    console.log(singleWeightPackage);
    return (
        <div>
            <table className="w-full">
                <tbody>
                    <tr className="border-b border-gray-400 w-full">
                        <th className="text-left w-[150px]">Status</th>
                        <td
                            className={`${singleWeightPackage?.status === 1 ? "text-green-600" : "text-red-600"
                                } cursor-pointer`}
                        >
                            {singleWeightPackage?.status === 1 ? "Active" : "Inactive"}
                        </td>
                    </tr>

                    <tr className="border-b border-gray-400 w-full">
                        <th className="text-left w-[150px]">ID</th>
                        <td>{singleWeightPackage?.wp_id}</td>
                    </tr>
                    <tr className="border-b border-gray-400 w-full">
                        <th className="text-left w-[150px]">Name</th>
                        <td>{singleWeightPackage?.name}</td>
                    </tr>
                    <tr className="border-b border-gray-400 w-full">
                        <th className="text-left w-[150px]">Title</th>
                        <td>{singleWeightPackage?.title}</td>
                    </tr>
                    <tr className="border-b border-gray-400 w-full">
                        <th className="text-left w-[150px]">Weight Type</th>
                        <td>{singleWeightPackage?.weight_type}</td>
                    </tr>
                    <tr className="border-b border-gray-400 w-full">
                        <th className="text-left w-[150px]">Details</th>
                        <td>{singleWeightPackage?.details}</td>
                    </tr>
                    <tr className="border-b border-gray-400 w-full">
                        <th className="text-left w-[150px]">Rate</th>
                        <td>{singleWeightPackage?.rate}</td>
                    </tr>

                </tbody>
            </table>
        </div>
    );
};

export default ViewWeightPackageModal;
