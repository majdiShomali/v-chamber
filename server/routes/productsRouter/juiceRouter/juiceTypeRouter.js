const express = require("express");
const juiceTypeController = require("../../../controllers/productsController/juiceController/juiceTypeController");

const router = express.Router();

router.get("/api/allJuiceType", juiceTypeController.allJuiceType);
router.post("/api/addJuiceType", juiceTypeController.addJuiceType);
router.get("/api/JuiceTypeByCategory/:id", juiceTypeController.JuiceTypeByCategory);
router.put("/api/updateJuiceType/:id", juiceTypeController.updateJuiceType);


module.exports = router;