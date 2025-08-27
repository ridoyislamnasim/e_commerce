// hooks.js

import { useEffect, useRef, useState } from "react";
import { mutate } from "swr";
import { toast } from "react-toastify";

// export const useSliderUpdate = (apiUrl) => {
const updateStatus = async (status, sliderId, endpoint) => {
    if (status === 0 || status === false) {
        status = 1;
    } else {
        status = 0;
    }
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL
            }/${endpoint}/${sliderId}/status?status=${status}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.ok) {
            const updatedData = await response.json();
            console.log("status ", updatedData);
            mutate(`${import.meta.env.VITE_API_URL}/${endpoint}`);
            mutate(`${import.meta.env.VITE_API_URL}/${endpoint}/${sliderId}`);
            toast.success(updatedData?.message);
        } else {
            const updatedData = await response.json();
            toast.error(updatedData?.message);
        }
    } catch (error) {
        console.error("Error updating status:", error);
    }
};

//   return { updateStatus };
// };

export default updateStatus;
