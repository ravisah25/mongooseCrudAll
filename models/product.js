const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');


const ProductSchema = new Schema({
    productID: {
        type: Number,
        required: [true, 'can\'t be blakn']
    },
    name: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    type:{
        type: String,
        enaum: ['soft', 'hard']
    }
});

autoIncrement.initialize(mongoose.connection)

ProductSchema.plugin(uniqueValidator, {
    message: 'already exists'
})

ProductSchema.plugin(autoIncrement.plugin, {
    model: 'Product',
    field: 'productID',
    startAt: 1
})

ProductSchema.index({ productID: 1 }, { unique: true })
// Export the model
module.exports = mongoose.model('Product', ProductSchema);