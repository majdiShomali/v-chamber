const express = require("express");
const companyController = require("../controllers/companyController");

const router = express.Router();
const upload = require("../middleware/handleImage")


router.post("/api/addCompany", upload.single("image"), companyController.addCompany);
router.get("/api/allCompanies", companyController.allCompanies);
router.get("/api/CompaniesByCategory/:id", companyController.CompaniesByCategory);
// router.get("/api/allRelatedItems/:id", companyController.allRelatedItems);
router.put("/api/updateCompany/:id", companyController.updateCompany);

module.exports = router;