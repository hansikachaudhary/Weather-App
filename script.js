// script.js
const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key from OpenWeatherMap or another weather service

document.getElementById('getWeather').addEventListener('click', () => {
    const location = document.getElementById('location').value;
    if (location) {
        fetchWeather(location);
    }
});

document.getElementById('getLocationWeather').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoords(latitude, longitude);
        }, error => {
            alert('Unable to retrieve your location.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});

function fetchWeather(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => alert('Unable to retrieve weather data.'));
}

function fetchWeatherByCoords(latitude, longitude) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => alert('Unable to retrieve weather data.'));
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    if (data.cod === 200) {
        weatherDisplay.innerHTML = `
            <h2>Weather in ${data.name}, ${data.sys.country}</h2>
            <p>${data.weather[0].description}</p>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } else {
        weatherDisplay.innerHTML = '<p>Weather data not found.</p>';
    }
}
