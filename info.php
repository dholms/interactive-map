<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="css/ihover.css">
    <link rel="stylesheet" type="text/css" href="css/application.css">
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/bootstrap.js"></script>
    <script type="text/javascript"
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGgzcuTpA4TNx7SxuK1KhIaD5srxXACw8&sensor=true">
    </script>
    <script type="text/javascript" src="js/info.js"></script>
    <script type="text/javascript" src="js/instagram.js"></script>
    <script type="text/javascript" src="js/tweet-linkify.js"></script>
  </head>
  <body>
    <div class="container">
      <h1 id="header"></h1>
      <div class="row">
        <div class="col-md-6 description-container">
          <h2>More Info</h2>
          <p class="description">
            <?php      
            $address = "";
            parse_str($_SERVER["QUERY_STRING"]);
            if($city == undefined){
                $city = "";
            }
            else{
              $address = $address . $city . ", ";
            }
            if($state == undefined){
              $state = "";
            }
            else{
              $address = $address . $state;
            }
            if($country == "United States"){
              $country = "";
            }
            else{
              $address = $address . " " . $country;
            }

            function getDescription($keyword){
                $url='http://lookup.dbpedia.org/api/search.asmx/KeywordSearch?QueryString='.urlencode($keyword).'&MaxHits=1';
                $xml=simplexml_load_file($url);
                return $xml->Result->Description;
            }
            echo getDescription($address);

            // $url = 'http://en.wikipedia.org/w/api.php?action=parse&page=' . urlencode($address) . '&format=json&prop=text&section=0';
            // $ch = curl_init($url);
            // curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
            // curl_setopt ($ch, CURLOPT_USERAGENT, "Interactive Map (http://www.unc.edu/~dholms/interactive_map/index.html)"); 
            // $c = curl_exec($ch);

            // $json = json_decode($c);

            // $content = $json->{'parse'}->{'text'}->{'*'}; // get the main text content of the query (it's parsed HTML)
            // echo strip_tags($content);
            // // pattern for first match of a paragraph
            // $pattern = '#<p>(.*)</p>#Us'; // http://www.phpbuilder.com/board/showthread.php?t=10352690
            // if(preg_match($pattern, $content, $matches))
            // {

            //     // print $matches[0]; // content of the first paragraph (including wrapping <p> tag)
            //      echo strip_tags($matches[1]); // Content of the first paragraph without the HTML tags.
            // }
            ?>
          </p>
        </div>
        <div class="col-md-6">
          <h2>Relevant Tweets</h2>
          <div class="tweets-container">
            <?php
            require_once('TwitterAPIExchange.php');
            //Access Tokens
            $settings = array(
                'oauth_access_token' => "613196372-9ivSIhxe1BqNlXrv7s1F2aHsn43DIH1myIp0PUZx",
                'oauth_access_token_secret' => "F855y2V2buaTx0NdketEGqM6A61gbK0UGtgjaZtBsq8gV",
                'consumer_key' => "8IV87L8cnMlfyxxJtOqOQq60k",
                'consumer_secret' => "mZusZjo5pmxDedrnvr41hcOGQyJ3s6abxELcELobVdzuSag7JM"
            );

            //GET
            $url = "https://api.twitter.com/1.1/search/tweets.json";
            $requestMethod = "GET";
            $getfield = "?q=" . urlencode($city) . "%20" . urlencode($state) . "%20" . urlencode($country);

            $twitter = new TwitterAPIExchange($settings);

            //turn get request into json
            $string = json_decode($twitter->setGetfield($getfield)
                         ->buildOauth($url, $requestMethod)
                         ->performRequest(),$assoc = TRUE);
            $results = $string["statuses"];
            if(empty($results)){
              echo "<em>No relevant tweets were found about this location.</em>";
            }
            else{
              foreach($results as $items){
                       $user = $items['user'];
                       $name = $user['name'];
                       $screen_name = $user['screen_name'];
                       $image = $user['profile_image_url'];
                       $text = $items['text'];

                       echo "<div class='tweet'>";
                       echo "<img class='tweet-image' src=" . $image . "/>";
                       echo "<p class='tweet-name'><strong>" . $name . "</strong> <span class='screen-name'>@" . $screen_name . "</span></p>";
                       // echo "<p class='tweet-date'>" . $date . "</p>";
                       echo "<p class='tweet-text'>". $text . "</p>";
                       echo "<hr></div>";
                  }
                }
            ?>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 pictures">
          <h2>Photos From the Area</h2>
          <br>
          <div id="results"></div>
        </div>
      </div>
    </div>
  </body>
</html>