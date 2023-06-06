let left = document.getElementById('left');
let right = document.getElementById('right');
let city_index = 1
let history = 10



// Listu s mestami a APInami na thinkspeak
const city_list = [
    {
        name:'Kysucké Nové Mesto',
        baseUrl:'https://api.thingspeak.com/channels/2175803/feeds.json?results='
},
    
{
    name: 'Žilina',
    baseUrl:'https://api.thingspeak.com/channels/2096878/feeds.json?results='
},
{
    name:'Bratislava',
    baseUrl: 'https://api.thingspeak.com/channels/2176904/feeds.json?results='
},
    
    
]

let city = city_list[1].name

// Funkcia na preklik na ďalšie mesto
left.addEventListener('click', ()=>{
    if(city_index > 0){
        city_index -= 1;
    }else{
        city_index = city_list.length -1;
    }
    city= city_list[city_index].name
    
    city= city_list[city_index].name
    document.querySelector(".location").innerText = city;
    
    getWeatherReport(city)
    var ul = document.getElementById("list");
        ul.innerHTML = "";
    displayHistory()
   

})
// Funkcia na preklik na predošlé mesto
right.addEventListener('click', ()=>{
    if(city_index < city_list.length - 1 ){
        city_index += 1;}
        else{
            city_index = 0;
        }
    
    
    city= city_list[city_index].name
    document.querySelector(".location").innerText = city;
    getWeatherReport(city)
    var ul = document.getElementById("list");
        ul.innerHTML = "";
    displayHistory()

})



$(document).ready(function ()
        {
            weather.fetchWeather();
        });
        // Funkcia ktorá získa dáta z thingspeaku pre všetky fieldy
let weather = {

    fetchWeather: function () {
        fetch(`${city_list[city_index].baseUrl}`)
        .then((Response)=>Response.json())
        .then((data) => this.displayWeather(data))
        
        

    },
    // Funkcia ktorá pošle dáta pre jedntlivé hodnoty do HTML
    displayWeather: function(data){
        
        let field1 = data.feeds;
        let  field2 = data.feeds;
        let  field3 = data.feeds;
        // Tato časť vytvára globalnú premenu z elementu data
        window.value = data.feeds
        var ul = document.getElementById("list");
        ul.innerHTML = "";
        displayHistory()
        
        
        document.querySelector(".temp").innerText =  (field1[data.feeds.length-1].field1) + "°C";

        document.querySelector(".hum").innerText = "Humidity: " +(field2[data.feeds.length-1].field2) + "%";

        document.querySelector(".pres").innerText = "Pressure: " +(field3[data.feeds.length-1].field3) + " hPa";
        
        

        
        timeout = setTimeout(weather.fetchWeather(), 30000);
        
        
    },
    
    
}


const weatherApi = {
    key: "bab281d79e5f1e9755a68d754cc313e7",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather", 
}


// Funkcia ktorá získava status o počasí v danej oblasti
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
    
}

// Funkcia ktorá pošle status o počasí do HTML kódu 
function showWeatherReport(weather){
    document.querySelector(".location").innerText = city;
    let weatherType = document.getElementById('weather');
    weatherType.innerText =   `${weather.weather[0].main}`;
    // Táto časť rozhoduje o tom aký obrázok sa zobrazí na základe statusu počasia
    if(weatherType.textContent == 'Clear') {
        document.getElementById("weather_type").src = "./sunny-svgrepo-com (1).svg";
        
        
        
    } else if(weatherType.textContent == 'Clouds') {
        document.getElementById("weather_type").src = "./clouds-1274-svgrepo-com.svg";
        

        
        
    } else if(weatherType.textContent == 'Haze') {
        document.getElementById("weather_type").src = "./haze-svgrepo-com.svg";

        
        
    }     else if(weatherType.textContent == 'Rain') {
        document.getElementById("weather_type").src = "./rainy-svgrepo-com.svg";
        
        
        
    } else if(weatherType.textContent == 'Snow') {
        document.getElementById("weather_type").src = "./snowy-svgrepo-com.svg";
        
        
    
    } else if(weatherType.textContent == 'Thunderstorm') {
        document.getElementById("weather_type").src = "./thunder-svgrepo-com.svg";
    
        
    } 
    
    

    

}
getWeatherReport(city)
// Táto funkcia zobrazuje 'history' počet predošlích nameraných teplôt
 function displayHistory(){
    
    field1 = window.value;
    
    a = 1
        for (let i = 0; i < history; i++) {
            a++
    
            listNode = document.getElementById('list'),
            liNode = document.createElement("LI"),
            txtNode = document.createTextNode(  (field1[window.value.length-a].field1)+ "°C");
            
         liNode.appendChild(txtNode);
         listNode.appendChild(liNode);
 }  
} 


