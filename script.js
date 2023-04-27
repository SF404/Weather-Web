const apiKey = "c1ab2c00ee8700801e0052c1001c8f54";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

async function getWeather(city) {
    const response = await fetch(apiUrl + "&appid=" + apiKey + "&q=" + city);
    var data = await response.json();
    if (data.cod == 200) updateValues(data);
    else if (data.cod == 404) alert("City Not Found");
    else alert("Error fetching data from API")
}

function $(id) {
    return document.getElementById(id);
}

const updateValues = (data) => {
    const date = new Date(data.dt * 1000)
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);
    $("currentDate").innerText = date.getDate() + "/" + (date.getMonth() + 1).toString().padStart(2, 0);
    $("currentTime").innerText = date.getHours() + ":" + date.getMinutes();
    $("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    $("currentWeather").style.background = `url('images/${data.weather[0].icon}.jpg') no-repeat center center/cover`;
    $("temperature").innerText = data.main.temp.toFixed(0);
    $("description").innerText = data.weather[0].main;
    $("feelTemp").innerText = data.main.feels_like.toFixed(0);
    $("sunrise").innerText = sunrise.getHours().toString().padStart(2, "0") + ":" + sunrise.getMinutes().toString().padStart(2, "0");
    $("sunset").innerText = sunset.getHours().toString().padStart(2, "0") + ":" + sunset.getMinutes().toString().padStart(2, "0");
    $("city").innerText = data.name;
    $("wind").innerText = data.wind.speed + " m/s";
    $("humidity").innerText = data.main.humidity + " %";
    $("pressure").innerText = data.main.pressure + " mb"
    $("map").src = `https://maps.google.com/maps/place?q=${data.name}&output=embed`;

}

$("form").addEventListener('submit', changeLocation);
function changeLocation(event) {
    event.preventDefault();
    const cityName = $("locationInput").value;
    getWeather(cityName);
}
window.onload = () => {
    getWeather('Srinagar');
}