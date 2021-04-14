<?php
	class Post {
		private $pdo;
		private $sql;
		private $data = array();
		private $staus = array();

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

		public function select_expenses($table, $filter_data) {
			$this->sql = "SELECT 
								$table.exp_id,
								$table.res_id,
								tbl_profiling_residents.res_lname,
								tbl_profiling_residents.res_fname,
								tbl_profiling_residents.res_mname,
								$table.exp_desc,
								$table.exp_for,
								$table.exp_money_release,
								$table.exp_date,
								$table.exp_isDeleted
								FROM $table
								LEFT JOIN tbl_profiling_residents
								ON $table.res_id = tbl_profiling_residents.res_id ";

			if ($filter_data != null) {
				$this->sql .= " WHERE exp_isDeleted = $filter_data ORDER BY exp_id";
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
			if ($payment == null) return $this->select($table, "pt_isPayed=".$filter_data." AND pt_isDeleted=".$filter_data);
			
			if (isset($payment) && $payment == "checkup") {
				$this->sql = "SELECT 
								$table.pt_id,
								$table.checkup_id,
								tbl_clinic_checkups.medOrder_id,
								tbl_profiling_residents.res_lname,
								tbl_profiling_residents.res_fname,
								tbl_profiling_residents.res_mname,
								$table.pt_desc,
								$table.pt_money_recieved,
								$table.pt_date,
								$table.pt_isPayed,
								$table.pt_isDeleted
								FROM $table
								LEFT JOIN tbl_clinic_checkups
								ON $table.checkup_id = tbl_clinic_checkups.checkup_id
								LEFT JOIN tbl_profiling_residents
								ON tbl_clinic_checkups.res_id = tbl_profiling_residents.res_id
								WHERE $table.trans_id is NULL ";
			} else if (isset($payment) && $payment == "transaction") {
				$this->sql = "SELECT 
								$table.pt_id,
								$table.trans_id,
								tbl_profiling_residents.res_lname,
								tbl_profiling_residents.res_fname,
								tbl_profiling_residents.res_mname,
								tbl_docuissuance_documents.docu_type,
								tbl_docuissuance_documents.docu_prc,
								$table.pt_desc,
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
								WHERE $table.checkup_id is NULL ";
			}

			if ($filter_data != null) {
				$this->sql .= "AND $table.pt_isDeleted = $filter_data ORDER BY $table.pt_id";
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

		public function new_payment_expenses($table, $data) {
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
				return $this->select_expenses($table, "0");

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
				if ($payment == "checkup" || $payment == "transaction") return $this->select_payments($table, $payment, "0");
				return $this->select_expenses($table, "0");

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