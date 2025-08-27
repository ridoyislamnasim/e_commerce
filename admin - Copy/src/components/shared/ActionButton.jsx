import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import React from "react";
import { Link } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import deleteContent from "@/hooks/deleteContent";

const ActionButton = ({
    setOpenView,
    editLink,
    setId,
    id,
    endpoint,
    notEdit,
    notDelete,
    notView,
    notLogin
}) => {
    const handleOpenview = () => {

        setOpenView(true);
        setId(id);
    };
    return (
        <div>
            <div className="md:w-[150px]">
                {
                    !notView && (
                        <button className="bg-[#6c757d] border border-[#6c757d] text-white py-1.5 px-3 rounded-[5px] mr-2 mb-1" onClick={handleOpenview}>
                            <BsEyeFill />
                        </button>
                    )
                }
                {
                    !notLogin && (
                        <button className="bg-[#28a745] border border-[#6c757d] text-white py-1.5 px-3 rounded-[5px] mr-2 mb-1">
                            <IoMdLogIn />
                        </button>
                    )
                }

                {!notEdit && (
                    <button className="bg-[#28a745] border border-[#28a745] text-white py-1.5 px-3 rounded-[5px]  mr-2 mb-1" onClick={() => setId(id)}>
                        <Link to={`${editLink}/${id}`}>
                            <BiEdit />
                        </Link>
                    </button>
                )}

                {!notDelete && (
                    <button className="bg-[#c82333] border border-[#c82333] text-white py-1.5 px-3 rounded-[5px] mr-2 mb-1" onClick={() => deleteContent(id, endpoint)}>
                        <AiFillDelete />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ActionButton;
