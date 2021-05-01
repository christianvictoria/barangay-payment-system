export class Payment {
	pt_id: number;
	checkup_id: number;
	trans_id: number;
	pt_money_recieved: string;
	pt_date: string;
	pt_isPayed: string;
	pt_isDeleted: string;

	constructor() {
		this.pt_money_recieved = "";
		this.pt_date = "";
		this.pt_isPayed = "";
        this.pt_isDeleted = "";
	}
}