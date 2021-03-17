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
		case 'POST':
			switch ($req[0]) {
				case 'users':
					if (count($req) > 1) {
						echo json_encode($gm->select("tbl_".$req[0], $req[1]), JSON_PRETTY_PRINT);
					} else {
						echo json_encode($gm->select("tbl_".$req[0], null), JSON_PRETTY_PRINT);
					}
				break;

				case 'insert':
					$d = json_decode(file_get_contents("php://input"));
					echo json_encode($gm->insert("tbl_users", $d));
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