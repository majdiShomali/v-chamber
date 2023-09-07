const express = require("express");
const router = express.Router();
const itemCategoryController = require("../controllers/itemCategoryController");
const upload = require("../middleware/handleImage")
const uploadMiddleware = require('../middleware/uploadMiddleware'); // Correct import

router.get("/api/allItems/:itemsPerPage/:CurrentPage", itemCategoryController.allItems);
router.get("/api/OneItem/:id", itemCategoryController.OneItem);
router.get("/api/ProviderItems/:id", itemCategoryController.ProviderItems);

router.post("/api/items",uploadMiddleware, itemCategoryController.addItem);

router.put("/api/updateItemData/:id", itemCategoryController.updateItemData);
router.put("/api/updateItemImage/:id",uploadMiddleware, itemCategoryController.updateItemImage);


// router.put("/api/updateProductColor/:id",upload.single("image"), itemCategoryController.updateProductColor);
// router.put("/api/updateProductSize/:id",upload.single("image"), itemCategoryController.updateProductSize);
// router.put("/api/updateProductVapePuff/:id",upload.single("image"), itemCategoryController.updateProductVapePuff);
// router.put("/api/updateProductAccessory/:id",upload.single("image"), itemCategoryController.updateProductAccessory);

module.exports = router;