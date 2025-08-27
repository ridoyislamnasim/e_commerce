import React, { useEffect } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import ColorPicker from "./ColorPicker";
import FormRepeaterAgain from "./formRepeaterAgain";

const FormRepeater = ({
  register,
  control,
  level = false,
  color = false,
  error,
  setValue,
  defaultValue = [], // Default value is an array
}) => {
  // console.log("FormRepeater defaultValue", defaultValue);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "inventoryArray",
  });

  // Append default values to the fields array when the component mounts
  useEffect(() => {
    if (defaultValue && defaultValue.length > 0) {
      // Clear existing fields
      remove(); // Remove all existing fields
      // Append default values
      console.log("-------", defaultValue[0].levelOptions)
      defaultValue.forEach((item, index) => {
        append({
          color: item.color || "",
          level: item?.levelOptions[index]?.level || "",
          quantity: item.quantity || "",
          colorCode: item.colorCode || "#000000", // Default color code
          levelOptions: item.levelOptions || [], // For nested repeater
        });
      });
    }
  }, [defaultValue, append, remove]);

  return (
    <div>
      <Card
        title="Repeating Forms"
        headerslot={
          <Button
            text="Add new"
            icon="heroicons-outline:plus"
            className="btn-dark"
            onClick={() => append({ color: "", level: "", quantity: "", colorCode: "#000000" })}
          />
        }
      >
        {fields.map((item, index) => (
          <div
            className="flex flex-col lg:flex-row gap-5 mb-5 pb-2 last:mb-0"
            key={item.id} // Use item.id for the key
          >
            {level && !color && (
              <div>
                <Textinput
                  label="Level"
                  type="text"
                  id={`level${index}`}
                  placeholder="Level"
                  register={register}
                  name={`inventoryArray[${index}].level`}
                  required={true}
                // error={error?.inventoryArray?.[index]?.level}
                />
              </div>
            )}
            {color && (
              <div className="">
              <Textinput
                label="Color"
                type="text"
                id={`color${index}`}
                placeholder="Color"
                register={register}
                name={`inventoryArray[${index}].color`}
                required={true}
                error={error?.inventoryArray?.[index]?.color}
              />
              <ColorPicker
                label="Pick a Category Color"
                defaultColor={item.colorCode || "#000000"}
                setValue={setValue}
                suggestedColors={[
                  "#797E72",
                  "#FFF3FF",
                  "#FFFCEB",
                  "#FEEFEA",
                  "#E7EAF2",
                  "#282828",
                  "#FFFFFF",
                ]}
                name={`inventoryArray[${index}].colorCode`}
              />
              </div>
            )}


            <div className="flex w-full items-top space-x-5">

               <div className={`w-full  ${ (color && level) ? ' ' : level ? 'gap-5 flex  nasim' : ''}  `}>
                 {/* level */}
                 {(color && level) && (
                <Textinput
                  label="Level"
                  type="text"
                  id={`level${index}`}
                  placeholder="Level"
                  register={register}
                  name={`inventoryArray[${index}].level`}
                  required={true}
                  error={error?.inventoryArray?.[index]?.level}
                />
              ) }
                  <Textinput
                    label="Quantity"
                    type="number"
                    id={`quantity${index}`}
                    placeholder="Quantity"
                    register={register}
                    name={`inventoryArray[${index}].quantity`}
                    required={true}
                    error={error?.inventoryArray?.[index]?.quantity}
                  />
                  
              {/* mrpPrice and costPrice */}

                   <Textinput
                  label="MRP Price"
                  type="number"
                  id={`mrpPrice${index}`}
                  placeholder="MRP Price"
                  register={register}
                  name={`inventoryArray[${index}].mrpPrice`}
                  required={true}
                  error={error?.inventoryArray?.[index]?.mrpPrice}
                />
                <Textinput
                  label="Cost Price"
                  type="number"
                  id={`costPrice${index}`}
                  placeholder="Cost Price"
                  register={register}
                  name={`inventoryArray[${index}].costPrice`}
                  required={true}
                  error={error?.inventoryArray?.[index]?.costPrice}
                />
                  {/* <div className="mt-3"> */}
                  {/* <Textinput
                    label="Barcode"
                    type="text"
                    id={`barcode${index}`}
                    placeholder="Barcode"
                    register={register}
                    name={`inventoryArray[${index}].barcode`}
                  // required={true}
                  // error={error?.inventoryArray?.[index]?.barcode}
                  /> */}
                  {/* </div> */}
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
      </Card>
    </div>
  );
};

export default FormRepeater;