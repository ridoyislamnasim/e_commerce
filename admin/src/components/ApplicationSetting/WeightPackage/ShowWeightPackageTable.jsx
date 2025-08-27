import ActionButton from "@/components/shared/ActionButton";
import React from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

const ShowWeightPackageTable = ({
    tableTitle1,
    tableTitle2,
    tableTitle3,
    tableTitle4,
    tableTitle5,
    sliderContent,
    editLink,
    setOpenView,
    setId
}) => {
    return (
        <>
            <table class="w-full mt-2 border border-gray-400">
                <thead>
                    <tr class="bg-gray-100 text-center">
                        <th class="border-r border-gray-400 px-4 py-2">
                            <div className="flex   items-center">
                                <span>SL</span>
                                <div className="flex justify-between items-center">
                                    <AiOutlineArrowUp className="text-[10px] cursor-pointer" />
                                    <AiOutlineArrowDown className="text-[10px] cursor-pointer" />
                                </div>
                            </div>
                        </th>
                        {tableTitle1 && (
                            <th class="border-r border-gray-400 px-4 py-2">
                                <div className="flex   items-center">
                                    <span>{tableTitle1}</span>
                                    <div className="flex justify-between items-center">
                                        <AiOutlineArrowUp className="text-[10px] cursor-pointer" />
                                        <AiOutlineArrowDown className="text-[10px] cursor-pointer" />
                                    </div>
                                </div>
                            </th>
                        )}
                        {tableTitle2 && (
                            <th class="border-r border-gray-400 px-4 py-2">
                                <div className="flex   items-center">
                                    <span>{tableTitle2}</span>
                                    <div className="flex justify-between items-center">
                                        <AiOutlineArrowUp className="text-[10px] cursor-pointer" />
                                        <AiOutlineArrowDown className="text-[10px] cursor-pointer" />
                                    </div>
                                </div>
                            </th>
                        )}
                        {tableTitle3 && (
                            <th class="border-r border-gray-400 px-4 py-2">
                                <div className="flex   items-center">
                                    <span>{tableTitle3}</span>
                                    <div className="flex justify-between items-center">
                                        <AiOutlineArrowUp className="text-[10px] cursor-pointer" />
                                        <AiOutlineArrowDown className="text-[10px] cursor-pointer" />
                                    </div>
                                </div>
                            </th>
                        )}
                        {tableTitle4 && (
                            <th class="border-r border-gray-400 px-4 py-2">
                                <div className="flex   items-center">
                                    <span>{tableTitle4}</span>
                                    <div className="flex justify-between items-center">
                                        <AiOutlineArrowUp className="text-[10px] cursor-pointer" />
                                        <AiOutlineArrowDown className="text-[10px] cursor-pointer" />
                                    </div>
                                </div>
                            </th>
                        )}
                        {tableTitle5 && (
                            <th class="border-r border-gray-400 px-4 py-2">
                                <div className="flex   items-center">
                                    <span>{tableTitle5}</span>
                                    <div className="flex justify-between items-center">
                                        <AiOutlineArrowUp className="text-[10px] cursor-pointer" />
                                        <AiOutlineArrowDown className="text-[10px] cursor-pointer" />
                                    </div>
                                </div>
                            </th>
                        )}
                        <th class="border-r border-gray-400 px-4 py-2">
                            <div className="flex   items-center">
                                <span>Status</span>
                                <div className="flex justify-between items-center">
                                    <AiOutlineArrowUp className="text-[10px] cursor-pointer" />
                                    <AiOutlineArrowDown className="text-[10px] cursor-pointer" />
                                </div>
                            </div>
                        </th>

                        <th class="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sliderContent?.map((content, index) => (
                        <tr class="bg-gray-200 text-center border-b border-gray-400">
                            <td class="border-r border-gray-400 px-4 py-2">{index + 1}</td>

                            <td class="border-r border-gray-400 px-4 py-2">
                                {content?.wp_id}
                            </td>
                            <td class="border-r border-gray-400 px-4 py-2">
                                {content?.name}
                            </td>
                            <td class="border-r border-gray-400 px-4 py-2">
                                {content?.weight_type}
                            </td>
                            <td class="border-r border-gray-400 px-4 py-2">
                                {content?.title}
                            </td>
                            <td class="border-r border-gray-400 px-4 py-2">
                                {content?.rate}
                            </td>

                            <td class="border-r border-gray-400 px-4 py-2">
                                <button
                                    className={`${content?.status === 1 ? "text-green-600" : "text-red-600"
                                        } cursor-pointer`}
                                    onClick={() =>
                                        updateStatus(content?.status, content?.id, "weight-packages")
                                    }
                                >
                                    {content?.status === 1 ? "Active" : "Inactive"}
                                </button>
                            </td>
                            <td class="px-4 py-2">
                                <ActionButton setOpenView={setOpenView} notLogin={true} editLink={editLink} id={content?.id} setId={setId} endpoint="weight-packages" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default ShowWeightPackageTable;
