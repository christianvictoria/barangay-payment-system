<?php
	require_once("./config/Config.php");

	$db = new Connection();
	$pdo = $db->connect();
	$gm = new GlobalMethods($pdo);
	$auth = new Auth($pdo);
	$post = new Post($pdo);

	if (isset($_REQUEST['request'])) {
		$req = explode('/', rtrim(base64_decode($_REQUEST['request']), '/'));
	} else {
		$req = array("errorcatcher");
	}
	
	$paymentMethod = array("checkup", "transaction", "order");

	switch($_SERVER['REQUEST_METHOD']) {
		case 'POST':
			switch ($req[0]) {
				// Request and params 
				// payments/(type of payment)/(row id)
				case 'payments':
					if(in_array($req[1], $paymentMethod) && count($req) >= 3) {
						echo json_encode($post->select_payments("tbl_payment_".$req[0], $req[1], "pt_id = $req[2]"), JSON_PRETTY_PRINT);
					} else if (in_array($req[1], $paymentMethod)) {
						echo json_encode($post->select_payments("tbl_payment_".$req[0], $req[1], null), JSON_PRETTY_PRINT);
					} else if (in_array($req[2], $paymentMethod) && $req[1] == "archived") {
						echo json_encode($post->select_archives("tbl_payment_".$req[0], $req[2], null), JSON_PRETTY_PRINT);
					} 
				break;

				case 'pending':
					if (count($req) > 1 && in_array($req[1], $paymentMethod)) {
						echo json_encode($post->select_payments("tbl_payment_payments", $req[1], "pt_isPayed = $req[2] AND pt_isDeleted = $req[2]"), JSON_PRETTY_PRINT);
					} else {
						echo json_encode($post->select("tbl_payment_payments", "pt_isPayed = $req[1] AND pt_isDeleted = $req[1]"), JSON_PRETTY_PRINT);
					}
				break;

				case 'paid':
					if (count($req) > 1 && in_array($req[1], $paymentMethod)) {
						echo json_encode($post->select_payments("tbl_payment_payments", $req[1], "pt_isPayed = $req[2] AND pt_isDeleted = 0"), JSON_PRETTY_PRINT);
					} else {
						echo json_encode($post->select("tbl_payment_payments", "pt_isPayed = $req[1] AND pt_isDeleted = 0"), JSON_PRETTY_PRINT);
					}
				break;

				// expenses/(row id)
				case 'expenses':
					if (count($req) > 1) {
						echo json_encode($post->select_expenses("tbl_payment_".$req[0], $req[1]), JSON_PRETTY_PRINT);
					} else {
						echo json_encode($post->select_expenses("tbl_payment_".$req[0], null), JSON_PRETTY_PRINT);
					}
				break;

				case 'archivesExpenses':
					if (count($req) > 2) {
						echo json_encode($gm->select("tbl_payment_expenses", "exp_isDeleted = $req[1] AND exp_id = $req[2]"), JSON_PRETTY_PRINT);
					} else {
						echo json_encode($gm->select("tbl_payment_expenses", "exp_isDeleted = $req[1]"), JSON_PRETTY_PRINT);
					}
				break;
				

				//reports
				case 'jan':
					if (count($req) > 1) {
						echo json_encode($post->jan("tbl_payment_expenses", $req[1]), JSON_PRETTY_PRINT);
					} else {
						echo json_encode($post->jan("tbl_payment_expenses", null), JSON_PRETTY_PRINT);
					}
				break;

				case 'feb':
					if (count($req) > 1) {
						echo json_encode($post->feb("tbl_payment_expenses", $req[1]), JSON_PRETTY_PRINT);
					} else {
						echo json_encode($post->feb("tbl_payment_expenses", null), JSON_PRETTY_PRINT);
					}
				break;

				case 'mar':
					if (count($req) > 1) {
						echo json_encode($post->mar("tbl_payment_expenses", $req[1]), JSON_PRETTY_PRINT);
					} else {
						echo json_encode($post->mar("tbl_payment_expenses", null), JSON_PRETTY_PRINT);
					}
				break;

				case 'apr':
					if (count($req) > 1) {
						echo json_encode($post->apr("tbl_payment_expenses", $req[1]), JSON_PRETTY_PRINT);
					} else {
						echo json_encode($post->apr("tbl_payment_expenses", null), JSON_PRETTY_PRINT);
					}
				break;

				case 'may':
					if (count($req) > 1) {
						echo json_encode($post->may("tbl_payment_expenses", $req[1]), JSON_PRETTY_PRINT);
					} else {
						echo json_encode($post->may("tbl_payment_expenses", null), JSON_PRETTY_PRINT);
					}
				break;

				case 'jun':
					if (count($req) > 1) {
						echo json_encode($post->jun("tbl_payment_expenses", $req[1]), JSON_PRETTY_PRINT);
					} else {
						echo json_encode($post->jun("tbl_payment_expenses", null), JSON_PRETTY_PRINT);
					}
				break;

				case 'jul':
					if (count($req) > 1) {
						echo json_encode($post->jul("tbl_payment_expenses", $req[1]), JSON_PRETTY_PRINT);
					} else {
						echo json_encode($post->jul("tbl_payment_expenses", null), JSON_PRETTY_PRINT);
					}
				break;

				case 'aug':
					if (count($req) > 1) {
						echo json_encode($post->aug("tbl_payment_expenses", $req[1]), JSON_PRETTY_PRINT);
					} else {
						echo json_encode($post->aug("tbl_payment_expenses", null), JSON_PRETTY_PRINT);
					}
				break;

				case 'sep':
					if (count($req) > 1) {
						echo json_encode($post->sep("tbl_payment_expenses", $req[1]), JSON_PRETTY_PRINT);
					} else {
						echo json_encode($post->sep("tbl_payment_expenses", null), JSON_PRETTY_PRINT);
					}
				break;

				case 'oct':
					if (count($req) > 1) {
						echo json_encode($post->oct("tbl_payment_expenses", $req[1]), JSON_PRETTY_PRINT);
					} else {
						echo json_encode($post->oct("tbl_payment_expenses", null), JSON_PRETTY_PRINT);
					}
				break;

				case 'nov':
					if (count($req) > 1) {
						echo json_encode($post->nov("tbl_payment_expenses", $req[1]), JSON_PRETTY_PRINT);
					} else {
						echo json_encode($post->nov("tbl_payment_expenses", null), JSON_PRETTY_PRINT);
					}
				break;

				case 'dec':
					if (count($req) > 1) {
						echo json_encode($post->dec("tbl_payment_expenses", $req[1]), JSON_PRETTY_PRINT);
					} else {
						echo json_encode($post->dec("tbl_payment_expenses", null), JSON_PRETTY_PRINT);
					}
				break;
							// expenses/(row id)
				case 'filterExpenses':
					if (count($req) > 1) {
						echo json_encode($post->filter_expenses("tbl_payment_expenses", $req[1]), JSON_PRETTY_PRINT);
					} else {
						echo json_encode($post->filter_expenses("tbl_payment_expenses", null), JSON_PRETTY_PRINT);
					}
				break;

				// newPayment/(type of payment)
				case 'newPayment':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->new_payment_expenses("tbl_payment_payments", $d, $req[1]));
					break;

				// updatePayment/(condition)/(type of payment to be return)
				case 'updatePayment':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->update_payment_expenses("tbl_payment_payments", $d, "pt_id=".$req[1], $req[2]));
					break;

				// newPayment/null
				case 'newExpenses':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->new_payment_expenses("tbl_payment_expenses", $d, null));
					break;

				// updateExpenses/(condition)/null
				case 'updateExpenses':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->update_payment_expenses("tbl_payment_expenses", $d, "exp_id=".($req[1]), null));
					break;


				case 'token':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->showToken());
				break;

				case 'login':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->login($d));
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