var APIkey = "4780efd2b8f8a268804dd13781a797d4";
var loc;
var cel = false;
var wd;

function displayTemp(fTemp, c){
  if(c) return Math.round((fTemp - 32) * (5/9)) + " °C";
  return Math.round(fTemp) + " °F";
}

function bgImage(wd) {
  if (wd.weather.id = 800) {
    $('body').css('background-image', 'url("https://images.unsplash.com/photo-1501682855625-15c985cd12a5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=24786866cf6aa9009096c706f1fd3454&auto=format&fit=crop&w=3450&q=80")');
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
}

$(function(){

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
});
