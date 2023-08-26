const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//1- Create a new schema 
const productStickerSchema = new Schema({   

    Name: {
        type : String,
        required : true
    },
    category: {
        type : String,
        required : true
    },
    type: {
        type : String,
        required : false
    },
    company: {
        type : String,
        required : false
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      ProviderId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
    image:{
        type : String,
        required : true,
    },
    totalQuantity:{
        type : Number,
        required : true,
    },
    price:{
        type : Number,
        required : true,
    },
    salePrice:{
        type : Number,
        required : true,
    },
    color: {
        type : String,
        required : false
    },
    description: {
        type : String,
        required : false
    },
    size:{
        type : String,
        required : false,
    },
    nikotin:{
        type : String,
        required : false,
    },
    vapePuff: {
        type : Number,
        required : false
    },
    chargeVape: {
        type : String,
        required : false
    },
     juice: {
        type : String,
        required : false
    },
     flavor: {
        type : String,
        required : false
    },
    UsersIdFavorite: {
        type : Array,
        required : false
    },
    quantity:{
        type : Number,
        required : false,
        default : 1
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

    RelatedItemId: {
        type: Schema.Types.ObjectId,
        required: true,
      },

    },
     {timestamps : true}
    )

    // 2- export the model with the schema
    module.exports = mongoose.model('ProductSticker',productStickerSchema);




    