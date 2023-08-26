const express = require("express");
const router = express.Router();
const relatedItemsController = require("../controllers/relatedItemsController");
// const protected =require("../middleware/Protected")
const upload = require("../middleware/handleImage")
const uploadMiddleware = require('../middleware/uploadMiddleware'); // Correct import

router.post("/api/price", relatedItemsController.price);

router.post("/api/allCartItems", relatedItemsController.allCartItems);
router.get("/api/RelatedItemsAll", relatedItemsController.RelatedItemsAll);
router.post("/api/addRelatedItem",uploadMiddleware, relatedItemsController.addRelatedItem);
router.get("/api/allRelatedItems/:id", relatedItemsController.allRelatedItems);
router.get("/api/CustomizedItems/:id/:customizedToId", relatedItemsController.CustomizedItems);
router.get("/api/OneRelatedItem/:id", relatedItemsController.OneRelatedItem);
router.put("/api/updateItemFav/:id" , relatedItemsController.updateItemFav);
router.get("/api/favoriteItems/:id", relatedItemsController.favoriteItems);
router.put("/api/updateProductRate/:id", relatedItemsController.updateProductRate);
// router.delete("/api/users/:id", relatedItemsController.deleteUser);
// router.put("/api/users/:id",upload.single("image"), relatedItemsController.updateUser);
router.put("/api/updateProductQuantity/:id", relatedItemsController.updateProductQuantity);


router.put("/api/updateRelatedItemData/:id", relatedItemsController.updateRelatedItemData);
router.put("/api/updateRelatedItemImage/:id",uploadMiddleware, relatedItemsController.updateRelatedItemImage);

router.put("/api/LinkProduct/:item1Id/:item2Id", relatedItemsController.LinkProduct);
router.get("/api/getLinkProduct/:id", relatedItemsController.getLinkProduct);

module.exports = router;