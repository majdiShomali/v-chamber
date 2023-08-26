const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//1- Create a new schema 
const itemCategorySchema = new Schema({   
    Name: {
        type : String,
        required : true
    },
    ProviderId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
    category: {
        type : String,
        required : true
    },
    image:{
        type : String,
        required : true,
    },
    description: {
        type : String,
        required : true
    },
    UsersIdFavorite: {
        type : Array,
        required : false
    },
    rate: {
        type: Array,
        required: false,
      },
      rating: {
        type: String,
        required: false,
        default: "5",
      },
      UsersIdRate: {
        type: Array,
        required: false,
      },

 
    },
     {timestamps : true}
    )

    // 2- export the model with the schema
    module.exports = mongoose.model('ItemCategory',itemCategorySchema);




    