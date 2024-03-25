const mongoose = require("mongoose");

// Connection
mongoose.connect('mongodb+srv://mayank1:mayank@cluster0.gofngw1.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connected");
})
.catch(err => {
    console.error("Error connecting to MongoDB:", err);
});

module.exports = mongoose;