
const Product = require('../repository/product');


module.exports.upload = async (req) => {

    if (!req.body) {
        throw new Error("req is empty");
    }

    return await Product.upload(req.body);

}