<?php
	class Auth {
		protected $gm, $pdo;

		public function __construct(\PDO $pdo) {
			$this->pdo = $pdo;
			$this->gm = new GlobalMethods($pdo);
		}

		function encryptPassword($pword): ?string {
			$hashFormat="$2y$10$";
			$saltLength=22;
			$salt=$this->generateSalt($saltLength);
			return crypt($pword, $hashFormat.$salt);
		}

		function generateSalt($len){
			$urs=md5(uniqid(mt_rand(), true));
			$b64String=base64_encode($urs);
			$mb64String=str_replace('+','.', $b64String);
			return substr($mb64String, 0, $len);
		}

		# JWT
		protected function generateHeader() {
			$h = [
				"typ"=>"JWT",
				"alg"=>"HS256",
				"app"=>"My App",
				"dev"=>"The Developer"
			];
			return str_replace("=", "", base64_encode(json_encode($h)));
		}

		protected function generatePayload($uc, $ue, $ito) {
			$p = [
				"uc"=>$uc,
				"ue"=>$ue,
				"ito"=>$ito,
				"iby"=>"The Developer",
				"ie"=>"thedeveloper@test.com",
				"exp"=>date("Y-m-d H:i:s") //date_create()
			];
			return str_replace("=", "", base64_encode(json_encode($p)));
		}

		protected function generateToken($usercode, $useremail, $fullname) {
			$header = $this->generateHeader();
			$payload = $this->generatePayload($usercode, $useremail, $fullname);
			$signature = hash_hmac("sha256", "$header.$payload", base64_encode(SECRET));
			return "$header.$payload." .str_replace("=", "", base64_encode($signature));
		}

		#./JWT

		public function showToken($data){
			$user_data = []; 
			foreach ($data as $key => $value) {
				array_push($user_data, $value);
			}
			return $this->generateToken($user_data[1], $user_data[2], $user_data[3]);
		}

		function login($dt){
			define('TIMEZONE', 'Asia/Taipei');
			date_default_timezone_set(TIMEZONE);

			$this->sql="SELECT * FROM tbl_users WHERE fld_username='$dt->username' LIMIT 1";

			try {
				if ($res = $this->pdo->query($this->sql)->fetchColumn()>0) {
					$result=$this->pdo->query($this->sql)->fetchAll();

					$data = array(); $code = 0; $msg = ""; $remarks = "";
					foreach ($result as $rec) { 
						if($this->pwordCheck($dt->password, $rec['fld_password'])){
							$code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
							$data = array(
								"id"=>$rec['fld_id'],
								"username"=>$rec['fld_username'],
								"role"=>$rec['fld_role'],
								"subsystem"=>$rec['fld_subsystem']
							);
						} else{
							$data = array(); $code = 401; $msg = "Incorrect Password"; $remarks = "failed";
						}
					}
				} else{
					http_response_code(401);
					$data = array(); $code = 401; $msg = "User does not exist"; $remarks = "failed";
				}
			} catch (\PDOException $e) {
				$msg = $e->getMessage(); $code = 401; $remarks = "failed";
			}
			return $this->sendPayload($data, $remarks, $msg, $code);
		}

		public function sendPayload($payload, $remarks, $message, $code) {
			$status = array("remarks"=>$remarks, "message"=>$message);
			http_response_code($code);
			return array(
				"status"=>$status,
				"payload"=>$payload,
				'prepared_by'=>'Bernie L. Inociete Jr., Developer',
				"timestamp"=>date_create()
			);
		} 

		function pwordCheck($pw, $existingpw){
			$hash=crypt($pw, $existingpw);
			if($hash === $existingpw){return true;} else {return false;}
		}
	}
?>