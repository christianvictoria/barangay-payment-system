export class Expenses {
	exp_id: number;
	person_lname: string;
	person_fname: string;
	person_mname: string;
	exp_desc: string;
	exp_for: string;	
	exp_money_release: number;
	exp_date: any;
	exp_isDeleted: number;
	constructor() {
		this.person_lname = "";
		this.person_fname = "";
		this.person_mname = "";
		this.exp_desc = "";
		this.exp_for = "";
		this.exp_money_release = 0;
		this.exp_isDeleted = 0;
	}
}