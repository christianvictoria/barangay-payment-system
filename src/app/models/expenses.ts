export class Expenses {
	exp_id: number;
	exp_lname: string;
	exp_fname: string;
	exp_mname: string;
	exp_desc: string;
	exp_for: string;	
	exp_money_release: number;
	exp_date: any;
	exp_isDeleted: number;
	constructor() {
		this.exp_lname = "";
		this.exp_fname = "";
		this.exp_mname = "";
		this.exp_desc = "";
		this.exp_for = "";
		this.exp_money_release = 0;
		this.exp_isDeleted = 0;
	}
}