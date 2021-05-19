<?php
	class Auth {
		protected $gm, $pdo;
		private $status =array();
		private $data = array();
		private $token = array();
		public function __construct(\PDO $pdo) {
			$this->pdo = $pdo;
			$this->gm = new GlobalMethods($pdo);
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

		public function showToken(){
			return $this->generateToken($user_data[0], $user_data[1], $user_data[2]);
		}

		//ENCRYPT PASSWORD
		function encryptPassword($pword): ?string{
            $hashFormat ="$2y$10$";
            $saltLength =22;
            $salt = $this->generateSalt($saltLength);
            return crypt($pword, $hashFormat.$salt);
        }

		//GENERATE SALT
		function generateSalt($len){
            $urs=md5(uniqid(mt_rand(), true));
            $b64string = base64_encode($urs);
            $mb64string = str_replace('+','.', $b64string);
            return substr($mb64string, 0, $len);
        }

		function pwordCheck($pw, $existingpw){
			$hash=crypt($pw, $existingpw);
			if($hash === $existingpw) {return true;} else {return false;}
		}

		function login_user($dt){
			$fld_username = $dt->fld_username;
			$fld_password = $dt->fld_password;

			$sqlstr="SELECT * FROM tbl_users WHERE fld_username='$fld_username' LIMIT 1";
			if(strpos($fld_username, "payment_") !== false){
				if($result=$this->pdo->query($sqlstr)){
					if($result->rowCount() > 0){
						$res=$result->fetch();
						if($this->pwordCheck($fld_password, $res['fld_password'])){
							http_response_code(200);
							$this->data = array(
								'fld_username'=>$res['fld_username'],
								'fld_role'=>$res['fld_role']            
							);
							$this->token = $this->generateToken($res['fld_username'], $res['fld_role'], $res['fld_id']);
							$this->status = array(
								'remarks'=>'success',
								'message'=>'successfully logged in'
							);
						} else {
							http_response_code(200);
							$this->status = array(
								'remarks'=>'failed',
								'message'=>'Incorrect username or password'
							);
						}
	
					} else {
						http_response_code(200);
						$this->status = array(
							'remarks'=>'failed',
							'message'=>'Incorrect username or password'
	
						);
					}
				} else {
					http_response_code(200);
					$this->status = array(
						'remarks'=>'failed',
						'message'=>'Incorrect username or password'
	
					);
				} 
			} else {
				http_response_code(200);
					$this->status = array(
						'remarks'=>'Incorrect Subsystem',
						'message'=>'Incorrect Subsystem, please login with the Payment Subsystem credentials'
					);
			}
			
			return array(
				'token'=>$this->token,
				'status'=>$this->status,
				'payload'=>$this->data,
				'prepared_by'=>'Jason Paul Cruz, Developer',
				'timestamp'=>date('D M j, Y G:i:s T')
			);
		}


	}
?>