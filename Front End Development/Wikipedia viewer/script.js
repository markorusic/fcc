function makeContent(headerText, resultText, wikiLink){
	
	var aTag = jQuery("<a/>", {
		href:wikiLink,
		target:"_blank"
	}).appendTo("#searchResult");

	var thisDiv = jQuery("<div/>", {
		class: "result",
	}).appendTo(aTag);

	jQuery("<h1/>", {
		text: headerText
	}).appendTo(thisDiv);

	jQuery("<p/>", {
		text: resultText
	}).appendTo(thisDiv);
}

function search(data){
	var title = "";
	var text = "";
	var link = "";

	console.log(data[1][9]);
	for(var i = 0; i < data[1].length; i++){
		title = data[1][i];
		text = data[2][i];
		link = data[3][i];
		makeContent(title, text, link);
	}
}

function clear(){
	$("#searchResult").children().remove();	
}

$(function(){
	var $search = $("#search");
	$("#randomButton").on("click", function(){
		window.open("https://en.wikipedia.org/wiki/Special:Random");
	});
	$search.keypress(function(e) {
	   if(e.which == 13){
	   	clear();
	   	var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + $(this).val() + "&limit=10&namespace=0&format=json&callback=?";
	   	$.getJSON(url, search, "jsonp");
	   }
	});

	$search.autocomplete({
    source: function(request, response){
	        $.ajax({
	        url: "http://en.wikipedia.org/w/api.php",
	        dataType: "jsonp",
	        data: {
	            'action': "opensearch",
	            'format': "json",
	                'search': request.term
	            },
	            success: function(data) {
	                response(data[1]);
            	}
        	});
    	}
	});
});