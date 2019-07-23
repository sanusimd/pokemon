$(function() {
  var pokemonSearch;
  var pokemonDefault = "1";
   

  // intialize pakemon
  var initFunc = function() {
    var pokemonDefaultData = $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon/" + pokemonDefault,
      method: "GET"
    });

    pokemonDefaultData.done(function(data) {
      pokemonDefaultData = data;
      $(".pokedex .loading-container").addClass("active");
      $(".pokedex h3").text(data.name);
      $(".poke-img img").attr("src", data.sprites.front_default);
      
    });

    pokemonDefaultData.fail(function(jqXHR, textStatus) {
      alert("Request failed: " + textStatus);
    });
  };
  initFunc();

  $(".btn").on("click", function() {
    pokemonSearch = $('.pokedex .poke-input input[type="text"]').val();

    var request = $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon/" + pokemonSearch,
      method: "GET"
    });

    request.done(function(data) {
      $(".pokedex h3").text(data.name);
      $(".poke-img img").attr("src", data.sprites.front_default);
    
    });

    request.fail(function(jqXHR, textStatus) {
      alert("Request failed: " + textStatus);
    });
  });
  // Pokemon list display button
  $(".btn-pokemon").on("click", function() {
    $(".loading-pokemon").addClass("active-pokemon");
    // Request for pokemon data 
    var request = $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon/?limit=811",
      method: "GET"
    });
// when request done , data retrived from API
    request.done(function(data) {
    //  loop through Array result from API
     $.each(data.results, function(index, pokemon){
      var name = pokemon.name;
      var par = $("<p>").html(name)
      par.appendTo(".loading-pokemon")

      // add click event on list items which was append to paragraph
      par.click(function(){   
        var pokemonUrl ="https://pokeapi.co/api/v2/pokemon/" 
        $.getJSON(pokemonUrl + pokemon.name).done(function(details){
          $(".pokedex h3").text(details.name);
          $(".poke-img img").attr("src", details.sprites.front_default);
        });
       
      });

     });
    });

    //  request fail please display message error 
    request.fail(function(jqXHR, textStatus) {
      alert("Request failed: " + textStatus);
    });
  });
});
