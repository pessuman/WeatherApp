
// api key : 82005d27a116c2880c8f0fcb866998a0
// my actual api key : a7e2acbf346677eaf8393254e2d8bb99

// Selecting elements
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// the App data
const weather = {};

weather.temperature = {
  unit : "celsius"
}

// APP Constants and variables
const KELVIN = 273;
// Api key
const key = "a7e2acbf346677eaf8393254e2d8bb99";

// checking if browser supports geolocation
if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>The browser does not support Geolocation.</p>";
}

// setting user's setPosition
function setPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

// show error when there is an issue
function showError(error){
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// get weather from api provider
function getWeather(latitude, longitude){
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

  console.log(api)

  fetch(api)
    .then(function(response){
    let data = response.json();
      return data;
    })
    .then(function(data){
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function(){
      displayWeather();
    });
}
 // Display weather to UI   //${weather.iconId}.png" alt="">`;
 function displayWeather(){
   iconElement.innerHTML = `<img src="icons/${weather.iconId}.png" alt="">`;
   tempElement.innerHTML = `${weather.temperature.value}<sup>o</sup><span>C</span>`;
   descElement.innerHTML = weather.description;
   locationElement.innerHTML = `${weather.city}, ${weather.country}`;
 }

// creating conversion from C to F
function celsiusToFahrenheit(temperature){
  return (temperature * 9/5) + 32;

}

// when the user clicks on the temprature elements
tempElement.addEventListener("click", function(){
  if(weather.temperature.value === undefined) return;

   if (weather.temperature.unit == "celsius"){
     let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
     fahrenheit = Math.floor(fahrenheit);

     tempElement.innerHTML = `${fahrenheit}<sup>o</sup><span>F</span>`;
     weather.temperature.unit = "fahrenheit";
   }else{
     tempElement.innerHTML = `${weather.temperature.value}<sup>o</sup><span>C</span>`;
     weather.temperature.unit = "celsius"
   }
})
