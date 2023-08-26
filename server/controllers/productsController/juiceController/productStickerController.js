const ProductSticker = require("../../../models/productsModels/juiceModel/productSticker");

const errorHandler = (error, req, res) => {
  console.error("An error occurred:", error);
  res.status(500).json({ error: "Internal Server Error" });
};

const ProductStikersCart = (req, res) => {
  const { Ids } = req.body;
  ProductSticker.find({ _id: { $in: Ids } })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const addProductSticker = async (req, res) => {
  try {
    let data = req.body;
    const image = req.file.path

    data.price=parseInt(data.Sprice)
    data.salePrice=parseInt(data.SsalePrice)
    data.totalQuantity=data.Squantity
    data.Name=data.SName
    data.RelatedItemId=data._id
    data.ProviderId=data.SProviderId
    data.image=image
    delete data["_id"];
    const item = new ProductSticker({...data});
    const newItem = await item.save();
    res.json(newItem);
  } catch (error) {
    errorHandler(error, req, res);
  }
};
const ProductStikers = async (req, res) => {
  const id =req.params.id
  console.log(id)
  ProductSticker.find({RelatedItemId:id})
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

module.exports = {
  addProductSticker,
  ProductStikers,
  ProductStikersCart

};