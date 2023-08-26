// 1- calling the model
const ItemCategory = require("../models/itemsCategory");
const RelatedItems =require("../models/relatedItems")
const allItems = (req, res) => {
  ItemCategory.find()
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const ProviderItems = (req, res) => {
    const id = req.params.id;
    ItemCategory.find({ProviderId:id})
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const OneItem = (req, res) => {
  const id = req.params.id;
  ItemCategory.findById(id) 
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};



const addItem =  async (req, res) => {
        const image = req.file.path
        const { Name, description ,ProviderId,category} = req.body;      
        const  item = new ItemCategory({ Name: Name, description: description,
        image:image,ProviderId:ProviderId ,category:category,    
        });     
         const newItem = await item.save();
        res.json(newItem);
        // const NewColors= JSON.parse(isColorChecked)  ?  [{color:selectedColor,image:image}] :[]
        // const NewSize = JSON.parse(isSizeChecked)   ?  [{size:selectedSize,image:image}] : []
        // const NewVapePuff = JSON.parse(isVapePuffChecked)   ?  [{vapePuff:selectedVapePuff,color:selectedColor,image:image}] : []
        // // const accessories=[{color:selectedColor,size:selectedSize,image:image}]
        // const  item = new Item({ Name: Name, description: description,price:price,image:image,ProviderId:ProviderId,totalQuantity:totalQuantity,salePrice:salePrice ,category:category,colors:NewColors,size:NewSize,vapePuff:NewVapePuff });     
        // const newItem = await item.save();
        // res.json(newItem);
};







const updateItemData = async (req, res) => {
  const CardId  = req.params.id;
  const UpdatedData = req.body.UpdatedData;
  const Product = await ItemCategory.findByIdAndUpdate(CardId, UpdatedData, { new: true });
  const updatedProduct= await Product.save();
  res.json(updatedProduct);
};

const updateItemImage = async (req, res) => {
  const CardId  = req.params.id;
  const image = req.file.path
  const Product = await ItemCategory.findByIdAndUpdate(CardId, {image:image}, { new: true });
  const updatedProduct= await Product.save();
  res.json(updatedProduct);
};


module.exports = {
  allItems,
  addItem,
  OneItem,
  ProviderItems,
  updateItemData,
  updateItemImage
}; 

