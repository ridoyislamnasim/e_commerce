import React from "react";
import { Modal } from "antd";

interface Inventory {
  id: number;
  quantity?: number;
  mrpPrice?: number;
  price?: number;
  discountType?: string;
  discountAmount?: number;
  barcode?: string;
  availableQuantity?: number;
  soldQuantity?: number;
  holdQuantity?: number;
  inventoryType?: string;
  color?: string;
  level?: string;
  inventoryID?: string;
}

interface InventoryModalProps {
  open: boolean;
  onClose: () => void;
  inventories: Inventory[];
}

const InventoryModal: React.FC<InventoryModalProps> = ({ open, onClose, inventories }) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={900}
    >
      <div>
        <h2 className="text-lg font-semibold mb-4">Inventories</h2>
        {(!inventories || inventories.length === 0) ? (
          <div className="text-center text-gray-500 py-8">No inventories found.</div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                  {/* <th className="px-3 py-2 border-b">ID</th> */}
                                    <th className="px-3 py-2 border-b">Inventory ID</th>
                                                      <th className="px-3 py-2 border-b">Color</th>
                  <th className="px-3 py-2 border-b">Level</th>
                  <th className="px-3 py-2 border-b">Quantity</th>
                  <th className="px-3 py-2 border-b">MRP Price</th>
                  <th className="px-3 py-2 border-b">Price</th>
                  <th className="px-3 py-2 border-b">Discount Type</th>
                  <th className="px-3 py-2 border-b">Discount Amount</th>
                  {/* <th className="px-3 py-2 border-b">Barcode</th> */}
                  <th className="px-3 py-2 border-b">Available</th>
                  <th className="px-3 py-2 border-b">Sold</th>
                  <th className="px-3 py-2 border-b">Hold</th>
                  {/* <th className="px-3 py-2 border-b">Inventory Type</th> */}


                </tr>
              </thead>
              <tbody>
                {inventories.map((inv, idx) => (
                  <tr key={inv.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    {/* <td className="px-3 py-2 border-b">{inv.id}</td> */}
                    <td className="px-3 py-2 border-b">{inv.inventoryID}</td>
                    <td className="px-3 py-2 border-b">{inv.color ? inv.color : 'N/A'}</td>
                    <td className="px-3 py-2 border-b">{inv.level ? inv.level : 'N/A'}</td>
                    <td className="px-3 py-2 border-b">{inv.quantity}</td>
                    <td className="px-3 py-2 border-b">{inv.mrpPrice}</td>
                    <td className="px-3 py-2 border-b">{inv.price}</td>
                    <td className="px-3 py-2 border-b">{inv.discountType}</td>
                    <td className="px-3 py-2 border-b">{inv.discountAmount}</td>
                    {/* <td className="px-3 py-2 border-b">{inv.barcode}</td> */}
                    <td className="px-3 py-2 border-b">{inv.availableQuantity}</td>
                    <td className="px-3 py-2 border-b">{inv.soldQuantity}</td>
                    <td className="px-3 py-2 border-b">{inv.holdQuantity}</td>
                    {/* <td className="px-3 py-2 border-b">{inv.inventoryType}</td> */}


                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default InventoryModal;
