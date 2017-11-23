/**
 * Created by Suchishree Jena on 11/21/2017.
 */
var express = require('express');
var router = express.Router();
var redisClient = require('redis').createClient;
var redis = redisClient(6379, 'localhost');
var redisConnected = false;

var ImageStore = require('../models/imagestore');


redis.on('error', function() {
    redisConnected = false;
});

redis.on('connect', function() {
    redisConnected = true;
});

router.get('/', function(req, res, next) {
    ImageStore.find(function (err,docs) {
        res.render('redisdemo');
    });
});

router.get('/send/:id',function (req, res, next) {
    var imageId = req.params.id;
    if (redisConnected) {
        redis.get(imageId, function(err, reply) {
            if (err === null && typeof(reply) === 'string') {
                res.json({
                    image: reply,
                    text: "Image loaded from: Cache"
                });
            } else {
                ImageStore.findById(imageId, function (err, result) {
                    if (err) {
                        return res.json(err);
                    }
                    res.json({
                        image: result.imagePath,
                        text: "Image loaded from: DB"
                    });
                    redis.set(imageId, result.imagePath);
                });
            }
        });
    }
});

module.exports = router;
