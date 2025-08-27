import React, { useEffect, useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

import type { FieldValues } from "react-hook-form";

import type { Path } from "react-hook-form";
import { TProduct } from "@/types/shared";

type FormValues = {
  categoryRefId: string;
  // other fields...
};

type FormDropdownProps<T extends FieldValues> = {
  name: Path<T>; // Use only Path<T> to ensure compatibility with react-hook-form
  control: any;
  data: any;
  placeholder?: string;
  rules?: any;
  onChange?: (value: string) => void;
  defaultSelectedValue?: string | undefined;
};

export const FormDropdown = <T extends FieldValues>({
  data,
  placeholder = "Select an option",
  control,
  name,
  rules,
  onChange: onChangeProp,
  defaultSelectedValue,
}: FormDropdownProps<T>) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController<T>({ control, name, rules });
  // console.log("FormDropdown defaultSelectedValue:", defaultSelectedValue); // Log the value for debugging

  const [selectedValue, setSelectedValue] = useState<string>(value || String(defaultSelectedValue) || "");

  useEffect(() => {
    // Update selected value when the value changes externally (e.g., during updates)
    if (value) {
      setSelectedValue(value);
    } else if (!selectedValue && defaultSelectedValue) {
      setSelectedValue(String(defaultSelectedValue));
      onChange(String(defaultSelectedValue)); // Update react-hook-form state
      if (onChangeProp) {
        onChangeProp(defaultSelectedValue); // Call parent onChange callback
      }
    }
  }, [value, defaultSelectedValue]);

  useEffect(() => {
    // Update selected value when defaultSelectedValue changes
    if (defaultSelectedValue && defaultSelectedValue !== selectedValue) {
      setSelectedValue(String(defaultSelectedValue));
      onChange(defaultSelectedValue); // Update react-hook-form state
      if (onChangeProp) {
        onChangeProp(defaultSelectedValue); // Call parent onChange callback
      }
    }
  }, [defaultSelectedValue]);

  const handleChange = (newValue: string) => {
    setSelectedValue(newValue);
    onChange(newValue); // Update react-hook-form state
    if (onChangeProp) {
      onChangeProp(newValue); // Call parent onChange callback
    }
  };
  // console.log("Selected Value:", selectedValue); // Log the selected value for debugging
  // console.log("Selected Value:",typeof selectedValue); // Log the selected value for debugging
  // console.log("Data in react hook form dropdown:", data); // Log the data to ensure it's being passed correctly

  const selectedName = Array.isArray(data)
    ? data.find((item) => item.id === String(selectedValue))?.name || ""
    : "";
  // console.log("Selected Name:", selectedName); // Log the selected name for debugging

  return (
    <div>
      <Select onValueChange={handleChange} value={selectedValue}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder}>{selectedName || placeholder}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {Array.isArray(data) &&
            data.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-sm">{error.message}</p>} {/* Display validation error */}
    </div>
  );
};
