let weather = {
    apiKey: "APIKey Here",
    fetchWeather: function (city) {
        fetch( ///fetches the data from a input "city" and uses apiKey stored to get results
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data)) ///data goes to next function
    },

    displayWeather: function(data) {
        const { name } = data; ///takes city name out of results
        const { icon, description } = data.weather[0]; /// needs [0] because output is through array, so [0] is first value
        const { temp, humidity } = data.main;
        const { speed } = data.wind; ///windspeed
        console.log(name,icon,description,temp,humidity,speed) ///results shown in console
        ///GUI change below
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/h";

        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
        ///gets background image from search term 'name' (city name)

        document.querySelector(".weather").classList.remove("loading")
        ///removes.loading from .weather class if exists, otherwise does notihing
        ///helps with displaying a set weather at start instead of placeholder text
    },
    search: function () { ///this function gets stuff typed in search bar (case insensitive)
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
}

document
    .querySelector(".search button")
    .addEventListener("click", function () {
        weather.search(); ///gets content from search bar &  searches for it once button pressed
})

document ///makes it so you can use enter key not just button
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search()
        }
    })

weather.fetchWeather("Perth")