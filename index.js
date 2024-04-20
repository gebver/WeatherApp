const apiKey = "d316f4aadde36763cff202619678931e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBar = document.getElementById("search");
const loupe = document.getElementById("searchIcon");
const weatherImg = document.querySelector(".weatherIcon");

window.onload =  setWeather("warsaw");

async function setWeather(city)
{
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(response.status === 404){
    
        const errorInfo = document.getElementById("errorInfo");
        errorInfo.style.display = "block";
        errorInfo.innerHTML = "Invalid city name!";

    }else{
        errorInfo.style.display = "none";
        var data = await response.json();

        //Assignment to a property from the date object
        document.querySelector("#city").innerHTML = data.name;
        document.querySelector("#temp").innerHTML = Math.round(data.main.temp) + "℃";
        document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
        document.querySelector("#windSpeed").innerHTML = data.wind.speed + " km/h";

        //Images update
        if(data.weather[0].main === "Clouds"){
            weatherImg.src = "images/clouds.png"
        }
        else if(data.weather[0].main === "Clear"){
            weatherImg.src = "images/clear.png"
        }
        else if(data.weather[0].main === "Rain"){
            weatherImg.src = "images/rain.png"
        }
        else if(data.weather[0].main === "Drizzle"){
            weatherImg.src = "images/drizzle.png"
        }
        else if(data.weather[0].main === "Mist"){
            weatherImg.src = "images/mist.png"
        }

        
    }

  

}

loupe.addEventListener("click", function() {

    if(searchBar.value === "")
    {
        const errorInfo = document.getElementById("errorInfo");
        errorInfo.style.display = "block";
        errorInfo.innerHTML = "Enter city name!";
    }else{
        setWeather(searchBar.value);
    }

    searchBar.value = "";
});





