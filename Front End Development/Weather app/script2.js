//geting location with ip-api.com istead of getCurrentPosition
const deg = String.fromCharCode(176);
const cssBg = " no-repeat center center fixed";
var city = "";
var country = "";
var lat = 0;
var lon = 0;
var description = "";
var temp = 0;	
var far = 0;
(function getData(){
	$.ajax({
		type: "GET",
		url:"http://ip-api.com/json",
		success: function(data){
			city = data.city;
			country = data.country;
			lat = data.lat;
			lon = data.lon;

			var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&APPID=aa95644d275bfcf47bb7a23d31dddfca";
			$.ajax({
				type: "GET",
				url : url,
				success: function (data) {
					temp = data.main.temp;
					description = data.weather[0].description;				
				}
			});
		}
	});
})();


$(document).ajaxStop(function() {
	var $body = $('body');
	var $city = $("#city")
	var $temp = $("#temp");
	var $main = $("#weatherMain");
	var $convertButton = $("#fahrenheit");

	function fixBg(){
		$body.css("-webkit-background-size", "cover");
		$body.css("-moz-background-size", "cover");
		$body.css("-o-background-size", "cover");
		$body.css("background-size", "cover");
	}
			
	(function showWeather(){
		far = temp * 9/5 + 32;
		$city.text(city + "," + country);
		$temp.text(temp + deg + "C");
		$main.text(description.charAt(0).toUpperCase() + description.slice(1));
		switch(description){
				case "clear sky":
					$body.css("background", "url(http://www.hotel-r.net/im/hotel/gb/clear-sky-18.jpg)"+ cssBg);
					fixBg();
					break;
				case "few clouds":
					$body.css("background", "url(http://www.walltor.com/images/wallpaper/few-clouds-sky-3-28607.jpg)"+ cssBg);
					fixBg();
					break;
				case "scattered clouds":
					$body.css("background", "url(https://c1.staticflickr.com/3/2106/1909487867_de140c7eb8_b.jpg)"+ cssBg);
					fixBg();
					break;
				case "broken clouds":
					$body.css("background", "url(http://capturingadventure.com/wp-content/uploads/2011/09/DSC4548-as-Smart-Object-1.jpg)"+ cssBg);
					fixBg();
					break;
				case "shower rain","rain":
					$body.css("background", "url(https://wallpaperscraft.com/image/rain_drops_splashes_heavy_rain_dullness_bad_weather_60638_1680x1050.jpg)"+ cssBg);
					fixBg();
					break;
				case "thunderstorm":
					$body.css("background", "url(https://aos.iacpublishinglabs.com/question/aq/1400px-788px/thunderstorms-made_fdef5d2957edbe09.jpg?domain=cx.aos.ask.com)"+ cssBg);
					fixBg();
					break;
				case "snow":
					$body.css("background", "url(https://s-media-cache-ak0.pinimg.com/originals/20/0b/95/200b95dfb2efa80d37479764a324b462.jpg)"+ cssBg);
					fixBg();
					break;
				case "mist":
					$body.css("background", "url(http://cdn.wallpapersafari.com/91/80/S4Rd6Z.jpg)"+ cssBg);
					fixBg();
					break;
				case "overcast clouds":
					$body.css("background", "url(http://www.hotel-r.net/im/hotel/gb/clear-sky-18.jpg)"+ cssBg);
					fixBg();
					break;
				default:
			        $body.css("background", "url(http://centralhighlands.com.au/files/2014/12/weather-hero.jpg)"+ cssBg);
			        fixBg();

		}
	})();

		$convertButton.on("click", function(){
		if($(this).text() == "Change to Fahrenheit"){
			$temp.text(far + deg + "F");
			$(this).text("Change to Celsius");
		}			
		else{
			$temp.text(temp + deg + "C");
			$(this).text("Change to Fahrenheit");
		}
	});		
});