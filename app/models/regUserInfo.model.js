const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        nameUser: {
            type: String,
            require: [true, "RegUserInfo name is required"],
        },

        phoneUser: {
            type: String,
            require: [true, "RegUserInfo name is required"],
        },

        name: {
            type: String,
            require: [true, "RegUserInfo name is required"],
        },

        schedule: {
            type: String,
            require: [true, "RegUserInfo name is required"],
        },

        departure: {
            type: String,
            require: [true, "RegUserInfo name is required"],
        },
        
        price: { 
            type: String,
            require: [true, "RegUserInfo name is required"],
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

module.exports = mongoose.model("reg-user-info", schema); // .model: tao collection viet thuong so nhieu có all cac bien cua schema