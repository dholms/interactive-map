$(document).ready(function(){
	var city = getQueryVariable('city');
	var state = getQueryVariable('state');
	var country = getQueryVariable('country');
	var lat = getQueryVariable('lat');
	var lng = getQueryVariable('lng');
	var address = formatAddress(city, state, country);
	addHeader(address);
	getInstagram(lat, lng);
	$('.tweet-text').tweetLinkify();
});

function addHeader(address){
	$('#header').html(address);
}

function formatAddress(city, state, country){
	address = "";
	if (city != "undefined"){
		address += city + ", ";
	}
	if (state != "undefined"){
		address += state + " ";
	}
	if (country != "undefined"){
		address += country;
	}
	while(address.indexOf('%20') > 0){
		address = address.replace('%20', ' ');
	}
	if(address.indexOf(' United States') >= 0){
		address = address.replace(' United States', '');
	}
	return address;
}

function getQueryVariable(variable){
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}
	return(false);
}