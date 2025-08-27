import { useState, useEffect } from "react";
// import { CheckIcon } from "@heroicons/react/solid"; // Importing the checkmark icon from Heroicons
import { GiCheckMark } from "react-icons/gi";
const ColorPicker = ({
    label = "Pick a color",
    defaultColor = "", // Set defaultColor to an empty string or null
    suggestedColors = [],
    register,
    setValue,
    name = "color",
}) => {
    // console.log("Color Picker", setValue);
    const [color, setColor] = useState(defaultColor);
    const [selectedColor, setSelectedColor] = useState(defaultColor); // Track the selected suggested color

    const handleColorChange = (e) => {
        const selectedColor = e.target.value;
        setValue(name, selectedColor);
        setColor(selectedColor);
        setSelectedColor(selectedColor);
        // Don't change selectedColor when a color is picked from the color picker
    };

    const handleSuggestedColorClick = (color) => {
        setValue(name, color);
        setColor(color);
        setSelectedColor(color); // Update selected color only when clicked from suggested colors
    };

    const isLightColor = (hex) => {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        return luminance > 128; // Threshold for light/dark
    };

    const textColor = isLightColor(selectedColor) ? "text-black" : "text-white";
    return (
        <div className="color-picker-component p-4">
            {label && (
                <label className="block text-sm font-medium mb-2">{label}</label>
            )}
            <div className="flex items-center gap-4">
                {/* Color Picker Input */}
                <input
                    type="color"
                    value={color || "#000000"} // Default fallback color if color is empty
                    onChange={handleColorChange}
                    className="w-12 h-12 cursor-pointer rounded"
                    {...(register ? register(name) : {})}
                />

                {/* Display Selected Color Code */}
                <div className="text-sm font-medium">
                    Selected Color: <span className="font-bold">{color}</span>
                </div>
            </div>

            {/* Suggested Colors */}
            {suggestedColors.length > 0 && (
                <div className="mt-4">
                    <h4 className="text-sm font-medium">Suggested Colors</h4>
                    <div className="flex gap-4">
                        {suggestedColors.map((suggestedColor) => (
                            <div
                                key={suggestedColor}
                                className="relative w-8 h-8 rounded-full cursor-pointer border border-black-500/30"
                                style={{ backgroundColor: suggestedColor }}
                                onClick={() => handleSuggestedColorClick(suggestedColor)}
                            >

                                {suggestedColor === selectedColor && (
                                    //   <GiCheckMark
                                    //     className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%]  bg-black/50 rounded-full p-1 text-[34px] text-stroke-1  text-stroke-[red]" // Tailwind classes
                                    //     // style={{ backgroundColor: "rgba(0,0,0,0.5)", borderRadius: "50%", }}
                                    //   />
                                    // {/* <GiCheckMark
                                    //   className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-1 text-3xl"
                                    //     //   style={{ backgroundColor: "rgba(0,0,0,0.5)", borderRadius: "50%", }}
                                    // />  */}
                                    <GiCheckMark
                                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 rounded-full p-1 text-3xl ${textColor} `}
                                    />

                                )}

                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ColorPicker;

