//navigagor getlocation getCurrentPosition

$(function(){
	const deg = String.fromCharCode(176);
	var $body = $('body');
	var $city = $("#city")
	var $temp = $("#temp");
	var $main = $("#weatherMain");
	var $convertButton = $("#fahrenheit");	

	(function getLocation() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(getWeather);
	    } else { 
	        console.log("Geolocation is not supported by this browser.");
	    }
	})();

	
	function getWeather(position) {
	    var lat = position.coords.latitude;
	    var lon = position.coords.longitude;
	    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&APPID=e8cef1deb06a6cd44d8a3f70580ac373";
		$.ajax({
			type:"GET",
			url:url,
			success: function(data){
				var description = data.weather[0].description;
				$city.text(data.name + "," + data.sys.country);
				$temp.text(data.main.temp + deg + "C");
				$main.text(data.weather[0].main);

				switch(description){
					case "clear sky":
						$body.css("background", "url(http://www.hotel-r.net/im/hotel/gb/clear-sky-18.jpg)");
						break;
					case "few clouds":
						$body.css("background", "url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBAQEBAQDw8PEA8PDw8QDw8PDw8PFREWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0dHR0tLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKy0tKy0tLS0tLS0rLf/AABEIALEBHAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAACAAEDBAUGB//EADcQAAICAQMEAQIDBgUEAwAAAAABAhEDBCExBRJBUWEGIhNxkSMyYoGSoRVCUrHRFOHw8TNywf/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EAB8RAAMBAAMBAQEBAQAAAAAAAAABAhEDITESQVETBP/aAAwDAQACEQMRAD8Ax2hmiRoFo908cBoag6GoAI6GaJGhqACNoaiShmgAioZokaGoQEdDNB0JoAImhqDaGaAAGhg6BoQAiCGoQwaFQVDAMGgWiSgaEMGhqDoZiGR0NQYqEAFDUSUNQAROIPYT0D2iwCHsG7SZoZoMAhcQXEmaBaEMhoVEjQ1CA6poGiVoZo6TEjoaiShqACJoaiVoFoAI2gWiShmgAjaGaJGgaEMjoaiRoFoAI2gWiVoFoAI2hqJKBaAAKGoOhqEAI1B0NQhg0M0FQ1AMChqDoahABQqCoVCGDQqCGYACC0GwWIAWDQdCoBkdCaDoVBgETiNRK0DQgOpaBaJ/w2T6fQTn+7z+iNW0jHGyj2jUbun6Bkkt5Rj8U2zK1GBwk4vwxKk/BuWvSs0N2l3DBVuibFpfKX6g6BIoYNM5OuBs2mcXRsw6c3umiLLgadNi+y/ky1pm1wRPAzY0+PffdE+ohCrfAvsPk52WP0A4G0+1cKyrmim74/IpUJyZjQLRYyQpkbiUSRNAtErQLQARUNRK0C0ICOhBtDUAwBgqGaEAIwTQzAegjUFQ4hkYqCoPHicuF/MAIWhmiXLBx2aAEMChUEMAgaEOMxDGoGghgA73RQXFX6/M09FDte2211tyZv4E1TUWvKdFrQ5ZRa5d+ya7HPRqwhlbu/t9PZmXruh5HJyj93+Zbu5fzOz0mjuCclu0R6nBXG9vdXX8zBcuPo2fHq7ODWBJtS2a5T2otYs8I7Lc3df0aOebknu1ucvq9JLDkcZJ87P2jaaVmTTgvT1D9V6M/V5bd+fITz7U9yPJNSXyUlhLrSutQwMuZsTgHDA3ui+iNZDFssYZe6CeJIF+/Qn2V4QauFyKWSFMvwipXboi/wCllK2uPZSeEsotAtE8sbXOwDRRJC0NRI0M0AETQzRJQzQhkTQ1EtAtABHQzRJQ1CAjoVB0KgGR0dL0TFGUeN0v7nPRhbo6HpGWMNudtyL8NI9M/rWmkmtvm/LMnJFJ0joer5Yu571VJfJz8gnwVekYwdDNFCBGoKhR2d+hAXsXRc8m0o3Stu9ijn08oPtkt6v2dx9JauWW03FPhquUXep/TmOWTuUlC0n2pJmX+mPGa/GrUdTrdD34+1fbJcUUNHoFD95XX9jpvwVRVzQXBzK34buFuk2LUrtSqttirlyJvd7ePzFPS96S4+fRl63SZYKl91Xv5FKTCmw5aqOJupLbdpFDrGrx5INtK/D2uzIzKe9359lKbbVeEdM8a9OauTrCu5Emnxdz8rcWPHfPH+50fT+nY5RTrjj2jW6UoziXTMvLo4Kt/wA7K05RgtuS51X9nkaa2MeW7FK1DppPoWTI2SYcTe36jYsDk6W5oQg47bRXp3uVTwUrSnh0lS97GnpcKit0PpccHLlXRbeJe7+DKqNZnDP12jxyV7J/Bz2XDUmufTOhy4qy1/6MrqOCpXZcP8ItfplyiC0Ty+SNo1MiJoaiWhmgDSKhmiRoagAjoaiXtH/Dap++BDIewXaaWOcfKsiy4e53FUvQtKwHBgi0174l6ZNp9JKDXnfwC9PlUWu11zsuBseolCvJLKWFjqumdKTVL/T6ZhNG9LqFqpK0Zeq7W7iqCd/QrPwqNDUSNA9pZBG0JImnhlHlNXxaJdHiuS/MQzb+ksk45Yw7Ek77pVu1XB3r00J7tW+DmuiaV3bpJXVcnS4J9sav9Tj5H2dULo2NNqb2ZNkj5OY0vUO6aXrl3ydD/wBSq8GdS0zRUmH30UOo6uot+S1Oafnkoajpf4t33brb0E5vYq3OjktRqu5+qIllV8fFGxk+ltRUmu1pW1933P8AkD0TpjWX9rFxcXspKlfv5Ov7nOjk+bbxlzpfTMc6/Zxbce5Jx3T9WdHpdOsUa7UtlxRZwdsVtTI9ZbW3nn4OOrdM7JlSjkPq2H3qTVxar5tf+I5hR3O01fT5ZZtNNKNUmnvfkzsn05O+dtuUdXHaSxnLycbb1GPpc0Y8FnNLvVrks5ehSjNQtN1e3kr5MU4ycV/l2v59Fan4GNLGBptE197df/pbxZ62Kss7SSadgPHl57W0290r45E1vo088LWVW+6r9mbroX/PwW3rVGNeTMz5W3aY5TJukUJwA7TY6Z0bJqH9u0bpyZraX6LnKUu+fbBPZpfdL5Xot8kz6zNcdPxHIOILidjrvoqcId0MinK94tdqr4fswNZ0jNiXdPHJQ/1eP+w55JrxhUVPqMuhu0ncR4Y7dFaSQdoSi2W9Lo55JrHBXJvbn9TrOgfTco5P2kb23uu2vgi+RT6aRDo5fQdLy5VKUI3GCuT3/RfJ2XQuhwngipx3aveKTV+Dp9LoIwXbCKivSVIuQxKK2Rx3zOvDqjhS9Ocn06EVTWy2vyjlvqbpC2ljjxy0uV8noOoxp2U3gv8A2FHI09KqE1h5BkhT3JcUEluuToPqfp8ceRyS53qqVnOzkdif0jka+X2Q5tLvtwWNNgjCpOpel8/JFKbqvAWGT498DeiWaSdW1ayVslSXA3StKnu75LGm0nc/3brk28HTmlskRVJLDRS29L2gyxjGltRbeaL3MyGhbX3bMNY5La7/ACMHhsiviydrsvYeovzx5M5hRZ0uUzjVtHY9Ji5pO1Xg6GOPY576Zx1D+d1Z0kWcHJ6ehHhDlx/JjdTxTX3Kn23+aN2RVy40KXg6WnL9I6q+9xyXu3v6Oow5ovh8mDq+iKU3KLat3S239lnJoJQgu2V1yr3/AFNL+X4Zx9Jdm1CO5DnbQukYZ9lzu72vd17JtTjMv01/ClFRk7aVozurdLVd+P8Afbd+p/D/AOS7O07QUM+xabRDSZxj0lz32p/zv0vZ1Gg0EaVr15fJDrNGpyT22d+mamGca22oq71ExGGL13o+Ou9Qjtu1XP6HD6iCU3tUb4V7L1uek9Ty/Y78nAdUhUmvKdP18G3BT8Zhzyl2jf8ApzXwj9rUYRe8fzOr0+WM2qa4tedjyqFtpe2keifTmjhjjFcyW7lb5fojnhLs04LddG5liqowOuQc8c4Uu1xa4s6HVNUZrhb33X9jCXnZvS3o8z/wbO+IN71fH+5UzaeWOTjJVJHquSNbUkjA1/S4zy/iOF1x6b9s6p599OWuDPCp9FaKTbyduzVKXnZ+DuNNiKHTMcYxSS7a8Lg2MSObkr6enTxziwSgKYVkeSRmaFTMitJ0WszKGaTLRDML6l0/4kP3bafj0cRrdJKFNqlLg9DzSvYxur4IZIOLX3LeLXg6OO86MOSN7OK7TU6PhjdvcoNU2vklwZnF+jorWjCWkzr9NGC4SLLaOa0mup/c/wAjQhqpPxte3s5qhnSqTRczZVGzHydQduqNrVYP2b2ttfoY89BdPnZXXsc5+irfwOiTHjtpIGjT6PCDb7ldHRTxackLXhv/AE/il20/Bu3RS0zhjjbqKQD18ZSr9PlHBW09PRnpYaGJ2BmiR6XKu57k2eSIK/ChllQMMwOeRWsog2MWtolWdSMjCi3jdCaK0LNFGdl2exeyTKuQaEyJyIJZ6GnnRndT1aSVfJczpDpIm1GpbT3OX6hO5s0VrVv8mVqN5M6eKcZy816i/wBBwwc7nu62/wCTfepeNqpUm1Rymjz9jvylsWF1Fyf3CuG2Pj5FM4ehYtSmlbv/AJCtHNdN10Vt3LenyaS1a/1HK5aOtVpoTd/JD2jaXMmS5cYhixSUedyZ6t/kZ7ixOwwNNKGpCnmsyVkoX44sHpbz5DPzZRZM5WyTKRLI87M7KWs0irNFIlnOdU0zjK0tnvsUoJXvwdLnVmVqNJbdKvXo6ovrGc1xj1A6bSqUlT29Lc3sHTpbScqqua49GX0vFLHK3vtVGtHM3yZ2++jTjXRoZ4twqL34vkg0mg7Y033Nttv8wMWbcnx59jLTXDIovaP7Kk63a2+CmKzra04ZrHp0Os6rFxSTKWPWVbRmIJMzXGka/wCrbNvSZ3Vt8/PBfXUUtpM5f8R+BpTbJfFpS5sNfV9Vt/b/AHI8HVfEjIYxX+Uk/wC1adjpNbjaW6LjnFrk4JTa8k2PWzX+Z1+Zm+D+Gi/6F+nUarWpMp5tenG+DBnqmyB5GUuET5y3qNQ13JPZ+V4M3Nlb/wCQpzbIpI2mcOa7bA7gWG0DRZnoFCQQqGA8JNeTX6NJzbTt8b+EY9Gj03XLG1a/7GfItXRrxVlds7LTQSo1IpNGBptYnXyakNWlyzgpM9FNFiWAq5MNB5eoQXlFPNr4+9vYkmN4BliV5MU9fBurQM8kSsJAkyKcgdRqUvKM/VarZ09ylLZLpItzkVsjMtdQkvkNa6+djT/Noz/1lk2ZkDmQ6jU+ipHI75LXG8IrkWmpjRZhEq6TKvL3L/4sau6M6RpLWAZJOPjYGOsj7K2v1Sr7Xv8A2Ml55ey549RFcvyzeY1BMRucrBHHoVCAYQhAMYYIagACgWiRjUMRExmSNAtAIjaAaJWgXEYiKhqJe0FoYiNoaiShqAQFCSDoVAMnwauceHwSz6jkf+Yp0Ij5RouSszSaepk97HjrJJNWVxh/KD7Yf4j8Og5aybVdz2IQWg+UL6YeXO5ckStjtDBgfTfpFJAkrQLQxEbGDaGoYDJsN5JVvwDQmLB6DJtgUHQqGI6NoGiRoajPTTABUHQ1ALARBUKhhgAgqFQBgDQ1B0NQCwjoaiShqAMI2gaJWhnEYsIaGcSXtG7Q0WEXaM4kvaN2hoYRUNRK4jdo9FhHQ1EnaM0AEdDElA0AAioLtFQAA0C0S9oziAyJoZonhicmopW26SLX+E5P4f6kJ0l6NS34ZrQNGn/hOX+H+pAvpWT+H+pC+5/o/iv4ZrQ3aaX+FZP4P60J9Ky/w/1If2v6HxX8M2hqNJ9Jy/w/1IddGzeo/wBSD7n+h8V/DaZXycsYRmjRjDDiGIZiEIAGYwhDAZiGEAmIYQgBDMYQhiYwLEIAGEIQAMwRCAQzGYhDRLGGkIQxAjjCAQ4whCLRY6f/APLj/wDsjphCOfl9Org8GEIRkaiGEIAGEIQAf//Z)");
						break;
					case "scattered clouds":
						$body.css("background", "url(https://c1.staticflickr.com/3/2106/1909487867_de140c7eb8_b.jpg)");
						break;
					case "broken clouds":
						$body.css("background", "url(http://img13.deviantart.net/fa39/i/2015/052/6/1/broken_clouds_by_leo_6tos-d8ixdlv.jpg)");
						break;
					case "shower rain":
						$body.css("background", "url(http://www.caminodesantiago.me/wp-content/uploads/rain1.jpg)");
						break;
					case "rain":
						$body.css("background", "url(http://www.caminodesantiago.me/wp-content/uploads/rain1.jpg)");
						break;
					case "thunderstorm":
						$body.css("background", "url(https://aos.iacpublishinglabs.com/question/aq/1400px-788px/thunderstorms-made_fdef5d2957edbe09.jpg?domain=cx.aos.ask.com)");
						break;
					case "snow":
						$body.css("background", "url(https://s-media-cache-ak0.pinimg.com/originals/20/0b/95/200b95dfb2efa80d37479764a324b462.jpg)");
						break;
					case "mist":
						$body.css("background", "url(http://cdn.wallpapersafari.com/91/80/S4Rd6Z.jpg)");
						break;
				}
			}
		});

	}
	
	$convertButton.on("click", function(){
		if($(this).text() == "Change to Fahrenheit"){
			var currT = $temp.text();
			var far = currT.slice(0, currT.indexOf(deg)) * 9/5 + 32;

			$temp.text(far + deg + "F");
			$(this).text("Change to Celsius");
		}			
		else{
			var currT = $temp.text();
			var cel = (currT.slice(0, currT.indexOf(deg)) - 32) * 5/9;
			$temp.text(cel + deg + "C");
			$(this).text("Change to Fahrenheit");
		}
	});
});
