const product = require('../models/product')

module.exports.upload = (body) =>{

    return await product.create(body);

}