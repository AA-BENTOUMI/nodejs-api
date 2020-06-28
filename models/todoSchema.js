var mongoose = require("mongoose");
var todoSchema = new mongoose.Schema({
    // userid: String,
    book:String
})
module.exports = mongoose.model("book", todoSchema) 