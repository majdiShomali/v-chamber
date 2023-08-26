const express = require("express");
const juiceFlavorController = require("../../../controllers/productsController/juiceController/juiceFlavorController");

const router = express.Router();

router.get("/api/allJuiceFlavor", juiceFlavorController.allJuiceFlavor);
router.post("/api/addJuiceFlavor", juiceFlavorController.addJuiceFlavor);
router.get("/api/JuiceFlavorByCategory/:id", juiceFlavorController.JuiceFlavorByCategory);
router.put("/api/updateJuiceFlavor/:id", juiceFlavorController.updateJuiceFlavor);


module.exports = router;