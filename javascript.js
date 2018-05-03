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
  if (wd.weather.id <= 232) {
    $('body').css('background-image', 'url("images/thunderstorm.jpg")');
  } else if (wd.weather.id >= 300 && wd.weather.id <= 531) {
    $('body').css('background-image', 'url("images/rainy.jpg")');
  } else if (wd.weather.id >= 600 && wd.weather.id <= 622) {
    $('body').css('background-image', 'url("images/snowy.jpg")');
  } else if (wd.weather.id >= 701 && wd.weather.id <= 781) {
    $('body').css('background-image', 'url("images/foggy.jpg")');
  } else if (wd.weather.id = 800) {
    $('body').css('background-image', 'url("images/sunny.jpg")');
  } else if (wd.weather.id >= 801 && wd.weather.id <= 804) {
    $('body').css('background-image', 'url("images/cloudy.jpg")')
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
