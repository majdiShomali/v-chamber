const express = require("express");
const productStickerController = require("../../../controllers/productsController/juiceController/productStickerController");
const upload = require("../../../middleware/handleImage")

const router = express.Router();

// router.get("/api/allJuiceSize", productStickerController.allJuiceSize);
router.post("/api/addProductSticker",upload.single("image"), productStickerController.addProductSticker);
router.get("/api/ProductStikers/:id", productStickerController.ProductStikers);
router.post("/api/ProductStikersCart", productStickerController.ProductStikersCart);


module.exports = router;