const appKey= "9d4e00f568572c0f5e8ce6cf0965050f";
// my set up api api key
let searchBtn= document.getElementById("search-btn");
let searchInput= document.getElementById("search-txt");
let cityName= document.getElementById("city-name")
let icon= document.getElementById("icon");
let temperature= document.getElementById("temp");
let humidity= document.getElementById("humidity-div");

searchBtn.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);

function enterPressed(event) {
  if (event.key === "Enter") {
    findWeatherDetails();
  }
}


function findWeatherDetails() {
  if (searchInput.value === "") {

  }else {
    let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid="+appKey;
   httpRequestAsync(searchLink, theResponse);
  }
 }

 function theResponse(response) {
   let jsonObject= JSON.parse(response);
   cityName.innerHTML=jsonObject.name;
   icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
   temperature.innerHTML= parseInt(jsonObject.main.temp - 273) + "°";
   humidity.innerHTML =jsonObject.main.humidity + "%";
 }

 //jsonObject turns the JSON back into readable JS, .innerHTML is part of DOM so alllws JS to mainpulate website
 // the parseInt parses a string to an integer ( also converts Kelvin to C in this case)

 function httpRequestAsync(url, callback) {
   console.log("hello");
   var httpRequest = new XMLHttpRequest();
   httpRequest.onreadystatechange = () => {
     if (httpRequest.readyState == 4 && httpRequest.status == 200)
     callback(httpRequest.responseText);
   }
   httpRequest.open("GET", url, true); // true for asynchronous
   httpRequest.send();
  }
