// 1- calling the model
const ItemCategory = require("../models/itemsCategory");
const RelatedItems =require("../models/relatedItems")

const errorHandler = (error, req, res) => {
  console.error("An error occurred:", error);
  res.status(500).json({ error: "Internal Server Error" });
};


const allItems = (req, res) => {
  const itemsPerPage = parseInt(req.params.itemsPerPage, 10);
  const CurrentPage = parseInt(req.params.CurrentPage, 10);

 const aggregationPipeline = [];
  // Add $count stage to count the total number of matching documents
  aggregationPipeline.push({
    $count: "totalItems"
  });

  ItemCategory.aggregate(aggregationPipeline)
  .then((countData) => {
    // Check if there are any results
    if (countData.length === 0) {
      return res.json({ totalItems: 0, data: [] });
    }

    // Extract the total number of items from the countData
    const totalItems = countData[0].totalItems;

    // Calculate the number of documents to skip based on the page number
    const skipCount = (CurrentPage - 1) * itemsPerPage;

    // Remove the $count stage from the pipeline
    aggregationPipeline.pop();

    // Add $skip and $limit stages for pagination
    aggregationPipeline.push(
      { $skip: skipCount },
      { $limit: itemsPerPage }
    );

    // Execute the aggregation pipeline again to get the paginated data
    ItemCategory.aggregate(aggregationPipeline)
      .then((paginatedData) => {
        res.json({ totalItems, data: paginatedData });
      })
      .catch((error) => {
        errorHandler(error, req, res);
      });
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

