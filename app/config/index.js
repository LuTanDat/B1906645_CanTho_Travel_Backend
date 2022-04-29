const config = {
    app: {
        port: process.env.PORT || 8080,
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb://localhost:27017/CanTho_Travel"
    }
};

module.exports = config;