const JuiceNikotin = require("../../../models/productsModels/juiceModel/juiceNikotin");
const errorHandler = (error, req, res) => {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Internal Server Error" });
  };

  const allJuiceNikotin = (req, res) => {
    JuiceNikotin.find()
      .then((data) => { 
        res.json(data);
      })
      .catch((error) => {
        errorHandler(error, req, res);
      });
  };

  const addJuiceNikotin = async (req, res) => {
    try {
      const data = req.body;
      const item = new JuiceNikotin(data);
      const newItem = await item.save();
      res.json(newItem);
    } catch (error) {
      errorHandler(error, req, res);
    }
  };
  const JuiceNikotinByCategory = (req, res) => {
    const id =req.params.id
    JuiceNikotin.find({categoryId:id})
      .then((data) => { 
        res.json(data);
        console.log(data)
        console.log(data)
        console.log(data)
        console.log(data)
        console.log(data)
        console.log(data)
      })
      .catch((error) => {
        errorHandler(error, req, res);
      });
  };

module.exports = {
    allJuiceNikotin,
    addJuiceNikotin,
    JuiceNikotinByCategory,
}; 