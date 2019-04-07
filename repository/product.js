const product = require('../models/product')

module.exports.upload = async (body) =>{
    return await product.create(body);
}