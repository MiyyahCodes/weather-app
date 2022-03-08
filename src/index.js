function currentDay() {
  let date = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesay",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDate = days[date.getDay()];
  let time = date.getHours();
  if (time < 10) {
    time = `0${time}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let h3 = document.querySelector("h3");
  h3.innerHTML = ` ${currentDate},  ${time}:${minute}`;
}
function mainWeather(response) {
  document.querySelector(".cityName").innerHTML = response.data.name;
  celsiusTemperature = Math.round(response.data.main.temp);
  document.querySelector("#mainWeather").innerHTML = celsiusTemperature;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
}
function searchCity(event) {
  event.preventDefault();
  currentDay();
  let city = document.querySelector("#search").value;
  let apiKey = "a8abc05c136ad31a0eb3d9ef118a4a0c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(mainWeather);
}
function geolocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "a8abc05c136ad31a0eb3d9ef118a4a0c";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(mainWeather);
}
let celsiusTemperature = null;
function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#mainWeather");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
function showFarenheit(event) {
  event.preventDefault();
  let farenheitConversion = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#mainWeather");
  temperatureElement.innerHTML = Math.round(farenheitConversion);
}
function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(geolocation);
}
function changeBodyBg() {
  document.body.style.backgroundImage =
    "radial-gradient(circle at 10% 20%, rgb(90, 92, 106) 0%, rgb(32, 45, 58) 81.3%)";
}
let themeButton = document.querySelector("#theme");
themeButton.addEventListener("click", changeBodyBg);
let form = document.querySelector("form");
form.addEventListener("submit", searchCity);
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", currentPosition);
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showCelsius);
let farenheit = document.querySelector("#farenheit-link");
farenheit.addEventListener("click", showFarenheit);
