document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.querySelector("#city-input");
  const getWeatherBtn = document.querySelector("#get-weather-btn");

  const weatherInfo = document.querySelector("#weather-info");

  const cityName = document.querySelector("#city-name");
  const cityTemp = document.querySelector("#temperature");
  const citydesc = document.querySelector("#description");
  const errorMessage = document.querySelector("#error-message");

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;
    try {
      const weatherData = await fetchWeather(city);
      displayWeather(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeather(city) {
    let API_KEY = "60de5584a477dd8530015b9437c54ab9";
    const fetchResult = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
    );
    if (!fetchResult.ok) {
      throw new Error("City not found");
    }
    const data = await fetchResult.json();

    return data;
  }

  function displayWeather(weatherData) {
    // console.log(weatherData);
    const { name, main, weather } = weatherData;
    // console.log(name, main.temp, weather[0].description);
    cityName.textContent = name;
    cityTemp.textContent = main.temp + "°C";
    citydesc.textContent = weather[0].description;
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
