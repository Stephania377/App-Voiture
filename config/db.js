const mongoose = require("mongoose")

mongoose
    .connect(
        `mongodb://localhost:27017/${process.env.DB_NAME}`,
        {
            useNewUrlParser: true,
            useUnifiedTopologie: true,
            useCreateIndex: true,
            useFindAndModify: true
        }
    ).then(() => { console.log("Connected to mongodb") })
    .catch((err) => { console.log("Failed to connect",err) })