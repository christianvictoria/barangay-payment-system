<?php
	require_once("./config/Config.php");

	$db = new Connection();
	$pdo = $db->connect();
	$gm = new GlobalMethods($pdo);
	$auth = new Auth($pdo);

	if (isset($_REQUEST['request'])) {
		$req = explode('/', rtrim($_REQUEST['request'], '/'));
	} else {
		$req = array("errorcatcher");
	}

	switch($_SERVER['REQUEST_METHOD']) {
		case 'GET':
			switch ($req[0]) {
				case 'users':
					if (count($req) > 1) {
						echo json_encode($gm->select("SELECT * FROM tbl_users", $req[1]), JSON_PRETTY_PRINT);
					} else {
						echo json_encode($gm->select("SELECT * FROM tbl_users", null), JSON_PRETTY_PRINT);
					}
				break;
				
				default:
					http_response_code(403);
					echo "Invalid Route/Endpoint";
				break;
			}

		break;

		default:
			http_response_code(403);
			echo "Please contact the Systems Administrator";
		break;
	}
?>