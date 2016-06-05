'use strict';

class Albums {

  constructor() {
    this._albums = [];
  }
  
  addAlbum(album) {
    var album_id = this._albums.length + 1;
    this._albums.push({id: album_id, songs: album});
    return album_id;
  }
  
  getAlbums() {
    return this._albums;
  }
  
  getAlbum(id) {
      return this._albums[id-1];
  }
     
  static create() {
    var test = new Albums();
    /*test.addAlbum([{frequency: 10, title: 'Stan'},
                    {frequency: 10, title: 'Headlights'},
                    {frequency: 10, title: 'Lose Yourself'}]);
                    
    test.addAlbum([{frequency: 10, title: 'Back in Black'},
                    {frequency: 20, title: 'Big Gun'},
                    {frequency: 30, title: 'T.N.T'}]);*/
                    
    return test;
  }

}

module.exports = Albums;
