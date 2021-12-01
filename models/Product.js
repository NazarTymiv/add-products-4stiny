const { Schema, model } = require("mongoose");

const schema = new Schema({
    name: { type: String, required: true },
    producer: { type: String, required: true },
    article: { type: String, required: true },
    availability: { type: Number, required: true},
    price: { type: Number, required: true, min: 0}
});

module.exports = model('Product', schema);