export class Expenses {
	exp_id: number;
	res_id: number;
	exp_desc: string;
	exp_for: string;	
	exp_money_release: number;
	exp_date: any;
	exp_isDeleted: number;
	constructor() {
		this.res_id = 0;
		this.exp_desc = "";
		this.exp_for = "";
		this.exp_money_release = 0;
		this.exp_isDeleted = 0;
	}
}