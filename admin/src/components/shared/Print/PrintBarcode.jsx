import { Icon } from "@iconify/react";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import BarcodeGenerator from "@/utils/barcodeGenerator";

const BarcodePrint = ({ selectedIds }) => {
  const componentRef = useRef(null);

  // A4 Page Layout Settings
  const barcodeWidth = 65; // Adjust for barcode size (mm)
  const barcodeHeight = 30; // Adjust barcode height (mm)
  const pageWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const margin = 1; // Page margin in mm

  // Calculate how many barcodes fit per row and column
  const barcodesPerRow = Math.floor((pageWidth - 2 * margin) / barcodeWidth);
  const barcodesPerColumn = Math.floor((pageHeight - 2 * margin) / barcodeHeight);
  const barcodesPerPage = barcodesPerRow * barcodesPerColumn;

  return (
    <div>
      {/* Print Button */}
      {selectedIds.length > 0 && (
        <div className="flex justify-end w-full pb-2">
          <ReactToPrint
            trigger={() => (
              <button className="flex border gap-1 border-gray-300 p-2 rounded-md bg-blue-600 hover:bg-blue-700 transition duration-300 w-full">
                <p className="text-white">Print Barcode</p>
                <Icon icon="heroicons:printer" className="mt-1 text-white" />
              </button>
            )}
            content={() => componentRef.current}
            documentTitle="Barcodes_Print"
          />
        </div>
      )

      }


      {/* Hidden Print Area */}
      <div className="hidden">
        <div className="w-full text-gray-700 " ref={componentRef}>
          {selectedIds.length === 0 ? (
            <p className="text-center ">No Barcodes Selected</p>
          ) : (
            selectedIds.map((details, index) => (
              <div
                key={index}
                className="inline-block "
                style={{
                  width: `${barcodeWidth}mm`,
                  height: `${barcodeHeight}mm`,
                  textAlign: "center",
                  margin: "1mm 3mm",
                  display: "inline-block",
                  verticalAlign: "top",
                }}
              >
                <BarcodeGenerator value={details?.barcode} />
                {/* <p className="text-sm mt-1">{details?.barcode}</p> */}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BarcodePrint;
