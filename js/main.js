var markers = [];
var markerCount = 0;
var geocoder;
var map;
var modalHTML = "";

function testFunction(){
  $("#frame").append('<iframe class="test" src="info.php?city=Clayton&state=North%20Carolina&country=United%20States&lat=35.58138418324621&lng=-78.4149169921875"></iframe>');
}

function openModal(city, state, country, lat, lng){
  var frameSrc = "info.php?city="+city+"&state="+state+"&country="+country+"&lat="+lat+"&lng="+lng;
  $('iframe').attr("src",frameSrc);
  $('#infoModal').modal('show');
}

function initialize() {
  $('#instructionsModal').modal('show');
	geocoder = new google.maps.Geocoder();

    var mapOptions = {
      center: new google.maps.LatLng(39.03, -95.80),
      zoom: 4
    };

    map = new google.maps.Map(document.getElementById("mapCanvas"),
        mapOptions);

    google.maps.event.addListener(map, "dblclick", function(event) {
		var lat = event.latLng.lat();
		var lng = event.latLng.lng();
		codeLatLng(lat, lng);
	});
}

function placeMarker(latlng, city, stateShort, stateLong, country){
	markers.push(new google.maps.Marker({
		position: latlng,
		map:map,
		title: 'Marker' + markerCount
	}));
  address = "";
  if (city){
    address += city + ", ";
  }
  if (stateShort){
    address += stateShort + " ";
  }
  if (country){
    address += country;
  }

  lat = latlng.lat();
  lng = latlng.lng();
	var content ="<h3>" + address + "</h3>";
	content+="<p>Latitude: " + latlng.lat().toFixed(2) + "<br>Longitude: " + latlng.lng().toFixed(2) + "</p>";
	content+="<button class='btn btn-primary btn-sm' onclick='openModal(\"" + city + "\", \"" + stateLong + "\", \"" + country + "\", \"" + latlng.lat() + "\", \"" + latlng.lng() + "\")'>See more Info</button>";
  // content+="<button class='btn btn-primary btn-sm' onclick='openModal()'>See more Info</button>";
  content+="<button class='btn btn-danger btn-sm' onclick='deleteMarker(" + markerCount + ")'>Delete This Marker</button>";

	var infowindow = new google.maps.InfoWindow({
		content: content
    });

    infowindow.open(map, markers[markerCount]);

    google.maps.event.addListener(markers[markerCount], 'click', function(){
      infowindow.open(map, this);
    });

    markerCount++;
}

function deleteMarker(count){
	markers[count].setMap(null);
}

function openInfo(city, state, country, lat, lng){
  window.open("info.php?city=" + city + "&state=" + state + "&country=" + country + "&lat=" + lat + "&lng=" + lng);
}

function codeLatLng(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          arrAddress = results[0].address_components;
          console.log(arrAddress);
          var city, stateShort, stateLong, country;
            $.each(arrAddress, function (i, address_component) {
                console.log('address_component:'+i);
                if (address_component.types[0] == "locality"){
                    city = address_component.long_name;
                }

                if (address_component.types[0] == "country"){
                    country = address_component.long_name;
                }

                if (address_component.types[0] == "administrative_area_level_1"){
                    stateShort = address_component.short_name;
                    stateLong = address_component.long_name;
                }
            });
          placeMarker(latlng, city, stateShort, stateLong, country);
        }
      } else {
        console.log("Geocoder failed due to: " + status);
      }
    });
}

google.maps.event.addDomListener(window, 'load', initialize);