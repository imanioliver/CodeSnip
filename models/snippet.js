const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const Schema = mongoose.Schema;



// mongoose.connect("mongodb://localhost:27017/codesnipDirectory");

const snippetSchema = new Schema({

    title: {type: String, required: true || null},
    description: String || null,
    language: {type: String, required: true || null},
    code: {type: String, required: true || null},
    tags: [String] || null,
    userId: String || null,
    //mongo id is assigned for each tag
});

const Snippet = mongoose.model("Snippet", snippetSchema);

module.exports = Snippet;
