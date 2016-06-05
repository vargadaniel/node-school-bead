'use strict';

var expect = require('chai').expect;
var BestSongFinder = require('./bestsongfinder');

describe('BestSongFinder', function() {
  
  describe('#quality_index', function() {

    it(`should return the quality_index of the first element`, function() {
      var bestSongFinder = new BestSongFinder({id: 1, songs: [{frequency: 10, title: "Stan"}, {frequency: 10, title: "Lose Yourself"}]}, 1);
      var k = bestSongFinder.getQualityIndexK(1);
      expect(k).to.eql(5);
    });
    
    it(`should return the quality_index of the second element`, function() {
      var bestSongFinder = new BestSongFinder({id: 1, songs: [{frequency: 10, title: "Stan"}, {frequency: 10, title: "Lose Yourself"}]}, 1);
      var k = bestSongFinder.getQualityIndexK(2);
      expect(k).to.eql(10);
    });

  });
  
  describe('#sorted_quality_index', function() {

    it(`should return the sorted quality array`, function() {
      var bestSongFinder = new BestSongFinder({id: 1, songs: [{frequency: 10, title: "Stan"}, {frequency: 10, title: "Lose Yourself"}]}, 1);
      var sorted = bestSongFinder.getSortedQualityIndexes();
      expect(sorted).to.eql([{title: 'Lose Yourself', q:10},{title: 'Stan', q: 5}]);
    });

  });
  
  describe('#find_tests', function() {

    it(`should return with the top 3 song (second test)`, function() {
      var test_songs = [{ "frequency": 197812, "title": "re_hash" },
                        { "frequency": 78906, "title": "5_4" },
                        { "frequency": 189518, "title": "tomorrow_comes_today" },
                        { "frequency": 39453, "title": "new_genious" },
                        { "frequency": 210492, "title": "clint_eastwood" },
                        { "frequency": 26302, "title": "man_research" },
                        { "frequency": 22544, "title": "punk" },
                        { "frequency": 19727, "title": "sound_check" },
                        { "frequency": 17535, "title": "double_bass" },
                        { "frequency": 18782, "title": "rock_the_house" },
                        { "frequency": 198189, "title": "19_2000" },
                        { "frequency": 13151, "title": "latin_simone" },
                        { "frequency": 12139, "title": "starshine" },
                        { "frequency": 11272, "title": "slow_country" },
                        { "frequency": 10521, "title": "m1_a1" }];
      var bestSongFinder = new BestSongFinder({id: 1, songs: test_songs }, 3);
      var best_songs = bestSongFinder.find();
      expect(best_songs).to.eql([{ "title": "19_2000" }, { "title": "clint_eastwood" }, { "title": "tomorrow_comes_today" }]);
    });
    
    it(`should return with the top 3 song (first test)`, function() {
      var test_songs = [{ "frequency": 30, "title": "one" },
                        { "frequency": 30, "title": "two" },
                        { "frequency": 15, "title": "three" },
                        { "frequency": 25, "title": "four" }];
      var bestSongFinder = new BestSongFinder({id: 1, songs: test_songs }, 2);
      var best_songs = bestSongFinder.find();
      expect(best_songs).to.eql([{ "title": "four" }, { "title": "two" }]);
    });
    
    it(`should return with [] because the top is 0`, function() {
      var test_songs = [{ "frequency": 30, "title": "one" },
                        { "frequency": 30, "title": "two" },
                        { "frequency": 15, "title": "three" },
                        { "frequency": 25, "title": "four" }];
      var bestSongFinder = new BestSongFinder({id: 1, songs: test_songs }, 0);
      var best_songs = bestSongFinder.find();
      expect(best_songs).to.eql([]);
    });

  });


});
