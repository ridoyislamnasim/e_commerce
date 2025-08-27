// hooks.js

import { useEffect, useRef, useState } from "react";
import { mutate } from "swr";
import { toast } from "react-toastify";

// export const useSliderDelete = (apiUrl) => {
const editContent = async (newData, endpoint, id, setIsLoading, accessToken) => {
    try {
        setIsLoading(true);
        const response = await fetch(
            `${import.meta.env.VITE_LOCAL_API_URL}/${endpoint}/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json", // Assuming the API accepts JSON
                    Authorization: `${accessToken}`
                },
                body: JSON.stringify(newData),
            }
        );
        console.log("response", response);
        const data = await response.json();
        console.log("data", data);
        if (response.ok) {
            toast.success(data?.message);
            setIsLoading(false);
        } else {
            toast.error(data?.message || "Failed to add content");
            setIsLoading(false);
        }
    } catch (error) {
        console.error("Error deleting slider:", error);
        setIsLoading(false);
    }
};

//   return { deleteSlider };
// };

export default editContent;
