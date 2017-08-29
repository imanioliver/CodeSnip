const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const Schema = mongoose.Schema;



// mongoose.connect("mongodb://localhost:27017/codesnipDirectory");

const snippetSchema = new Schema({

    title: {type: String, required: true},
    description: String,
    language: {type: String, required: true},
    code: {type: String, required: true},
    tags: [String],
    userId: String,
    username: String
    //mongo id is assigned for each tag
});

const Snippet = mongoose.model("Snippet", snippetSchema);

module.exports = Snippet;
