const JuiceSize = require("../../../models/productsModels/juiceModel/JuiceSize");
const errorHandler = (error, req, res) => {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Internal Server Error" });
  };

  const allJuiceSize = (req, res) => {
    JuiceSize.find()
      .then((data) => { 
        res.json(data);
      })
      .catch((error) => {
        errorHandler(error, req, res);
      });
  };

  const addJuiceSize = async (req, res) => {
    try {
      const data = req.body;
      const item = new JuiceSize(data);
      const newItem = await item.save();
      res.json(newItem);
    } catch (error) {
      errorHandler(error, req, res);
    }
  };
  
  const JuiceSizeByCategory = (req, res) => {
    const id =req.params.id
    JuiceSize.find({categoryId:id})
      .then((data) => { 
        res.json(data);
        
      })
      .catch((error) => {
        errorHandler(error, req, res);
      });
  };
module.exports = {
    allJuiceSize,
    addJuiceSize,
    JuiceSizeByCategory
}; 