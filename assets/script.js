let apiKey = "15785ac3bfa5f8d614a115761164b031";
let testAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=44.9772995&lon=-93.2654692&appid=15785ac3bfa5f8d614a115761164b031";
let latitude = "44.9772995";
let longetitude = "-93.2654692"

let cityName = 'Minneapolis';
let Day1 = dayjs().format('dddd, MM/DD/YYYY');
let Day2 = dayjs().add(1, 'day').format('dddd, MM/DD/YYYY');
let Day3 = dayjs().add(2, 'day').format('dddd, MM/DD/YYYY');
let Day4 = dayjs().add(3, 'day').format('dddd, MM/DD/YYYY');
let Day5 = dayjs().add(4, 'day').format('dddd, MM/DD/YYYY');
let Day6 = dayjs().add(5, 'day').format('dddd, MM/DD/YYYY');

$('#result-text').text(cityName);

$('#Day1').text(Day1);
$('#Day2').text(Day2);
$('#Day3').text(Day3);
$('#Day4').text(Day4);
$('#Day5').text(Day5);
$('#Day6').text(Day6);

fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longetitude+'&appid='+apiKey)
.then(response => response.json())
.then(data => {
    for(i=0; i<6; i++) {
        $("#day"+(i+1)+"Hum").text("Humidity: " + Number(data.list[i].main.humidity) + "%");   
    }
    for(i=0; i<6; i++) {
        $("#day"+(i+1)+"Wind").text("Wind Speed: " + Number(data.list[i].wind.speed).toFixed(0) + "MPH");   
    }
    for(i=0; i<6; i++) {
        $("#day"+(i+1)+"Min").text("Min: " + Number((data.list[i].main.temp_min-273.15)*1.8+32).toFixed(1) + "°F");   
    }
    for(i=0; i<6; i++) {
        $("#day"+(i+1)+"Max").text("Max: " + Number((data.list[i].main.temp_max-273.15)*1.8+32).toFixed(1) + "°F");   
    }
    for(i=0; i<6; i++) {
        $("#day"+(i+1)+"Weather").text(data.list[i].weather[0].main + ': ');
    }
    for(i=0; i<6; i++) {
        $("#day"+(i+1)+"Img").attr('src','http://openweathermap.org/img/wn/'+ data.list[i].weather[0].icon + '.png');
    }
});

//Temperatures are on a 3 hr schedule adn not daily...//
//Select city to be inputted. City -> longetitude + lattitudde -> API//
// save data in local storage//
//display none until first click//
