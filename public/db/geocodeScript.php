<?php
//http://www.andrew-kirkpatrick.com/2011/10/google-geocoding-api-with-php/

include "OpenConnection.php";
 
function lookup($string){
 
    $string = str_replace (" ", "+", urlencode($string));
    $details_url = "http://maps.googleapis.com/maps/api/geocode/json?address=".$string."&sensor=false";
 
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $details_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $response = json_decode(curl_exec($ch), true);
 
    // If Status Code is ZERO_RESULTS, OVER_QUERY_LIMIT, REQUEST_DENIED or INVALID_REQUEST
    if ($response['status'] != 'OK') {
		return null;
    } 
 
	$geometry = $response['results'][0]['geometry'];
 
    $array = array(
        'latitude' => $geometry['location']['lat'],
        'longitude' => $geometry['location']['lng'],
    );
 
    return $array;
 
}

$result = mysqli_query($conn, "Select id,Address,City,Zip,State,Latitude,Longitude from tbl_name;");
if (!$result) {
	die('Invalid query: ' . mysql_error());
}else{
	if (mysqli_num_rows($result) == 0) {
		die ("No rows found.");
	}
	while ($row = mysqli_fetch_assoc($result)) {
		if($row["Latitude"]!=0 || $row["Longitude"]!=0) continue;
		$latlon = lookup($row['Address']." ".$row['City']." ".$row['Zip']." ".$row['State']);
		
		mysqli_query($conn, "Update tbl_name set Latitude ='".$latlon["latitude"]."', Longitude = '".$latlon["longitude"]."' where id=".$row["id"].";");

		echo $row['Address']." ".$latlon["latitude"]."  ".$latlon["longitude"]." <br />";
		
	}
}

 
include "CloseConnection.php";
?>