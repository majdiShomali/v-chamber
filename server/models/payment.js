const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paymentSchema = new Schema({ 
    paymentMethodId: {
        type : String,
        required : false
    },
    deliveryAddress: {
        type : String,
        required : true
    },
    captureDetails: {
        type : Object,
        required : true
    },
    email: {
        type : String,
        required : false
    },
    status: {
        type : Boolean,
        required : true,
        default :false
    },
    cardholder: {
        type : String,
        required : false
    },
    phone: {
        type : String,
        required : false
    },
    country: {
        type : String,
        required : false
    },
    state: {
        type : String,
        required : false
    },
    address: {
        type : Object,
        required : false
    },
    name: {
        type : Object,
        required : false
    },
    amount: {
        type : Number,
        required : false
    },
    itemsCartData: {
        type : Array,
        required : true
    },
    itemsCartDataLocal: {
        type : Array,
        required : true
    },
    providerId: {
        type: Schema.Types.ObjectId,
        required : false
    },
    orderTime: {
        type : String,
        required : false
    },
    startDeliverTime: {
        type : String,
        required : false
    },
    deliveredTime: {
        type : String,
        required : false
    },
    startOrderFlag: {
        type : Boolean,
        required : false,
        default: true,
    },
    onWayOrderFlag: {
        type : Boolean,
        required : false,
        default: false,
    },
    deliveredOrderFlag: {
        type : Boolean,
        required : false,
        default: false,
    },

},
{timestamps : true}
)

 // 2- export the model with the schema
 module.exports = mongoose.model('Payment',paymentSchema);

