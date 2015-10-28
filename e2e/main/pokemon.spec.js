'use strict';

describe('Pokemon', function() {
  var expectPokemonNames = function(expectedNames, key) {
    element.all(by.repeater(key + ' in friends').column(key + '.name')).then(function(arr) {
      arr.forEach(function(wd, i) {
        expect(wd.getText()).toMatch(expectedNames[i]);
      });
    });
  };

  it('should search across all fields when filtering with a string', function() {
    var searchPokemons = element(by.model('searchPokemons'));
    searchPokemons.clear();
    searchPokemons.sendKeys('m');
    expectPokemonNames(['Mary', 'Mike', 'Adam'], 'friend');

    searchPokemons.clear();
    searchPokemons.sendKeys('76');
    expectPokemonNames(['John', 'Julie'], 'friend');
  });
});
