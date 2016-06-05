'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var albums = require('./albums').create();
var BestSongFinder = require('./bestsongfinder');

app.use(bodyParser.json());

app.get('/albums', function(req, res) {
  var allAlbum = albums.getAlbums();
  res.status(200).send(allAlbum);
});

app.get('/albums/:id', function(req, res) {
  var album = albums.getAlbum(req.params.id);
  if(album) {
      res.status(200).send(album);  
  } else { 
      res.status(400).sendFile(path.join(__dirname,'400.jpg'));  
  }
});

app.get('/albums/:id/best', function(req, res) {
    var album = albums.getAlbum(req.params.id);
    if(album && req.query.top) {
        const bestSongsFinder = new BestSongFinder(album, req.query.top);
        const bestSongs = bestSongsFinder.find();
        res.status(200).send(bestSongs);
    } else {
        res.status(400).sendFile(path.join(__dirname,'400.jpg')); 
    }
    
});

app.post('/albums', function(req, res) {
    var id = albums.addAlbum(req.body);
    res.status(200).send({id: id});
});

app.listen(3000, function () {
  console.log('Server is listening on port ', this.address().port);
});

module.exports = app;



