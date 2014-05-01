// JavaScript Document


//Use this url below to get your access token
//https://instagram.com/oauth/authorize/?display=touch&client_id=55137f9f9a624f519ee5de3413fc7e6b&redirect_uri=http://www.unc.edu/~dholms/interactive_map/&response_type=token 

//if you need a user id for yourself or someone else use:
//http://jelled.com/instagram/lookup-user-id
						
function getInstagram(lat, lng) {
	var apiurl = "https://api.instagram.com/v1/media/search?lat="+ lat +"&lng=" + lng + "&access_token=1173762513.55137f9.7fa94f9bc8d94a8bb2ec56aba7ca5fa5&callback=?";
	var access_token = location.hash.split('=')[1];
	var html = "";
	
		$.ajax({
			type: "GET",
			dataType: "json",
			cache: false,
			url: apiurl,
			success: parseData
		});
				
		
		function parseData(json){
			console.log(json);
			
			$.each(json.data,function(i,data){
				html += '<div class="ih-item square effect6 from_top_and_bottom"><a href="' + data.link + '"><div class="img">';
				html += '<img src ="' + data.images.low_resolution.url + '"></div>';
				html += '<div class="info"><h3>' + data.user.full_name + '</h3><p>' + data.user.username + '</p></div></a></div>';
			});
			
			$("#results").append(html);
			
		}                          
}
	

		
