<?php
	class Post {
		private $pdo;
		private $sql;
		private $data = array();
		private $staus = array();
		private $payments = array("checkup", "transaction", "order");

		public function __construct(\PDO $pdo) {
			$this->pdo = $pdo;
		}

		public function select($table, $filter_data) {
			$this->sql = "SELECT * FROM $table ";

			if ($filter_data != null) {
				$this->sql .= "WHERE $filter_data";
			}
			$data = array(); $errmsg = ""; $code = 0;
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) {
						array_push($data, $rec);
						$res = null; $code = 200;
					}
				}
			} catch(\PDOException $e) {
				$errmsg = $e->getMessage(); $code = 401;
			}
			return $this->sendPayload($data, "success", $errmsg, $code);
		}

		public function select2($table, $filter_data) {
			$this->sql = "SELECT * FROM $table ";

			if ($filter_data != null) {
				$this->sql .= "WHERE $filter_data";
			}
			$data = array(); $errmsg = ""; $code = 0;
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) {
						array_push($data, $rec);
						$res = null; $code = 200;
					}
				}
			} catch(\PDOException $e) {
				$errmsg = $e->getMessage(); $code = 401;
			}
			return $this->sendPayload($data, "success", $errmsg, $code);
		}

		public function filter_expenses($table, $filter_data) {
			$this->sql = "SELECT * FROM $table WHERE exp_isDeleted <> 1";

			if ($filter_data != null) {
				$this->sql .= " AND CONCAT(person_lname, ', ', person_fname, ' ', person_mname) LIKE '%$filter_data%'
								OR exp_for LIKE '%$filter_data%'
								AND exp_isDeleted = 0
								OR exp_id LIKE '%$filter_data%'
								AND exp_isDeleted = 0";
			}

			$data = array(); $errmsg = ""; $code = 0;
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) {
						array_push($data, $rec);
						$res = null; $code = 200;
					}
				}
			} catch(\PDOException $e) {
				$errmsg = $e->getMessage(); $code = 401;
			}
			return $this->sendPayload($data, "success", $errmsg, $code);
		}

		public function select_expenses($table, $filter_data) {
			$this->sql = "SELECT * FROM $table WHERE exp_isDeleted = 0 ";

			if ($filter_data != null) {
				$this->sql .= " AND exp_id = $filter_data ORDER BY exp_id";
			}

			$data = array(); $errmsg = ""; $code = 0;
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) {
						array_push($data, $rec);
						$res = null; $code = 200;
					}
				}
			} catch(\PDOException $e) {
				$errmsg = $e->getMessage(); $code = 401;
			}
			return $this->sendPayload($data, "success", $errmsg, $code);
		}

		public function jan($table, $filter_data) {
			$this->sql = "SELECT * FROM tbl_payment_expenses WHERE exp_date BETWEEN CONCAT(YEAR(CURDATE()),'-01-01') AND CONCAT(YEAR(CURDATE()),'-01-31')";
			if ($filter_data != null) {
				$this->sql .= " exp_date BETWEEN STR_TO_DATE('$filter_data-05-01', '%Y-%m-%d') AND STR_TO_DATE('$filter_data-05-31', '%Y-%m-%d')";
			}

			$data = array(); $errmsg = ""; $code = 0;
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) {
						array_push($data, $rec);
						$res = null; $code = 200;
					}
				}
			} catch(\PDOException $e) {
				$errmsg = $e->getMessage(); $code = 401;
			}
			return $this->sendPayload($data, "success", $errmsg, $code);
		}

		public function feb($table, $filter_data) {
			$this->sql = "SELECT * FROM tbl_payment_expenses WHERE exp_date BETWEEN CONCAT(YEAR(CURDATE()),'-02-01') AND CONCAT(YEAR(CURDATE()),'-02-31')";
			if ($filter_data != null) {
				$this->sql .= " exp_date BETWEEN STR_TO_DATE('$filter_data-05-01', '%Y-%m-%d') AND STR_TO_DATE('$filter_data-05-31', '%Y-%m-%d')";
			}

			$data = array(); $errmsg = ""; $code = 0;
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) {
						array_push($data, $rec);
						$res = null; $code = 200;
					}
				}
			} catch(\PDOException $e) {
				$errmsg = $e->getMessage(); $code = 401;
			}
			return $this->sendPayload($data, "success", $errmsg, $code);
		}

		public function mar($table, $filter_data) {
			$this->sql = "SELECT * FROM tbl_payment_expenses WHERE exp_date BETWEEN CONCAT(YEAR(CURDATE()),'-03-01') AND CONCAT(YEAR(CURDATE()),'-03-31')";
			if ($filter_data != null) {
				$this->sql .= " exp_date BETWEEN STR_TO_DATE('$filter_data-05-01', '%Y-%m-%d') AND STR_TO_DATE('$filter_data-05-31', '%Y-%m-%d')";
			}

			$data = array(); $errmsg = ""; $code = 0;
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) {
						array_push($data, $rec);
						$res = null; $code = 200;
					}
				}
			} catch(\PDOException $e) {
				$errmsg = $e->getMessage(); $code = 401;
			}
			return $this->sendPayload($data, "success", $errmsg, $code);
		}

		public function apr($table, $filter_data) {
			$this->sql = "SELECT * FROM tbl_payment_expenses WHERE exp_date BETWEEN CONCAT(YEAR(CURDATE()),'-04-01') AND CONCAT(YEAR(CURDATE()),'-04-31')";
			if ($filter_data != null) {
				$this->sql .= " exp_date BETWEEN STR_TO_DATE('$filter_data-05-01', '%Y-%m-%d') AND STR_TO_DATE('$filter_data-05-31', '%Y-%m-%d')";
			}

			$data = array(); $errmsg = ""; $code = 0;
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) {
						array_push($data, $rec);
						$res = null; $code = 200;
					}
				}
			} catch(\PDOException $e) {
				$errmsg = $e->getMessage(); $code = 401;
			}
			return $this->sendPayload($data, "success", $errmsg, $code);
		}

		public function may($table, $filter_data) {
			$this->sql = "SELECT * FROM tbl_payment_expenses WHERE exp_date BETWEEN CONCAT(YEAR(CURDATE()),'-05-01') AND CONCAT(YEAR(CURDATE()),'-05-31')";
			if ($filter_data != null) {
				$this->sql .= " exp_date BETWEEN STR_TO_DATE('$filter_data-05-01', '%Y-%m-%d') AND STR_TO_DATE('$filter_data-05-31', '%Y-%m-%d')";
			}

			$data = array(); $errmsg = ""; $code = 0;
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) {
						array_push($data, $rec);
						$res = null; $code = 200;
					}
				}
			} catch(\PDOException $e) {
				$errmsg = $e->getMessage(); $code = 401;
			}
			return $this->sendPayload($data, "success", $errmsg, $code);
		}

		public function jun($table, $filter_data) {
			$this->sql = "SELECT * FROM tbl_payment_expenses WHERE exp_date BETWEEN CONCAT(YEAR(CURDATE()),'-06-01') AND CONCAT(YEAR(CURDATE()),'-06-31')";
			if ($filter_data != null) {
				$this->sql .= " exp_date BETWEEN STR_TO_DATE('$filter_data-05-01', '%Y-%m-%d') AND STR_TO_DATE('$filter_data-05-31', '%Y-%m-%d')";
			}

			$data = array(); $errmsg = ""; $code = 0;
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) {
						array_push($data, $rec);
						$res = null; $code = 200;
					}
				}
			} catch(\PDOException $e) {
				$errmsg = $e->getMessage(); $code = 401;
			}
			return $this->sendPayload($data, "success", $errmsg, $code);
		}

		public function jul($table, $filter_data) {
			$this->sql = "SELECT * FROM tbl_payment_expenses WHERE exp_date BETWEEN CONCAT(YEAR(CURDATE()),'-07-01') AND CONCAT(YEAR(CURDATE()),'-07-31')";
			if ($filter_data != null) {
				$this->sql .= " exp_date BETWEEN STR_TO_DATE('$filter_data-05-01', '%Y-%m-%d') AND STR_TO_DATE('$filter_data-05-31', '%Y-%m-%d')";
			}

			$data = array(); $errmsg = ""; $code = 0;
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) {
						array_push($data, $rec);
						$res = null; $code = 200;
					}
				}
			} catch(\PDOException $e) {
				$errmsg = $e->getMessage(); $code = 401;
			}
			return $this->sendPayload($data, "success", $errmsg, $code);
		}

		public function aug($table, $filter_data) {
			$this->sql = "SELECT * FROM tbl_payment_expenses WHERE exp_date BETWEEN CONCAT(YEAR(CURDATE()),'-08-01') AND CONCAT(YEAR(CURDATE()),'-08-31')";
			if ($filter_data != null) {
				$this->sql .= " exp_date BETWEEN STR_TO_DATE('$filter_data-05-01', '%Y-%m-%d') AND STR_TO_DATE('$filter_data-05-31', '%Y-%m-%d')";
			}

			$data = array(); $errmsg = ""; $code = 0;
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) {
						array_push($data, $rec);
						$res = null; $code = 200;
					}
				}
			} catch(\PDOException $e) {
				$errmsg = $e->getMessage(); $code = 401;
			}
			return $this->sendPayload($data, "success", $errmsg, $code);
		}


		public function sep($table, $filter_data) {
			$this->sql = "SELECT * FROM tbl_payment_expenses WHERE exp_date BETWEEN CONCAT(YEAR(CURDATE()),'-09-01') AND CONCAT(YEAR(CURDATE()),'-09-31')";
			if ($filter_data != null) {
				$this->sql .= " exp_date BETWEEN STR_TO_DATE('$filter_data-05-01', '%Y-%m-%d') AND STR_TO_DATE('$filter_data-05-31', '%Y-%m-%d')";
			}

			$data = array(); $errmsg = ""; $code = 0;
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) {
						array_push($data, $rec);
						$res = null; $code = 200;
					}
				}
			} catch(\PDOException $e) {
				$errmsg = $e->getMessage(); $code = 401;
			}
			return $this->sendPayload($data, "success", $errmsg, $code);
		}

		public function oct($table, $filter_data) {
			$this->sql = "SELECT * FROM tbl_payment_expenses WHERE exp_date BETWEEN CONCAT(YEAR(CURDATE()),'-10-01') AND CONCAT(YEAR(CURDATE()),'-10-31')";
			if ($filter_data != null) {
				$this->sql .= " exp_date BETWEEN STR_TO_DATE('$filter_data-05-01', '%Y-%m-%d') AND STR_TO_DATE('$filter_data-05-31', '%Y-%m-%d')";
			}

			$data = array(); $errmsg = ""; $code = 0;
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) {
						array_push($data, $rec);
						$res = null; $code = 200;
					}
				}
			} catch(\PDOException $e) {
				$errmsg = $e->getMessage(); $code = 401;
			}
			return $this->sendPayload($data, "success", $errmsg, $code);
		}

		public function nov($table, $filter_data) {
			$this->sql = "SELECT * FROM tbl_payment_expenses WHERE exp_date BETWEEN CONCAT(YEAR(CURDATE()),'-11-01') AND CONCAT(YEAR(CURDATE()),'-11-31')";
			if ($filter_data != null) {
				$this->sql .= " exp_date BETWEEN STR_TO_DATE('$filter_data-05-01', '%Y-%m-%d') AND STR_TO_DATE('$filter_data-05-31', '%Y-%m-%d')";
			}

			$data = array(); $errmsg = ""; $code = 0;
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) {
						array_push($data, $rec);
						$res = null; $code = 200;
					}
				}
			} catch(\PDOException $e) {
				$errmsg = $e->getMessage(); $code = 401;
			}
			return $this->sendPayload($data, "success", $errmsg, $code);
		}

		public function dec($table, $filter_data) {
			$this->sql = "SELECT * FROM tbl_payment_expenses WHERE exp_date BETWEEN CONCAT(YEAR(CURDATE()),'-12-01') AND CONCAT(YEAR(CURDATE()),'-12-31')";
			if ($filter_data != null) {
				$this->sql .= " exp_date BETWEEN STR_TO_DATE('$filter_data-05-01', '%Y-%m-%d') AND STR_TO_DATE('$filter_data-05-31', '%Y-%m-%d')";
			}

			$data = array(); $errmsg = ""; $code = 0;
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) {
						array_push($data, $rec);
						$res = null; $code = 200;
					}
				}
			} catch(\PDOException $e) {
				$errmsg = $e->getMessage(); $code = 401;
			}
			return $this->sendPayload($data, "success", $errmsg, $code);
		}

		public function select_payments($table, $payment, $filter_data) {
			if (isset($payment) && $payment == "checkup") {
				$this->sql = "SELECT 
								$table.pt_id,
								$table.checkup_id,
								tbl_clinic_checkups.medOrder_id,
								tbl_profiling_residents.res_lname,
								tbl_profiling_residents.res_fname,
								tbl_profiling_residents.res_mname,
								tbl_clinic_checkups.fld_amount,
								$table.pt_money_recieved,
								$table.pt_date,
								$table.pt_isPayed,
								$table.pt_isDeleted
								FROM $table
								LEFT JOIN tbl_clinic_checkups
								ON $table.checkup_id = tbl_clinic_checkups.checkup_id
								LEFT JOIN tbl_profiling_residents
								ON tbl_clinic_checkups.patient_id = tbl_profiling_residents.res_id
								WHERE $table.trans_id is NULL 
								AND $table.medOrder_id is NULL
								AND $table.pt_isDeleted = 0 ";
			} else if (isset($payment) && $payment == "transaction") {
				$this->sql = "SELECT 
								$table.pt_id,
								$table.trans_id,
								tbl_profiling_residents.res_lname,
								tbl_profiling_residents.res_fname,
								tbl_profiling_residents.res_mname,
								tbl_docuissuance_documents.docu_type,
								tbl_docuissuance_documents.docu_prc,
								$table.pt_money_recieved,
								$table.pt_date,
								$table.pt_isPayed,
								$table.pt_isDeleted
								FROM $table
								LEFT JOIN tbl_docuissuance_doctransaction
								ON $table.trans_id = tbl_docuissuance_doctransaction.trans_id
								LEFT JOIN tbl_profiling_residents
								ON tbl_docuissuance_doctransaction.res_id = tbl_profiling_residents.res_id
								LEFT JOIN tbl_docuissuance_documents
								ON tbl_docuissuance_doctransaction.docu_id = tbl_docuissuance_documents.docu_id
								WHERE $table.checkup_id is NULL 
								AND $table.medOrder_id is NULL
								AND $table.pt_isDeleted = 0 ";
			} else if (isset($payment) && $payment == "order") {
				$this->sql = "SELECT tbl_payment_payments.pt_id,
								tbl_clinic_medicines.med_name,
								tbl_clinic_medicine_orders.fld_totalQuantity,
								tbl_clinic_medicine_orders.fld_totalAmount,
								tbl_payment_payments.pt_money_recieved,
								tbl_payment_payments.pt_date,
								tbl_payment_payments.pt_isPayed
								from tbl_payment_payments
								LEFT JOIN tbl_clinic_medicine_orders on tbl_clinic_medicine_orders.medOrder_id =  tbl_payment_payments.medOrder_id
								LEFT JOIN tbl_clinic_order_details on tbl_clinic_order_details.med_order_id =  tbl_clinic_medicine_orders.medOrder_id
								LEFT JOIN tbl_clinic_medicines on tbl_clinic_order_details.med_id = tbl_clinic_medicines.med_id WHERE tbl_payment_payments.checkup_id is NULL
								AND tbl_payment_payments.trans_id is NULL
								AND tbl_payment_payments.pt_isDeleted = 0 ";
			}

			if ($filter_data != null) $this->sql .= "AND $filter_data";
			

			$data = array(); $errmsg = ""; $code = 0;
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) {
						array_push($data, $rec);
						$res = null; $code = 200;
					}
				}
			} catch(\PDOException $e) {
				$errmsg = $e->getMessage(); $code = 401;
			}
			return $this->sendPayload($data, "success", $errmsg, $code);
		}

		public function select_archives($table, $payment, $filter_data) {
			if (isset($payment) && $payment == "checkup") {
				$this->sql = "SELECT 
								$table.pt_id,
								$table.checkup_id,
								tbl_clinic_checkups.medOrder_id,
								tbl_profiling_residents.res_lname,
								tbl_profiling_residents.res_fname,
								tbl_profiling_residents.res_mname,
								tbl_clinic_checkups.fld_amount,
								$table.pt_money_recieved,
								$table.pt_date,
								$table.pt_isPayed,
								$table.pt_isDeleted
								FROM $table
								LEFT JOIN tbl_clinic_checkups
								ON $table.checkup_id = tbl_clinic_checkups.checkup_id
								LEFT JOIN tbl_profiling_residents
								ON tbl_clinic_checkups.patient_id = tbl_profiling_residents.res_id
								WHERE $table.trans_id is NULL 
								AND $table.medOrder_id is NULL
								AND $table.pt_isDeleted = 1 ";
			} else if (isset($payment) && $payment == "transaction") {
				$this->sql = "SELECT 
								$table.pt_id,
								$table.trans_id,
								tbl_profiling_residents.res_lname,
								tbl_profiling_residents.res_fname,
								tbl_profiling_residents.res_mname,
								tbl_docuissuance_documents.docu_type,
								tbl_docuissuance_documents.docu_prc,
								$table.pt_money_recieved,
								$table.pt_date,
								$table.pt_isPayed,
								$table.pt_isDeleted
								FROM $table
								LEFT JOIN tbl_docuissuance_doctransaction
								ON $table.trans_id = tbl_docuissuance_doctransaction.trans_id
								LEFT JOIN tbl_profiling_residents
								ON tbl_docuissuance_doctransaction.res_id = tbl_profiling_residents.res_id
								LEFT JOIN tbl_docuissuance_documents
								ON tbl_docuissuance_doctransaction.docu_id = tbl_docuissuance_documents.docu_id
								WHERE $table.checkup_id is NULL 
								AND $table.medOrder_id is NULL
								AND $table.pt_isDeleted = 1 ";
			} else if (isset($payment) && $payment == "order") {
				$this->sql = "SELECT tbl_payment_payments.pt_id,
								tbl_clinic_medicines.med_name,
								tbl_clinic_medicine_orders.fld_totalQuantity,
								tbl_clinic_medicine_orders.fld_totalAmount,
								tbl_payment_payments.pt_money_recieved,
								tbl_payment_payments.pt_date,
								tbl_payment_payments.pt_isPayed
								from tbl_payment_payments
								LEFT JOIN tbl_clinic_medicine_orders on tbl_clinic_medicine_orders.medOrder_id =  tbl_payment_payments.medOrder_id
								LEFT JOIN tbl_clinic_order_details on tbl_clinic_order_details.med_order_id =  tbl_clinic_medicine_orders.medOrder_id
								LEFT JOIN tbl_clinic_medicines on tbl_clinic_order_details.med_id = tbl_clinic_medicines.med_id WHERE tbl_payment_payments.checkup_id is NULL
								AND tbl_payment_payments.trans_id is NULL
								AND tbl_payment_payments.pt_isDeleted = 1 ";
			}

			if ($filter_data != null) $this->sql .= "AND $filter_data";
			

			$data = array(); $errmsg = ""; $code = 0;
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) {
						array_push($data, $rec);
						$res = null; $code = 200;
					}
				}
			} catch(\PDOException $e) {
				$errmsg = $e->getMessage(); $code = 401;
			}
			return $this->sendPayload($data, "success", $errmsg, $code);
		}

		

		public function new_payment_expenses($table, $data, $payment) {
			$fields = []; $values = [];
			foreach ($data as $key => $value) {
				array_push($fields, $key);
				array_push($values, $value);
			}
			try {
				$ctr = 0;
				$sqlstr = "INSERT INTO $table (";
				foreach ($fields as $field) {
					$sqlstr .= $field;
					$ctr++;
					if($ctr < count($fields)) {
						$sqlstr .= ", ";
					}
				}

				$sqlstr .= ") VALUES (".str_repeat("?, ", count($values)-1)."?)";

				$sql = $this->pdo->prepare($sqlstr);
				$sql->execute($values);
				if (in_array($payment, $this->payments)) return $this->select_payments($table, $payment, "0");
				return $this->select_expenses($table, null);

			} catch(\PDOException $e) {
				$errmsg = $e->getMessage(); $code = 403;
			}
			return array("code" => $code, "errmsg" => $errmsg);
		}

		public function update_payment_expenses($table, $data, $conditionString, $payment) {
			$fields = []; $values = []; $setStr = "";
			foreach ($data as $key => $value) {
				array_push($fields, $key);
				array_push($values, $value);
			}

			try {
				$ctr = 0;
				$sqlstr = "UPDATE $table SET ";
				foreach ($data as $key => $value) {
					$sqlstr .= "$key=?"; 
					$ctr++;
					if ($ctr < count($fields)) {
						$sqlstr .= ", ";
					}
				}
				$sqlstr .= " WHERE $conditionString";

				$sql = $this->pdo->prepare($sqlstr);
				$sql->execute($values);
				if (in_array($payment, $this->payments)) return $this->select_payments($table, $payment, "0");
				return $this->select_expenses($table, null);

			} catch(\PDOException $e) {
				$errmsg = $e->getMessage(); $code = 403;
			}
			return array("code" => $code, "errmsg" => $errmsg);
		}

		public function sendPayload($payload, $remarks, $message, $code) {
			$status = array("remarks"=>$remarks, "message"=>$message);
			http_response_code($code);
			return array(
				"status"=>$status,
				"payload"=>$payload,
				"timestamp"=>date_create()
			);
		} 
	}
?>