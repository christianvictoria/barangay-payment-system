<?php
	require_once("./config/Config.php");

	$db = new Connection();
	$pdo = $db->connect();
	$gm = new GlobalMethods($pdo);
	$auth = new Auth($pdo);
	$post = new Post($pdo);

	if (isset($_REQUEST['request'])) {
		$req = explode('/', rtrim($_REQUEST['request'], '/'));
	} else {
		$req = array("errorcatcher");
	}

	switch($_SERVER['REQUEST_METHOD']) {
		case 'POST':
			switch ($req[0]) {
				case 'payments':
					if (count($req) > 2) {
						echo json_encode($post->select_payments("tbl_".$req[0], $req[1], $req[2]), JSON_PRETTY_PRINT);
					} else {
						echo json_encode($post->select_payments("tbl_".$req[0], $req[1], null), JSON_PRETTY_PRINT);
					}
				break;

				case 'expenses':
					if (count($req) > 1) {
						echo json_encode($post->select_expenses("tbl_".$req[0]), JSON_PRETTY_PRINT);
					} else {
						echo json_encode($post->select_expenses("tbl_".$req[0]), JSON_PRETTY_PRINT);
					}
				break;

				case 'newPayment':
					if (count($req) > 1) {
						$d = json_decode(file_get_contents("php://input"));
						echo json_encode($post->new_payment("tbl_payments", $d, $req[1]));
					} else {
						$d = json_decode(file_get_contents("php://input"));
						echo json_encode($post->new_payment("tbl_payments", $d, null));
					}
					break;

				case 'updatePayment':
					if (count($req) > 2) {
						$d = json_decode(file_get_contents("php://input"));
						echo json_encode($post->update_payment("tbl_payments", $d, "pt_id=".$req[1], $req[2]));
					} else {
						$d = json_decode(file_get_contents("php://input"));
						echo json_encode($post->update_payment("tbl_payments", $d, "pt_id=".$req[1], null));
					}
					break;

				case 'newExpenses':
					$d = json_decode(file_get_contents("php://input"));
					echo json_encode($gm->insert("tbl_expenses", $d));
					break;

				case 'updateExpenses':
					if (count($req) > 1) {
						$d = json_decode(file_get_contents("php://input"));
						echo json_encode($gm->update("tbl_expenses", $d, "exp_id=".$req[1]));
					} else {
						$d = json_decode(file_get_contents("php://input"));
						echo json_encode($gm->update("tbl_expenses", $d, null));
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