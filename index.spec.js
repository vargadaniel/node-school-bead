'use strict';

var request = require('supertest');
var app = require('./index');

describe('E2E tests', function() {
    
    var checkAlbums = function(expectedAlbums, done) {
    request(app)
        .get('/books')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
        books: expectedBooks
        }, done);
    };

  describe('GET /albums', function() {

    it('should get an empty array if there is no album saved yet', function(done) {
      request(app)
        .get('/albums')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, [], done );
    });

  });
  
  describe('GET /albums/1/', function() {

    it('should get 400 bad request if there is no album with this id', function(done) {
      request(app)
        .get('/albums/1')
        .set('Accept', 'image/jpeg')
        .expect('Content-Type', /image/)
        .expect(400, done );
    });

  });
  
  describe('POST /albums', function() {

    it('should get the id of the new album', function(done) {
      var album = [{ "frequency": 30, "title": "one" },
                    { "frequency": 30, "title": "two" },
                    { "frequency": 15, "title": "three" },
                    { "frequency": 25, "title": "four" }];
      request(app)
        .post('/albums')
        .send(album)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { id: 1 } ,done );
    });

  });
  
  describe('GET /albums/1/', function() {
    
    it('should return the album with id 1', function(done) {
      var album = [{ "frequency": 30, "title": "one" },
                    { "frequency": 30, "title": "two" },
                    { "frequency": 15, "title": "three" },
                    { "frequency": 25, "title": "four" }];
        
      request(app)
        .get('/albums/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {id: 1, songs: album }, done );
        
    });

  });
  
  describe('GET /albums', function() {

    it('should get the all album', function(done) {
        
      var album = [{ "frequency": 30, "title": "one" },
                   { "frequency": 30, "title": "two" },
                   { "frequency": 15, "title": "three" },
                   { "frequency": 25, "title": "four" }];
                
      request(app)
        .get('/albums')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, [ {id: 1, songs: album }], done );
    });

  });
  
  describe('GET /albums/1/best?top=2', function() {
    
    it('should return the top 2 song from the album with id 1', function(done) {
        
      request(app)
        .get('/albums/1/best?top=2')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, [{ "title": "four" }, { "title": "two" }], done );
        
    });

  });
  
  describe('GET /albums/1/best?top=0', function() {
    
    it('should return [] because the top is 0', function(done) {
        
      request(app)
        .get('/albums/1/best?top=0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, [], done );
        
    });

  });
  
  describe('GET /albums/1/best?top=', function() {
    
    it('should return 400 bad request because the paramater top is missing', function(done) {
        
      request(app)
        .get('/albums/1/best?top=')
        .set('Accept', 'image/jpeg')
        .expect('Content-Type', /image/)
        .expect(400, done );
        
    });

  });
  
  describe('GET /albums/1/best', function() {
    
    it('should return 400 bad request because the paramater top is missing', function(done) {
        
      request(app)
        .get('/albums/1/best')
        .set('Accept', 'image/jpeg')
        .expect('Content-Type', /image/)
        .expect(400, done );
        
    });

  });
  
  describe('GET /albums/9/best?top=2', function() {
    
    it('should return 400 bad request because there is no album with id 9', function(done) {
        
      request(app)
        .get('/albums/9/best?top=2')
        .set('Accept', 'image/jpeg')
        .expect('Content-Type', /image/)
        .expect(400, done );
        
    });

  });
  
  describe('GET /albums/bullshit/best?top=2', function() {
    
    it('should return 400 bad request because there is no album with id bullshit', function(done) {
        
      request(app)
        .get('/albums/bullshit/best?top=2')
        .set('Accept', 'image/jpeg')
        .expect('Content-Type', /image/)
        .expect(400, done );
        
    });

  });
  
  
  
});
