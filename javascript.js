if (navigator.geolocation){
  navigator.geolocation.getCurrentPosition(function(position) {
    $("#data").html("latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude);
  });
}

$(document).ready(function() {
  var weather =

  $.getJSON("https://fcc-weather-api.glitch.me/", function(json) {
    $(".message").html(JSON.stringify(json));
  });
});
