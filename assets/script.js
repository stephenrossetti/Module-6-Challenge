// global variables //
let apiKey = "15785ac3bfa5f8d614a115761164b031";
let cityName = '';
let cityURL = '';
let listContainer = $('#SearchContainer');
let searchHistoryList = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Testing API key and link to navgiate through API data. Use for testing purposes//
// let testAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=44.9772995&lon=-93.2654692&units=imperial&appid=15785ac3bfa5f8d614a115761164b031";

// Create a function that the Saved Searches title only appears if there is saved data to append. Function will run on page load and after each search //
function saveTitle () {
    if (searchHistoryList.length > 0) {
        document.getElementById("savedSearchesTitle").style.display = "block";
    }
}

saveTitle ();

// Set any new cityName (from click function) into the localStorage variavle and stringify the data. Then run the get localStorage function//
function searchHistoryInputs() {
    if (!searchHistoryList.includes(cityName)) {
        searchHistoryList.push(cityName);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistoryList));
        searchHistory();
    }
}

// Run the localStorage function to retrieve and append the cityName in saved searches container. Also, on click of saved data the weather function will run//
function searchHistory() {
    listContainer.empty();
    searchHistoryList.forEach(function (cityName) {
        let listItem = $('<button>');
        listItem.addClass('btn btn-success');
        listItem.text(cityName);
        listContainer.append(listItem);
        listItem.on("click", function () {
            cityName = $(this).text();
            cityURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey;
            console.log(cityURL);
            reset();
            forecastInput();
        })
    })
}

// Run function on page load regardless if search bar is used. Previous data from previous search will be displayed//
searchHistory();

// Function for when the search button is pressed. Will create a new city name and also push that into URL for API. It will also save data into localStorage and reset the page if city is already inputted//
$('#cityButton').on("click", function () {
    event.preventDefault();
    cityName = $('#cityInput').val();
    cityURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey;
    $('#result-text').text(cityName);
    reset();
    forecastInput();
    imageDisplay();
    searchHistoryInputs();
    saveTitle();
})

// Function for error in city name. Will hide divs and add an error div//
function error() {
    document.getElementById("incorrectCity").style.display = "block";
    document.getElementById("contentBlock").style.display = "none";
    document.getElementById("5dayfcst").style.display = "none";
}

// Resets page after each search if new city is selected//
function reset() {
    document.getElementById("contentBlock").style.display = "block";
    document.getElementById("incorrectCity").style.display = "none";
    document.getElementById("5dayfcst").style.display = "block";
}

// Overall forecast function that will display the current and future weather for city selected//
// Includes current city and that specific API URL as well as forecasted data in separated API URL//
// Need to first use a city API URL to retrieve longetitude and latitude data//
// When long and lat data are obtained to run OpenWeather API, append or add text dynamically for necessary data//
function forecastInput() {
    fetch(cityURL)
        .then(function (response) {
            if (response.status != 200) {
                console.log("Not a City!");
                error();
                searchHistoryList.pop();
            } else {
                return response.json();
            }
        })
        .then(data => {
            let longetitude = data.coord.lon;
            let latitude = data.coord.lat;
            let currentURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longetitude + '&units=imperial&appid=' + apiKey;
            return fetch(currentURL);
        })
        .then(response => response.json())
        .then(data => {
            $("#day1Hum").text("Humidity: " + Number(data.main.humidity) + "%");
            $("#day1Wind").text("Wind Speed: " + Number(data.wind.speed).toFixed(0) + "MPH");
            $("#day1Min").text("Min: " + Number(data.main.temp_min).toFixed(1) + "°F");
            $("#day1Max").text("Max: " + Number(data.main.temp_max).toFixed(1) + "°F");
            $("#day1Weather").text(data.weather[0].main + ': ');
            $("#day1Img").attr('src', 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png');
        })

        // Use for loop for multiple days//
    fetch(cityURL)
        .then(response => response.json())
        .then(data => {
            let longetitude = data.coord.lon;
            let latitude = data.coord.lat;
            let forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longetitude + '&units=imperial&appid=' + apiKey;
            return fetch(forecastURL);
        })
        .then(response => response.json())
        .then(data => {
            for (i = 0; i < 6; i++) {
                $("#day" + (i + 2) + "Hum").text("Humidity: " + Number(data.list[i].main.humidity) + "%");
            }
            for (i = 0; i < 6; i++) {
                $("#day" + (i + 2) + "Wind").text("Wind Speed: " + Number(data.list[i].wind.speed).toFixed(0) + "MPH");
            }
            for (i = 0; i < 6; i++) {
                $("#day" + (i + 2) + "Min").text("Min: " + Number(data.list[i].main.temp_min).toFixed(1) + "°F");
            }
            for (i = 0; i < 6; i++) {
                $("#day" + (i + 2) + "Max").text("Max: " + Number(data.list[i].main.temp_max).toFixed(1) + "°F");
            }
            for (i = 0; i < 6; i++) {
                $("#day" + (i + 2) + "Weather").text(data.list[i].weather[0].main + ': ');
            }
            for (i = 0; i < 6; i++) {
                $("#day" + (i + 2) + "Img").attr('src', 'http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '.png');
            }
        });
}

// Variables and time inputs for each day//
let Day1 = dayjs().format('dddd, MM/DD/YYYY');
let Day2 = dayjs().add(1, 'day').format('dddd, MM/DD/YYYY');
let Day3 = dayjs().add(2, 'day').format('dddd, MM/DD/YYYY');
let Day4 = dayjs().add(3, 'day').format('dddd, MM/DD/YYYY');
let Day5 = dayjs().add(4, 'day').format('dddd, MM/DD/YYYY');
let Day6 = dayjs().add(5, 'day').format('dddd, MM/DD/YYYY');

$('#Day1').text(Day1);
$('#Day2').text(Day2);
$('#Day3').text(Day3);
$('#Day4').text(Day4);
$('#Day5').text(Day5);
$('#Day6').text(Day6);

// Only display images when a city is selected//
function imageDisplay() {
    document.getElementById("day1Img").style.display = "block";
    document.getElementById("day2Img").style.display = "block";
    document.getElementById("day3Img").style.display = "block";
    document.getElementById("day4Img").style.display = "block";
    document.getElementById("day5Img").style.display = "block";
    document.getElementById("day6Img").style.display = "block";
}
