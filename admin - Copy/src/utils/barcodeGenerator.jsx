import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

const BarcodeGenerator = ({ value }) => {
    const barcodeRef = useRef(null);
console.log("Generating Barcode", value)
    useEffect(() => {
        if (barcodeRef.current) {
            JsBarcode(barcodeRef.current, value, {
                format: "CODE128",
                displayValue: true,
                lineColor: "#000",
                width: 2,
                height: 50,
            });
        }
    }, [value]);

    return <svg ref={barcodeRef}></svg>;
};

export default BarcodeGenerator;
