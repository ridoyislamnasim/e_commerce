import React, { useEffect, useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Textarea from '@/components/ui/Textarea';
import Icon from "@/components/ui/Icon";
import { useFieldArray, useWatch } from "react-hook-form";
import SelectProductInventory from "../shared/Select/SelectProductInventory";

const OrderFormRepeater = ({
  header = "Repeating Forms",
  register,
  control,
  error,
  defaultValue = [],
  watch,
}) => {
  const [selectProduct, setSelectProduct] = useState([]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "order",
  });

  const watchedFields = useWatch({
    control,
    name: "order",
  });
  const watchedPayment = useWatch({
    control,
    name: "payment",
  });
  const paymentValue = watch("payment");
  const selectedInventory = useWatch({
    control,
    name: "selectedInventory",
  });
  console.log("selectedInventory ", selectedInventory);

  useEffect(() => {
    if (defaultValue?.length > 0) {
      defaultValue.forEach((item) =>
        append({
          inventoryID: item.inventoryID || "",
          quantity: item.quantity || "1",
          discount: item.discount || "0",
        })
      );
    }
  }, []);

  useEffect(() => {
    // if (selectedInventory) {
    // Find the product that matches the selectedInventory
    const selectedProduct = selectProduct?.find(
      (product) => product.id === selectedInventory
    );
    //     console.log("selectProduct",selectedInventory, selectProduct);
    // console.log('Product is already in the order list', selectedProduct);
    // If the product is found and not already added to the order
    if (selectedProduct) {
      const existingProduct = watchedFields?.find(
        (item) => item.inventoryID === selectedInventory
      );
      // console.log("Product is watchedFields", watchedFields)
      // console.log("Product is already", existingProduct)
      if (!existingProduct) {
        append({
          inventoryID: selectedInventory,
          name: selectedProduct?.name,  // Dynamically set the name
          price: selectedProduct?.mrpPrice, // Dynamically set the price
          quantity: "1",               // Default quantity
          discount: selectedProduct?.mrpPrice- selectedProduct?.price,                // Default discount
        });
      } else {
        console.log("Product is already in the order list.");
      }
    } else {
      console.log("Product not found in selectProduct list.");
    }
    // }
  }, [append, watchedFields, selectProduct]); // Dependencies updated to include selectProduct


  // Calculate totals efficiently
  const totals = useMemo(() => {
    if (!watchedFields || watchedFields?.length === 0) {
      return { quantity: 0, discount: 0, price: 0 };
    }
    return watchedFields?.reduce(
      (acc, item, index) => {
        const quantity = parseFloat(item?.quantity) || 0;
        const discount = parseFloat(item?.discount) || 0;
        const mrpPrice = selectProduct[index]?.mrpPrice || 0;
        acc.quantity += quantity;
        acc.discount += discount * quantity;
        acc.price += quantity * mrpPrice - (discount * quantity);
        return acc;
      },
      { quantity: 0, discount: 0, price: 0 }
    );
  }, [watchedFields, paymentValue]);

  // Handle removing item from order and selectProduct
  const handleRemove = (index) => {
    // Remove from fields (order)
    remove(index);

    // Remove from selectProduct array
    setSelectProduct((prevState) => {
      const newSelectProduct = [...prevState];
      newSelectProduct.splice(index, 1); // Remove the product at the same index
      return newSelectProduct;
    });
  };



  return (
    <div>
      <Card
        title={header}
        headerslot={
          <div className="flex w-64">
            <SelectProductInventory
              className="w-full"
              label="Select Product Inventory"
              control={control}
              name="selectedInventory"
              selectProduct={selectProduct}
              setSelectProduct={setSelectProduct} // Pass down state setter
            />
          </div>
        }
      >
        {fields.map((item, index) => (
          <div
            className="flex flex-col lg:flex-row gap-5 mb-5 pb-2 last:mb-0"
            key={item.id}
          >
            <div className="flex w-full items-top space-x-5">
              <div className="w-full flex flex-col lg:flex-row gap-5 ">
                <Textinput
                  label="Name"
                  type="text"
                  placeholder="Name"
                  register={register}
                  name={`order[${index}].name`}
                  disabled={true}
                // required={true}
                // error={error?.order?.[index]?.name}
                />
                <Textinput
                  label="Price"
                  type="number"
                  placeholder="Price"
                  register={register}
                  name={`order[${index}].price`}
                  disabled={true}
                // required={true}
                // error={error?.order?.[index]?.price}
                />
                <Textinput
                  label="Quantity"
                  type="text"
                  placeholder="Quantity"
                  register={register}
                  name={`order[${index}].quantity`}
                  defaultValue={item.name || ""}
                  required={true}
                  error={error?.order?.[index]?.quantity}
                />

                <Textinput
                  label="Per Product Discount"
                  type="text"
                  placeholder="Discount"
                  register={register}
                  name={`order[${index}].discount`}
                />
              </div>
              <div className="flex-none relative top-7">
                <button
                  onClick={() => handleRemove(index)} // Remove from both order and selectProduct
                  type="button"
                  className="inline-flex items-center justify-center h-10 w-10 bg-danger-500 text-lg border rounded border-danger-500 text-white"
                  aria-label="Remove item"
                >
                  <Icon icon="heroicons-outline:trash" />
                </button>
              </div>
            </div>
          </div>
        ))}
        <Textinput
          register={register}
          label="Payment"
          name="payment"
          type="text"
          placeholder="Payment"
        // defaultValue={data?.payment}
        />
        <Textarea
          register={register}
          label="Order Note"
          name="note"
          type="text"
          placeholder="Order Note"
        // defaultValue={data?.note}
        />
      </Card>

      {/* Summary Section */}
      <div className=" rounded-lg   w-full flex justify-end px-5">
        <div className="mt-4 p-4 pr-5 bg-gray-100 rounded-lg shadow-md w-full lg:w-5/12">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">Order Summary</h2>

          <div className="flex justify-between text-gray-600 mb-2">
            <span className="font-medium">Total Quantity:</span>
            <span>{totals.quantity}</span>
          </div>

          <div className="flex justify-between text-gray-600 mb-2">
            <span className="font-medium">Total Discount:</span>
            <span>${totals.discount}</span>
          </div>

          <div className="flex justify-between text-gray-600 mb-2">
            <span className="font-medium">Total Price:</span>
            <span>${totals.price.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-gray-600 mb-2">
            <span className="font-medium">Payment:</span>
            <span>${paymentValue || 0}</span>
          </div>

          <div className="flex justify-between text-lg font-semibold text-gray-800 border-t pt-2">
            <span>Balance Due:</span>
            <span>${(totals.price - paymentValue || 0).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderFormRepeater;
