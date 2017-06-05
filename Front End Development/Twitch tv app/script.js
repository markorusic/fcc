function getContent(urlUser, urlStream){
	var img="";
	var name="";
	var desc="";
	var channelState = "offline";

	$.getJSON(urlUser, function(data){
		img = data.logo;
		name = data.display_name;
		$.getJSON(urlStream, function(data){
			if(data.stream){
				channelState = "onlile";
				desc = data.stream.channel.status;	
				console.log(desc);
			}
			else
				desc = "Stream is currently offline";
			makeDOM(img, name, desc, channelState);
		});
	});
}

function makeDOM(img, name, desc, channelState){
	var main = jQuery("<div/>", {class:"channel " + channelState}).appendTo(".app");
	var aTag = jQuery("<a/>", {href:"www.twitch.tv/" + name, target:"_blank"}).appendTo(main);
	var ul = jQuery("<ul/>", {class:"channelItems"}).appendTo(aTag);
	var imgLi = jQuery("<li/>", {class:"channelImage"}).appendTo(ul);

	jQuery("<img/>", {
		class:"img-circle img",
		src: img
	}).appendTo(imgLi);

	jQuery("<li/>", {
		class:"channelName",
		text: name
	}).appendTo(ul);

	var desLi = jQuery("<li/>", {class:"channelImage"}).appendTo(ul);

	jQuery("<p/>", {
		class:"channelDes",
		text: desc
	}).appendTo(desLi);
}

$(function(){
	var url = "https://wind-bow.gomix.me/twitch-api/";
	var cb = "?callback=?";

	getContent(url + "users/Wtii" + cb, url + "streams/Wtii" + cb);	
	getContent(url + "users/esl_sc2" + cb, url + "streams/esl_sc2" + cb);
	getContent(url + "users/Arteezy" + cb, url + "streams/Arteezy" + cb);
	getContent(url + "users/nightblue3" + cb, url + "streams/nightblue3" + cb);
	getContent(url + "users/trick2g" + cb, url + "streams/trick2g" + cb);
	getContent(url + "users/freecodecamp" + cb, url + "streams/freecodecamp" + cb);


	$(".online").on("click", function(){
		var channels = $(".channel");
		for(var i = 0; i < channels.length; i++){
			if(!$(channels[i]).hasClass("online"))
				channels[i].hide();
		}
	});
});

//file:///C:/Users/Marko/Desktop/fcc/Twitch%20tv%20app/index.html