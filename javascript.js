getWeather();
var APIkey = "4780efd2b8f8a268804dd13781a797d4";
var loc;
var cel = false;
var wd;

function displayTemp(fTemp, c){
  if(c) return Math.round((fTemp - 32) * (5/9)) + " °C";
  return Math.round(fTemp) + " °F";
};

function bgImage(wd) {
  var wID = wd.weather[0].id;
  if (wID <= 232) {
    $('body').css('background-image', 'url("images/thunderstorm.jpg")');
    $('.signature').html('Photo by<br> Shashank Sahay<br> on Unsplash')
  } if (wID >= 300 && wID <= 531) {
    $('body').css('background-image', 'url("images/rainy.jpg")');
    $('.signature').html('Photo by<br> Gabriele Diwald<br> on Unsplash')
  } if (wID >= 600 && wID <= 622) {
    $('body').css('background-image', 'url("images/snowy.jpg")');
    $('.signature').html('Photo by<br> Nathan Fertig<br> on Unsplash')
  } if (wID >= 701 && wID <= 781) {
    $('body').css('background-image', 'url("images/foggy.jpg")');
    $('.signature').html('Photo by<br> Frances Gunn<br> on Unsplash')
  } if (wID == 800) {
    $('body').css('background-image', 'url("images/sunny.jpg")');
    $('.signature').html('Photo by<br> Craig Strahorn<br> on Unsplash')
  } if (wID >= 801 && wID <= 804) {
    $('body').css('background-image', 'url("images/cloudy.jpg")');
    $('.signature').html('Photo by<br> Vidar Nordli-Mathisen<br> on Unsplash')
  };
};

function render(wd, cel) {
  var currentLocation = wd.name;
  var currentWeather = wd.weather[0].description;
  var currentTemp = displayTemp(wd.main.temp, cel);
  var tempMax = displayTemp(wd.main.temp_max, cel);
  var tempMin = displayTemp(wd.main.temp_min, cel);

  $('#currentLocation').html(currentLocation);
  $('#currentTemp').html(currentTemp);
  $('#currentWeather').html(currentWeather);
  $('#minMax').html(tempMin + " | " + tempMax);

  bgImage(wd);
};

function getWeather(){

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      loc = [position.coords.latitude, position.coords.longitude];

      $.getJSON('https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=' + loc[0] + '&lon=' + loc[1] + '&APPID=' + APIkey, function(apiData) {
        wd = apiData;

        render(apiData, cel);

        $('#cels').click(function(){
          cel = true;
          render(wd, cel);
        });
        $('#fahr').click(function(){
          cel = false;
          render(wd, cel);
        });
      });
    });
  };
};
