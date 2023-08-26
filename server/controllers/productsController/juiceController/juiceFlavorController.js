const JuiceFlavor = require("../../../models/productsModels/juiceModel/juiceFlavor");
const errorHandler = (error, req, res) => {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Internal Server Error" });
  };

  const allJuiceFlavor = (req, res) => {
    JuiceFlavor.find()
      .then((data) => { 
        res.json(data);
      })
      .catch((error) => {
        errorHandler(error, req, res);
      });
  };

  const addJuiceFlavor = async (req, res) => {
    try {
      const data = req.body;
      const item = new JuiceFlavor(data);
      const newItem = await item.save();
      res.json(newItem);
    } catch (error) {
      errorHandler(error, req, res);
    }
  };
  const JuiceFlavorByCategory = (req, res) => {
    const id =req.params.id
    JuiceFlavor.find({categoryId:id})
      .then((data) => { 
        res.json(data);

      })
      .catch((error) => {
        errorHandler(error, req, res);
      });
  };


  const updateJuiceFlavor = async (req, res) => {
    try {
     const Id = req.params.id;
     const  Data  = req.body;
     console.log(Id,Data);
     const updated = await JuiceFlavor.findByIdAndUpdate(Id, Data, { new: true });
     console.log(updated);
     res.json(updated);
    } catch (error) {
     errorHandler(error, req, res);
    }
  }

module.exports = {
    allJuiceFlavor,
    addJuiceFlavor,
    JuiceFlavorByCategory,
    updateJuiceFlavor,
}; 