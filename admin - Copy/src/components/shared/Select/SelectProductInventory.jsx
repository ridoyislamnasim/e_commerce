import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import ReactSelectError from './ReactSelectError';
import SelectCustom from './SelectCustom';
import { useSelector } from 'react-redux';
import { useGetInventorysQuery } from '@/store/api/app/Inventory/inventoryApiSlice';

const SelectProductInventory = ({
  label,
  error,
  required = false,
  control,
  setState,
  setItem,
  state,
  className = '',
  defaultValue,
  isMarked,
  isDisabled,
  name,
  selectProduct, 
  setSelectProduct,
}) => {
  const { isAuth, auth } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetInventorysQuery({ warehouseRef: auth?.user?.warehouseRef });
  const [selectedProduct, setSelectedProduct] = useState(null);

  const options = [
    { value: '', label: 'Select a Product Inventory' }, // Default empty option
    ...(data?.data?.map((item) => {
      const productName = item.productRef?.name || '';
      const price = item?.productRef?.price ? ` - ${item?.productRef?.price}` : '';
      const barcode = item?.barcode ? ` - ${item?.barcode}` : '';

      return {
        value: item._id,
        label: `${productName}${barcode}`.trim(), // Concatenate only if the values exist
      };
    }) || []),
  ];

  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      const selectedItem = data?.data?.find((item) => item._id === selectedOption);
      
      // Check if the selected item is already in the selectProduct state
      const existingProduct = selectProduct?.find((item) => item.id === selectedItem._id);
      
      if (!existingProduct) {
        // If not already selected, add it to the selectProduct state
        setSelectProduct((prevState) => [
          ...(Array.isArray(prevState) ? prevState : []), // Ensure prevState is an array
          { id: selectedItem._id, name: selectedItem.productRef?.name, price: selectedItem.productRef?.price , mrpPrice: selectedItem.productRef?.mrpPrice }
        ]);
      } else {
        console.log("Product is already selected.");
      }
    }
  };

  useEffect(() => {
    // Update the selectedProduct state when the product changes
    if (defaultValue) {
      setSelectedProduct(defaultValue);
    }
  }, [defaultValue]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={className}>
      <Controller
        name={name || 'category_id'}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <SelectCustom
            label={label}
            isMarked={isMarked}
            defaultValue={defaultValue}
            options={options}
            onChange={(selectedOption) => {
              onChange(selectedOption);
              handleSelectChange(selectedOption); // Handle the select change for inventory
            }}
            setState={setState}
            setItem={setItem}
            isDisabled={isDisabled}
            required={required}
            error={error}
          />
        )}
        rules={{ required: required ? 'Product Inventory is required!' : false }}
      />
      <ReactSelectError errorName={error?.[name ? name : 'category ']} />
    </div>
  );
};

export default SelectProductInventory;
