import React from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css'; // Choose your preferred Flatpickr theme

const DatePicker = ({
  label,
  placeholder = 'Select a date',
  classLabel = 'form-label',
  className = '',
  id,
  value,
  onChange,
  defaultValue,
  options = { dateFormat: 'Y-m-d' },
  disabled,
  error,
  description,
  register,
  name,
  required,
  ...rest
}) => {
  return (
    <div className={`formGroup ${error ? 'has-error' : ''}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className={`block capitalize ${classLabel}`}
        >
          {label}
        </label>
      )}

      {/* Flatpickr Input */}
      <Flatpickr
        {...(register &&
          register(name, {
            required: required ? `${label} is required` : false,
          }))} 
        id={id}
        {...rest}
        value={value || defaultValue}
        options={options}
        onChange={onChange}
        className={`form-control py-2 bg-white ${className} ${
          error ? 'border-red-500 focus:ring-red-500' : ''
        }`}
        placeholder={placeholder}
        disabled={disabled}
      />

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error?.message || 'This field is required'}
        </div>
      )}

      {/* Description */}
      {description && (
        <span className="input-description text-gray-500 text-sm">
          {description}
        </span>
      )}
    </div>
  );
};

export default DatePicker;
