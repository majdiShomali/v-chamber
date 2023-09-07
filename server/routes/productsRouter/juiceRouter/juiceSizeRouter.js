const express = require("express");
const juiceSizeController = require("../../../controllers/productsController/juiceController/juiceSizeController");

const router = express.Router();

router.get("/api/allJuiceSize", juiceSizeController.allJuiceSize);
router.post("/api/addJuiceSize", juiceSizeController.addJuiceSize);
router.get("/api/JuiceSizeByCategory/:id", juiceSizeController.JuiceSizeByCategory);
router.put("/api/updateJuiceSize/:id", juiceSizeController.updateJuiceSize);


module.exports = router;