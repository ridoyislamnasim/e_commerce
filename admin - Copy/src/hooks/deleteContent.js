// hooks.js

import { useEffect, useRef, useState } from "react";
import { mutate } from "swr";
import { toast } from "react-toastify";

// export const useSliderDelete = (apiUrl) => {
const deleteContent = async (id, endpoint) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/${endpoint}/${id}`,
            {
                method: "DELETE",
            }
        );

        if (response.ok) {
            const deletedData = await response.json();
            toast.success(deletedData?.message);
            mutate(`${import.meta.env.VITE_API_URL}/${endpoint}`);
        } else {
            const deletedData = await response.json();
            toast.error(deletedData?.message);
        }
    } catch (error) {
        console.error("Error deleting slider:", error);
    }
};

//   return { deleteSlider };
// };

export default deleteContent;
