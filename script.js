const apiKey = "66205e24515cca88ddb204e44416c3d3"
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`
const searchBox = document.querySelector(".search-box")
const searchBtn = document.querySelector(".search-btn")

// document.querySelector(".weather").style.display = "none"


async function getWeather(city) {
    const response = await fetch(`${apiUrl}&q=${city}`)
    const data = await response.json()

    if (response.status !== 200) {
        document.getElementById("error").innerText = "City not found!";
        searchBox.style.border = "2px solid red"
        return;
    }


    console.log(data)

    document.querySelector(".city").innerHTML = data.name
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h"

    const iconCode = data.weather[0].icon
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    document.querySelector(".weather-icon").src = iconUrl

    document.querySelector(".weather").style.display = "block"

    searchBox.value = ""
}
searchBtn.addEventListener("click", () => {
    getWeather(searchBox.value)
})
searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        getWeather(searchBox.value)
    }
})