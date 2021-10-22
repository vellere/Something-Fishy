const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    }
}, {timestamps: true});
// CTK{PAt!3nc3_is_an_Art_0f_h0p!ng!}
module.exports = mongoose.model('Product', productSchema);