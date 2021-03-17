<?php
	class GlobalMethods {
		protected $pdo;

		public function __construct(\PDO $pdo) {
			$this->pdo = $pdo;
		}

		public function select($table, $filter_data) {
			$sql = "SELECT * FROM $table ";

			if ($filter_data != null) {
				$sql .= "WHERE user_id = '$filter_data'";
			}
			$data = array(); $errmsg = ""; $code = 0;
			try {
				if ($res = $this->pdo->query($sql)->fetchAll()) {
					foreach ($res as $rec) {
						array_push($data, $rec);
						$res = null; $code = 200;
					}
				}
			} catch(\PDOException $e) {
				$errmsg = $e->getMessage(); $code = 401;
			}
			return array("code" => $code, "data" => $data, "errmsg" => $errmsg);
		}

		public function insert($table, $data) {
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
				return array("code" => 200, "remarks" => "success");
			} catch(\PDOException $e) {
				$errmsg = $e->getMessage(); $code = 403;
			}
			return array("code" => $code, "errmsg" => $errmsg);
		}
	}
?>