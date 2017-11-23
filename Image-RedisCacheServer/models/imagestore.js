/**
 * Created by Suchishree Jena on 11/21/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
    _id: {type:String},
    name: {type:String, required:true},
    imagePath: {type:String, required:true}
});

module.exports = mongoose.model('Imagestore', ImageSchema);
