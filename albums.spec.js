'use strict';

var expect = require('chai').expect;
var albums = require('./albums').create();

describe('Albums', function() {

  describe('#album_store_tests', function() {

    it(`should return the new album index`, function() {
      var id = albums.addAlbum([{frequency: 10, title: 'Smells Like Teen Spirit'},
                                {frequency: 10, title: 'Something In The Way'},
                                {frequency: 10, title: 'The Man Who Sold The World'}]);
      expect(id).to.eql(1);
    });
    
    it(`should return the new album`, function() {
      var album = albums.getAlbum(1);
      expect(album).to.eql({id: 1, songs: [{frequency: 10, title: 'Smells Like Teen Spirit'},
                                            {frequency: 10, title: 'Something In The Way'},
                                            {frequency: 10, title: 'The Man Who Sold The World'}]});
    });
    
    it(`should return undefined`, function() {
      var album = albums.getAlbum(100);
      expect(album).to.eql(undefined);
    });

  });
  
});
