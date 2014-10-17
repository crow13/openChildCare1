<?php

include "OpenConnection.php";
echo '<?xml version="1.0" encoding="utf-8"?>';
echo "<markers>";
$input = $_SERVER['QUERY_STRING'];
$input = str_replace('%20',' ',$input);
//ZIP SEARCH
$result = mysqli_query($conn,'SELECT * FROM csv_db.tbl_name where City in (SELECT City from csv_db.tbl_name where Zip="'.mysql_real_escape_string($input).'");');
if (!$result) {
    die('Invalid query: ' . mysqli_error($conn));
}else{
	if (mysqli_num_rows($result) == 0) {
		//echo "No rows found Zip";
		
		// CITY SEARCH
		$result = mysqli_query($conn,'SELECT * FROM tbl_name where City="'.$input.'";');
		if (!$result) {
			die('Invalid query: ' . mysqli_error($conn));
		}else{
			if (mysqli_num_rows($result) == 0) {
			//echo "No rows found, City";
			
				// Name SEARCH
				$qry = "SELECT * FROM tbl_name where FacilityName like '%".$input."%';";
				$result = mysqli_query($conn,$qry);
				if (!$result) {
					die('Invalid query: ' . mysqli_error($conn));
				}else{
					if (mysqli_num_rows($result) == 0) {
						echo "</markers>";
						exit();//echo "No rows found, Name";
					}
					while ($row = mysqli_fetch_assoc($result)) {
						echo "<marker ";
						echo "id=\"".$row["id"]."\" ";
						echo "name=\"".$row["FacilityName"]."\" ";
						echo "address=\"".$row["Address"]."\" ";
						echo "city=\"".$row["City"]."\" ";
						echo "state=\"".$row["State"]."\" ";
						echo "zip=\"".$row["Zip"]."\" ";
						echo "phone=\"".$row["Phone"]."\" ";
						echo "starRating=\"".$row["StarRating"]."\" ";
						echo "expireDate=\"".$row["ExpireDate"]."\" ";
						echo "lat=\"".$row["Latitude"]."\" ";
						echo "lng=\"".$row["Longitude"]."\" ";
						echo "></marker>";
					}
				}
			}
		}
		while ($row = mysqli_fetch_assoc($result)) {
			echo "<marker ";
			echo "id=\"".$row["id"]."\" ";
			echo "name=\"".$row["FacilityName"]."\" ";
			echo "address=\"".$row["Address"]."\" ";
			echo "city=\"".$row["City"]."\" ";
			echo "state=\"".$row["State"]."\" ";
			echo "zip=\"".$row["Zip"]."\" ";
			echo "phone=\"".$row["Phone"]."\" ";
			echo "starRating=\"".$row["StarRating"]."\" ";
			echo "expireDate=\"".$row["ExpireDate"]."\" ";
			echo "lat=\"".$row["Latitude"]."\" ";
			echo "lng=\"".$row["Longitude"]."\" ";
			echo "></marker>";
		}

	}
	while ($row = mysqli_fetch_assoc($result)) {
		echo "<marker ";
		echo "id=\"".$row["id"]."\" ";
		echo "name=\"".$row["FacilityName"]."\" ";
		echo "address=\"".$row["Address"]."\" ";
		echo "city=\"".$row["City"]."\" ";
		echo "state=\"".$row["State"]."\" ";
		echo "zip=\"".$row["Zip"]."\" ";
		echo "phone=\"".$row["Phone"]."\" ";
		echo "starRating=\"".$row["StarRating"]."\" ";
		echo "expireDate=\"".$row["ExpireDate"]."\" ";
		echo "lat=\"".$row["Latitude"]."\" ";
		echo "lng=\"".$row["Longitude"]."\" ";
		echo "></marker>";
	}
}
echo "</markers>";
include "CloseConnection.php";

?>