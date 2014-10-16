<?php

include "OpenConnection.php";

echo "<markers>";
//$input = $_POST["input"]
$input="Norfolk";

//ZIP SEARCH
$result = mysqli_query($conn,'SELECT * FROM csv_db.tbl_name where City in (SELECT City from csv_db.tbl_name where Zip="'.$input.'");');
if (!$result) {
    die('Invalid query: ' . mysql_error());
}else{
	if (mysqli_num_rows($result) == 0) {
		//echo "No rows found Zip";
			
			// CITY SEARCH
			$result = mysqli_query($conn,'SELECT * FROM tbl_name where City="'.$input.'";');
			if (!$result) {
				die('Invalid query: ' . mysql_error());
			}else{
				if (mysqli_num_rows($result) == 0) {
				exit();//echo "No rows found, City";
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
			/////////////<marker name="" address="" lat="" lng="" />

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