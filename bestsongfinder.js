'use strict';

class BestSongFinder {

  constructor(songs, countOfNeededSongs) {
    this._songs = songs;   
    this._n = countOfNeededSongs;
  }
  
  find() {
      var res = [];
      this.getSortedQualityIndexes().slice(0, this._n).forEach(x => res.push({ title: x.title }) );
      return res;
  }
  
  getZipfK(k) {
      /*
      var n = this._songs.songs.length;
      var sum = 0;
      for(var i = 1; i <= n; i++) {
          sum += 1/i;
      }
      var num = (1/k)/sum;
      return Math.round(num * 100) / 100;*/
  }
  
  getQualityIndexK(k) {
      var num = this._songs.songs[k-1].frequency/(this._songs.songs.length-k+1);
      return Math.round(num * 100) / 100;
  }
  
  getSortedQualityIndexes() {
      var sorted = [];
      for(var i = 1; i <= this._songs.songs.length; i++) {
          sorted.push({title: this._songs.songs[i-1].title, q: this.getQualityIndexK(i)});
      }
      sorted.sort(function(a,b) {
         return b.q - a.q; 
      });
      return sorted;
  }

}

module.exports = BestSongFinder;
