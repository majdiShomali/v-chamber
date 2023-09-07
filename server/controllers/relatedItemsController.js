// 1- calling the model
const RelatedItems = require("../models/relatedItems");
const ProductSticker = require("../models/productsModels/juiceModel/productSticker");

const errorHandler = (error, req, res) => {
  console.error("An error occurred:", error);
  res.status(500).json({ error: "Internal Server Error" });
};

const price = async (req, res) => {
  let AllProducts =[]
  const { items } = req.body;
  const ids = items.map(item => item._id);

  try {
    const relatedItems = await RelatedItems.find({ _id: { $in: ids } });
    if (relatedItems.length >0 ){
      AllProducts =relatedItems
    }


    try {
      const StickerItems = await ProductSticker.find({ _id: { $in: ids } });
      if (StickerItems.length >0 ){
        if(AllProducts.length > 0){
          AllProducts =[...AllProducts,...StickerItems]
        }else{
          AllProducts=StickerItems
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }




if(AllProducts.length > 0 && items.length > 0) {



 
  
  // Create a map from array y using _id as the key
  let yMap = new Map(items.map(item => [item._id.toString(), item]));
  
  // Update array x with truequantity from array y
  AllProducts.forEach(item => {
    if (yMap.has(item._id.toString())) {
      item.quantity = yMap.get(item._id.toString()).quantity;
    }
  });
  let sum = AllProducts.reduce((total, item) => total + (item.salePrice * item.quantity), 0);

    res.status(200).json({truePrice:sum,trueProducts:AllProducts} );
  }else{
    res.status(500).json({ error: "No Items In cart" });
  }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }

};






const addRelatedItem = async (req, res) => {
  try {
    const image = req.file.path;
    const data = req.body;
    const Newdata = { ...data, image: image };
    const item = new RelatedItems(Newdata);
    const newItem = await item.save();
    res.json(newItem);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const allRelatedItems = (req, res) => {
    const id = req.params.id;
    RelatedItems.find({categoryId:id})
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};


const allRelatedItemsBy = (req, res) => {
  const { category, company, type, sale, CurrentPage,searchWord,itemsPerPage } = req.body;
  const matchQuery = {};

  if (category) { matchQuery.category = category; }
  if (company) { matchQuery.company = company; }
  if (type) { matchQuery.type = type; }

  const aggregationPipeline = [
    {
      $match: matchQuery
    }
  ];

  if (sale == "sale") {
    aggregationPipeline.push({
      $match: {
        $expr: {
          $lt: ["$salePrice", "$price"]
        }
      }
    });
  } 
  
  // else {
  //   aggregationPipeline.push({
  //     $match: {
  //       $expr: {
  //         $eq: ["$salePrice", "$price"]
  //       }
  //     }
  //   });
  // }

  if (searchWord) {
    aggregationPipeline.push({
      $match: {
        Name: { $regex: searchWord, $options: 'i' } // Case-insensitive search for Name field
      }
    });
  }

  

  // Add $count stage to count the total number of matching documents
  aggregationPipeline.push({
    $count: "totalItems"
  });

  RelatedItems.aggregate(aggregationPipeline)
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
      RelatedItems.aggregate(aggregationPipeline)
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




const RelatedItemsAll = (req, res) => {
  RelatedItems.find()
    .sort({ rating: -1 }) // Sort by rating in descending order (highest to lowest)
    .limit(4) // Limit the results to the top 4 items
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};


const OneRelatedItem = (req, res) => {
    const id = req.params.id;
    RelatedItems.findById(id) 
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

  const allCartItems = (req, res) => {
    const { Ids } = req.body;
    RelatedItems.find({ _id: { $in: Ids } })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        errorHandler(error, req, res);
      });
  };


  const updateItemFav = async (req, res) => {
    const cardId = req.params.id;
    const { UsersIdFavorite } = req.body;
    const game = await RelatedItems.findByIdAndUpdate(cardId, { UsersIdFavorite: UsersIdFavorite }, { new: true });
    res.json(game);
  };
  
  const favoriteItems = (req, res) => { 
    const userId = req.params.id;
    RelatedItems.find({ UsersIdFavorite: { $in: [userId] } })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        errorHandler(error, req, res);
      });
  };
  
  const updateProductRate = async (req, res) => {
    const CardId  = req.params.id;
    const updatedItemData = req.body;
    const Product = await RelatedItems.findByIdAndUpdate(CardId, updatedItemData, { new: true });
    const updatedProduct= await Product.save();
    res.json(updatedProduct);
  };

  
  const updateProductQuantity = async (req, res) => {
    const CardId = req.params.id;
    const updatedItemData = req.body;
  
    try {
      let ProductOr = await RelatedItems.findOne({ _id: CardId });
  
      if (!ProductOr) {
        ProductOr = await ProductSticker.findOne({ _id: CardId });

        const NewUpdateData = {
          totalQuantity: ProductOr.totalQuantity - updatedItemData.quantity
        };
    
        let Product = await ProductSticker.findByIdAndUpdate(CardId, NewUpdateData, { new: true });
        const updatedProduct = await Product.save();
        
        res.json(updatedProduct);

      }else{

        const NewUpdateData = {
          totalQuantity: ProductOr.totalQuantity - updatedItemData.quantity
        };
    
        let Product = await RelatedItems.findByIdAndUpdate(CardId, NewUpdateData, { new: true });
        const updatedProduct = await Product.save();
        
        res.json(updatedProduct);
    
      }

    } catch (error) {
      console.error('Error updating product quantity:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  const updateRelatedItemData = async (req, res) => {
    const CardId  = req.params.id;
    const UpdatedData = req.body.UpdatedData;
    const Product = await RelatedItems.findByIdAndUpdate(CardId, UpdatedData, { new: true });
    const updatedProduct= await Product.save();
    res.json(updatedProduct);
  };
  
  
  const updateRelatedItemImage = async (req, res) => {
    const CardId  = req.params.id;
    const image = req.file.path
    console.log(image,CardId);
    const Product = await RelatedItems.findByIdAndUpdate(CardId, {image:image}, { new: true });
    const updatedProduct= await Product.save();
    res.json(updatedProduct);
  };
  
  const CustomizedItems = (req, res) => {
    const id = req.params.id;
    const customizedToId = req.params.customizedToId;

    const conditions = [];
    if (id !== "0") {
        conditions.push({ customizedToId: id });
    }
    if (customizedToId !== "0") {
        conditions.push({ _id: customizedToId });
    }

    if (conditions.length === 0) {
        // Both IDs are "0", so no need to perform the query
        res.json([]);
        return;
    }

    RelatedItems.find({
        $or: conditions
    })
    .then((data) => { 
        res.json(data);
    })
    .catch((error) => {
        errorHandler(error, req, res);
    });
};


const LinkProduct = async (req, res) => {
  try {
  const item1Id  = req.params.item1Id;
  const item2Id  = req.params.item2Id;
  const {linkedProductsItem1,linkedProductsItem2} = req.body
  const Product1 = await RelatedItems.findByIdAndUpdate(item1Id, {linkedProducts:linkedProductsItem1}, { new: true });
  const updatedProduct1= await Product1.save();
  const Product2 = await RelatedItems.findByIdAndUpdate(item2Id, {linkedProducts:linkedProductsItem2}, { new: true });
  const updatedProduct2= await Product2.save();
  res.json({updatedProduct1,updatedProduct2});
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const getLinkProduct = async (req, res) => {
  try {
  const ProductId  = req.params.id;
  console.log(ProductId);
  const LinkedItems = await RelatedItems.find({ linkedProducts: { $in: ProductId } });
console.log(LinkedItems)
  res.json(LinkedItems);
  } catch (error) {
    errorHandler(error, req, res);
  }
};





module.exports = {
    addRelatedItem,
    allRelatedItems,
    RelatedItemsAll,
    OneRelatedItem,
    allCartItems,
    updateItemFav,
    favoriteItems,
    updateProductRate,
    updateProductQuantity,
    updateRelatedItemData,
    updateRelatedItemImage,
    price,
    CustomizedItems,
    LinkProduct,
    getLinkProduct,
    allRelatedItemsBy
}; 


