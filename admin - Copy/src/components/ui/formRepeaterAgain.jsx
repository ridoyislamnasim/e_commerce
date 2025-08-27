import React, { useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { useFieldArray } from "react-hook-form";

const FormRepeaterAgain = ({
  register,
  control,
  error,
  parentIndex,
  defaultValue = [], // Add defaultValue prop
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `inventoryArray[${parentIndex}].colorLevel`,
  });

  // Initialize fields with default values
  useEffect(() => {
    if (defaultValue && defaultValue.length > 0) {
      // Clear existing fields
      remove();
      // Append default values
      defaultValue.forEach((item) => {
        append({
          level: item.level || "",
          quantity: item.quantity || "",
        });
      });
    }
  }, [defaultValue, append, remove]);

  return (
    <div className="mt-4">
      <Button
        text="Add Level & Qty"
        icon="heroicons-outline:plus"
        className="btn-dark mb-4"
        onClick={() => append({ level: "", quantity: "" })}
      />
      {fields.map((item, index) => (
        <div
          className="flex flex-col lg:flex-row gap-5 mb-5 pb-2 last:mb-0"
          key={item.id}
        >
          <div className="flex w-full items-top space-x-5">
            <div className="w-full">
              <Textinput
                label="Level"
                type="text"
                placeholder="Level"
                register={register}
                name={`inventoryArray[${parentIndex}].colorLevel[${index}].level`}
                required={true}
                error={
                  error?.inventoryArray?.[parentIndex]?.colorLevel?.[index]?.level
                }
              />
              <Textinput
                label="Quantity"
                type="number"
                placeholder="Quantity"
                register={register}
                name={`inventoryArray[${parentIndex}].colorLevel[${index}].quantity`}
                required={true}
                error={
                  error?.inventoryArray?.[parentIndex]?.colorLevel?.[index]
                    ?.quantity
                }
              />
              <Textinput
                    label="Barcode"
                    type="text"
                    placeholder="Barcode"
                    register={register}
                    name={`inventoryArray[${parentIndex}].colorLevel[${index}].barcode`}
                    // required={true}
                    // error={error?.inventoryArray?.[parentIndex]?.colorLevel?.[index]
                    //   ?.barcode}
                  />
            </div>
            <div className="flex-none relative top-7">
              <button
                onClick={() => remove(index)}
                type="button"
                className="inline-flex items-center justify-center h-10 w-10 bg-danger-500 text-lg border rounded border-danger-500 text-white"
              >
                <Icon icon="heroicons-outline:trash" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormRepeaterAgain;