const JuiceType = require("../../../models/productsModels/juiceModel/juiceType");
const errorHandler = (error, req, res) => {
  console.error("An error occurred:", error);
  res.status(500).json({ error: "Internal Server Error" });
};

const allJuiceType = (req, res) => {
  JuiceType.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const addJuiceType = async (req, res) => {
  try {
    const data = req.body;
    const item = new JuiceType(data);
    const newItem = await item.save();
    res.json(newItem);
  } catch (error) {
    errorHandler(error, req, res);
  }
};
const JuiceTypeByCategory = (req, res) => {
  const id =req.params.id
  JuiceType.find({categoryId:id})
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

module.exports = {
  allJuiceType,
  addJuiceType,
  JuiceTypeByCategory
};
