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

	switch($_SERVER['REQUEST_METHOD']) {
		case 'POST':
			switch ($req[0]) {


				case 'residents':
					if (count($req) > 1) {
						echo json_encode($gm->select("tbl_profiling_".$req[0], "res_id=".$req[1]), JSON_PRETTY_PRINT);
					} else {
						echo json_encode($gm->select("tbl_profiling_".$req[0], null), JSON_PRETTY_PRINT);
					}
				break;

				// Request and params 
				// payments/(type of payment)/(row id)
				case 'payments':
					if (count($req) > 2) {
						echo json_encode($post->select_payments("tbl_payment_".$req[0], $req[1], $req[2]), JSON_PRETTY_PRINT);
					}
					else if ($req[1] == "checkup") {
						echo json_encode($post->select_payments("tbl_payment_".$req[0], $req[1], null), JSON_PRETTY_PRINT);
					} 
					else if ($req[1] == "transaction") {
						echo json_encode($post->select_payments("tbl_payment_".$req[0], $req[1], null), JSON_PRETTY_PRINT);
					} 
					 else {
						echo json_encode($post->select_payments("tbl_payment_".$req[0], null, $req[1]), JSON_PRETTY_PRINT);
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