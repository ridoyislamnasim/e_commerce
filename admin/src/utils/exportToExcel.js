import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToExcel = (data, fileName) => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert the data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Set column widths
    const columnWidths = [
        { wpx: 180 }, // Parcel Invoice
        { wpx: 180 }, // Merchant Order Id
        { wpx: 180 }, // Parcel Date
        { wpx: 180 }, // Status
        { wpx: 180 }, // Last Update Date
        { wpx: 180 }, // Company Name
        { wpx: 180 }, // Customer Name
        { wpx: 180 }, // Customer Contact Number
        { wpx: 180 }, // Customer Address
        { wpx: 180 }, // District Name
        { wpx: 180 }, // Service Type
        { wpx: 180 }, // Item Type
        { wpx: 180 }, // Amount to be Collect
        { wpx: 180 }, // Collected
        { wpx: 180 }, // COD Charge
        { wpx: 180 }, // Total Charge
        { wpx: 180 }, // Parcel Note
        { wpx: 180 }, // Logs Note
        { wpx: 180 }, // Payment status
        { wpx: 180 }, // Return Status
    ];

    worksheet['!cols'] = columnWidths;

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate a binary string representing the workbook
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

    // Create a Blob from the binary string
    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });

    // Save the file using FileSaver
    saveAs(blob, `${fileName}.xlsx`);
};

const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
};
