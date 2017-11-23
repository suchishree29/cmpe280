/**
 * Created by Suchishree Jena on 11/21/2017.
 */
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/cmpe280');
console.log("Connected to MongoDb database");

var Image = require('../models/imagestore');

var images = [
    new Image({
        _id:1,
        name: "Image CMPE Building",
        imagePath: "https://s33.postimg.org/d98u4i3bj/image_cmpe_building.png"
    }),
    new Image({
        _id:2,
        name: "Image Dr. Martin Luther King Jr. Library",
        imagePath: "https://s33.postimg.org/yvnulnjxb/image_library.png"
    }),
    new Image({
        _id:3,
        name: "Image SJSU",
        imagePath: "https://s33.postimg.org/l1zhwhh0f/image_sjsu.png"
    })
];
var done = 0;
for(var i=0; i<images.length; i++){
    images[i].save(function(err,result) {
        done++;
        if(done === images.length){
            exit();
        }
    });
}

function exit() {
    console.log("Disconnected from Mongodb");
    mongoose.disconnect();
}


