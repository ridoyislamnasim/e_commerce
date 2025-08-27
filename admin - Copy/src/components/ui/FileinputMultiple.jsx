import React, { useEffect, useState } from "react";
import { useController } from "react-hook-form";
import envConfig from "@/configs/envConfig";

const FileInput = ({
  name,
  label = "Browse",
  imageLabel = "Browse",
  onChange,
  placeholder = "Choose a file or drop it here...",
  multiple = false,
  preview = false,
  className = "custom-class",
  id,
  classLabel,
  selectedFile,
  control,
  badge,
  selectedFiles = [],
  defaultFiles = [],
}) => {
  const [files, setFiles] = useState(selectedFiles);

  // Use react-hook-form's useController to manage the input
  const {
    field: { ref, onChange: onFieldChange, ...inputProps },
  } = useController({
    name,
    control,
    defaultValue: multiple ? [] : null, // Set default value based on multiple
  });

  useEffect(() => {
    if (defaultFiles.length > 0) {
      setFiles(defaultFiles);
      onFieldChange(defaultFiles); // Update form state with default files
    }
  }, [defaultFiles, onFieldChange]);

  const handleFileChange = (e) => {
    const fileList = e.target.files;
    const fileArray = Array.from(fileList);
    setFiles(fileArray);
    onFieldChange(fileArray); // Update form state with new files
    if (onChange) {
      onChange(e);
    }
  };

  const renderPreview = (file, index) => {
    const isUrl = typeof file === "string";
    const src = isUrl ? `${envConfig.apiUrl}${file}` : URL.createObjectURL(file);
    const alt = isUrl ? file.split("/").pop() : file.name;

    return (
      <div
        className="xl:w-1/5 md:w-1/3 w-1/2 rounded mt-6 border p-2 border-slate-200"
        key={index}
      >
        <img
          src={src}
          className="object-cover w-full h-full rounded"
          alt={alt}
        />
      </div>
    );
  };

  return (
    <div>
      <div className="filegroup">
        {label && (
          <label htmlFor={id} className={`block capitalize ${classLabel}`}>
            {label}
          </label>
        )}
        <label>
          <input
            type="file"
            onChange={handleFileChange}
            className="bg-red-400 w-full hidden"
            name={name}
            id={id}
            multiple={multiple}
            placeholder={placeholder}
            ref={ref} // Attach the ref from useController
            {...inputProps} // Spread other input props
            value="" // Ensure the value is always an empty string
          />
          <div
            className={`w-full h-[40px] file-control flex items-center ${className}`}
          >
            <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
              {!multiple && selectedFile && (
                <span
                  className={
                    badge ? "badge-title" : "text-slate-900 dark:text-white"
                  }
                >
                  {selectedFile.name}
                </span>
              )}
              {!multiple && !selectedFile && (
                <span className="text-slate-400">{placeholder}</span>
              )}
              {multiple && files.length > 0 && (
                <span
                  className={
                    badge ? "badge-title" : "text-slate-900 dark:text-white"
                  }
                >
                  {files.length} files selected
                </span>
              )}
              {multiple && files.length === 0 && (
                <span className="text-slate-400">{placeholder}</span>
              )}
            </span>
            <span className="file-name flex-none cursor-pointer border-l px-4 border-slate-200 dark:border-slate-700 h-full inline-flex items-center bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-base rounded-tr rounded-br font-normal">
              {imageLabel}
            </span>
          </div>
          {preview && (
            <div className="flex flex-wrap space-x-5 rtl:space-x-reverse">
              {files.map((file, index) => renderPreview(file, index))}
            </div>
          )}
        </label>
      </div>
    </div>
  );
};

export default FileInput;