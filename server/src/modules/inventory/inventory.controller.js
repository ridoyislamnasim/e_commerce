const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const InventoryService = require("./inventory.service.js");
const { generateEAN13Barcode } = require("../../utils/barcodeGenerate.js");

class InventoryController {
  createInventory = withTransaction(async (req, res, next, session) => {
    console.log(req.body);

    const payload = {
      name: req.body.name,
      color: req.body.color,
      quantity: req.body.quantity,
      level: req.body.level,
      color: req.body.name ? req.body.color : '',
      productRef: req.body.productRef,
      warehouseRef: req.body.warehouseRef,
      barcode: req.body.barcode || generateEAN13Barcode(),
    };
    const inventoryResult = await InventoryService.createInventory(
      payload,
      session
    );
    const resDoc = responseHandler(
      201,
      "Inventory Created successfully",
      inventoryResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllInventory = catchError(async (req, res, next) => {
    const payload = {
      warehouseRef: req.query.warehouseRef,
    };
    const inventoryResult = await InventoryService.getAllInventory(payload);
    const resDoc = responseHandler(200, "Get All Inventorys", inventoryResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getInventoryWithPagination = catchError(async (req, res, next) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
      warehouseRef: req.query.warehouseRef,
    };
    const inventory = await InventoryService.getInventoryWithPagination(payload);
    const resDoc = responseHandler(200, "Inventorys get successfully", inventory);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleInventory = catchError(async (req, res, next) => {
    const id = req.params.id;
    const inventoryResult = await InventoryService.getSingleInventory(id);
    const resDoc = responseHandler(
      201,
      "Single Inventory successfully",
      inventoryResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateInventory = withTransaction(async (req, res, next, session) => {
    const id = req.params.id;

    const payload = {
      name: req.body.name,
      color: req.body.color,
      quantity: req.body.quantity,
      level: req.body.level,
      color: req.body.name ? req.body.color : '',
      productRef: req.body.productRef,
      warehouseRef: req.body.warehouseRef
    };
    const inventoryResult = await InventoryService.updateInventory(
      id,
      payload,
      session
    );
    const resDoc = responseHandler(201, "Inventory Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateInventoryStatus = catchError(async (req, res, next) => {
    const id = req.params.id;
    const status = req.query.status;
    const inventoryResult = await InventoryService.updateInventoryStatus(id, status);
    const resDoc = responseHandler(201, "Inventory Status Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteInventory = withTransaction(async (req, res, next, session) => {
    const id = req.params.id;
    const inventoryResult = await InventoryService.deleteInventory(id, session);
    const resDoc = responseHandler(200, "Inventory Deleted successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new InventoryController();
