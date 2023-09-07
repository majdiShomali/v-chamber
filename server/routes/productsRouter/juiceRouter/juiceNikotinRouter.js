const express = require("express");
const juiceNikotinController = require("../../../controllers/productsController/juiceController/juiceNikotinController");

const router = express.Router();

router.get("/api/allJuiceNikotin", juiceNikotinController.allJuiceNikotin);
router.post("/api/addJuiceNikotin", juiceNikotinController.addJuiceNikotin);
router.get("/api/JuiceNikotinByCategory/:id", juiceNikotinController.JuiceNikotinByCategory);
router.put("/api/updateJuiceNikotin/:id", juiceNikotinController.updateJuiceNikotin);


module.exports = router;