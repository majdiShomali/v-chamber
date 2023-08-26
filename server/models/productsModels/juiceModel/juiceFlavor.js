const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//1- Create a new schema 
const juiceFlavorSchema = new Schema({   
    flavor: {
        type : String,
        required : true
    },
    category: {
        type : String,
        required : true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      ProviderId: {
        type: Schema.Types.ObjectId,
        required: true,
      },

      
    },
     {timestamps : true}
    )

    // 2- export the model with the schema
    module.exports = mongoose.model('JuiceFlavor',juiceFlavorSchema);




    