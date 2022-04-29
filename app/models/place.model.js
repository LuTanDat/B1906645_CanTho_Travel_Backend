const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Place name is required"],
        },
        slug: {
            type: String,
            require: [true, "Place name is required"],
        },
        image: {
            type: String,
            require: [true, "Place name is required"],
        },
        description: {
            type: String,
            require: [true, "Place name is required"],
        },
        schedule: {
            type: String,
            require: [true, "Place name is required"],
        },
        departure: {
            type: String,
            require: [true, "Place name is required"],
        },
        numberOfSeatsAvailable: {
            type: Number,
            require: [true, "Place name is required"],
        },
        price: { 
            type: String,
            require: [true, "Place name is required"],
        }
    },
    { timestamp: true,}
);

// Replace _id with id and remove __V
schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("place", schema); // .model: tao collection viet thuong so nhieu có all cac bien cua schema