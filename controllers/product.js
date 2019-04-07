const jsonexport = require('jsonexport');
const product = require('../service/product');


//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

module.exports.product_create = async (req, res) => {

    try {
        let response = await product.upload(req);
        res.status(200).send({ success: true, error: false, data: response });
    }
    catch (e) {
        res.status(400).send({ success: false, error: true, data: `${e}` });
    }
};



exports.product_csv = function (req, res) {
    console.log(req);
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    var authorFile = req.files.file;

    var authors = [];

    csv
        .fromString(authorFile.data.toString(), {
            headers: true,
            ignoreEmpty: true
        })
        .on("data", function (data) {
            data['_id'] = new mongoose.Types.ObjectId();

            authors.push(data);
        })
        .on("end", function () {
            product.create(authors, function (err, documents) {
                if (err) throw err;

                res.send(authors.length + ' authors have been successfully uploaded.');
            });
        });
};

exports.product_details = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

exports.product_jsontocsv = function (req, res) {

    var contacts = [{
        name: 'Bob',
        lastname: 'Smith',
        family: {
            name: 'Peter',
            type: 'Father'
        }
    }, {
        name: 'James',
        lastname: 'David',
        family: {
            name: 'Julie',
            type: 'Mother'
        }
    }, {
        name: 'Robert',
        lastname: 'Miller',
        family: null,
        location: [1231, 3214, 4214]
    }, {
        name: 'David',
        lastname: 'Martin',
        nickname: 'dmartin'
    }];

    // jsonexport(contacts, function (err, csv) {
    //     if (err) return console.log(err);
    //     console.log(csv);
    // });
    var data;
    Product.find({}, { '_id': 0, '__v': 0 }, function (err, product) {
        if (err) return next(err);
        if (product) {
            console.log(product);
            data = product;

        }

    })
    setTimeout(function () {
        jsonexport(JSON.stringify(data), function (err, csv) {
            if (err) return console.log("fsdf", err);
            console.log(csv);
        });
    }, 10000);
};
exports.product_details1 = function (req, res) {
    Product.find(req.params.id, function (err, product) {
        if (err) return next(err);
        jsonexport(contacts, function (err, csv) {
            if (err) return console.log(err);
            console.log(csv);
        });

    })
};



exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};