import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import Swal from 'sweetalert2';

// Service
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { PaymentsService } from 'src/app/payments.service';



@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export class CheckoutPaymentComponent implements OnInit {
  pt_money_recieved: number = 0;
  paymentChange: number = 0;
  checkup: string = "Checkup";
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data,
    private paymentService: PaymentsService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    console.log("checkout: ", this.data);
    this.selectedRecord();
  }

  getChange = (): void => {
    if(this.selectedPaymentPayload.fld_totalAmount) this.paymentChange = this.pt_money_recieved - this.selectedPaymentPayload.fld_totalAmount;
    if(this.selectedPaymentPayload.fld_amount) this.paymentChange = this.pt_money_recieved - this.selectedPaymentPayload.fld_amount;
    if(this.selectedPaymentPayload.docu_prc) this.paymentChange = this.pt_money_recieved - this.selectedPaymentPayload.docu_prc;
  }

  selectedPaymentPayload: any = {};
  selectedRecord = async (): Promise<void> => {
    try {
      const response = await this.dashboardService.sendDashboardRequest(`payments/${this.data.method}/${this.data.id}`, null);
      this.selectedPaymentPayload = response.payload[0];
      console.table(response.payload[0]);
    } catch(error) {
      await Swal.fire('Oops...', 'Something went wrong', 'error');
    }
  }

  payData = async (method: string): Promise<void> => {
    try {
      let data: any = {};
      data.pt_money_recieved = this.pt_money_recieved;
      data.pt_isPayed = 1;
      const response = await this.dashboardService.sendDashboardRequest(`updatePayment/${this.data.id}/${this.data.method}`, data);
      console.log(response.payload);
      if(response.status.remarks === "success") {
          await Swal.fire('Success!', '', 'success');
        if(method === "checkup") {
          this.printReceiptCheckup(); this.sendMessage();
        }
        else if(method === "transaction") {
          this.printReceiptDocu(); this.sendMessage();
        }
        else {
          this.printReceiptOrders(); this.sendMessage();
        }
      }
    } catch(error) {
      await Swal.fire('Oops...', 'Something went wrong', 'error');
    }
  }  
  
  sendMessage = (): void => {
    this.dashboardService.updateResponse('Message from Sender Component to Receiver Component!');
  }
  
  name: string;
  date: string;
  expenseFor: string;
  paymentFor: string;
  amount: number;
  receive: any;
  printdata: any;
  printdata2: any;
  printdata3: any;
  
     
  //Checkup
    printReceiptCheckup = async (): Promise<void> => {
      const response = await this.dashboardService.sendDashboardRequest(`payments/${this.data.method}/${this.data.id}`, null);
      console.log(this.data.method);
      console.log(response.payload[0]);
      this.printdata3 = response.payload[0];
      this.name = this.printdata3.res_lname+', '+this.printdata3.res_fname;
      this.date = this.printdata3.pt_date;
      this.amount = this.printdata3.fld_amount;
      this.receive = this.printdata3.pt_money_recieved;

      const docDefinition3 = {
        info: {
          title: 'Receipt For '+this.name+' ',
        },
        content: [
        {
          text: 'Republic of the Philippines',
          fontSize: 15,
          alignment: 'center',
          bold: true,
          margin: [0, 3,0, 3],
        },
        {
          text: 'CITY OF OLONGAPO',
          fontSize: 15,
          bold: true,
          alignment: 'center',
          margin: [0, 3,0, 3]   
        },
        {
          text: 'Barangay Management System',
          fontSize: 15,
          bold: true,
          alignment: 'center',
          margin: [0, 10, 0, 10]   
        },
        {
          text: 'OFFICE OF THE LUPONG TAGAMAPAYAPA',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          margin: [0, 10, 0, 10]   
        },
        {
          text: 'Official Receipt',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              { 
                text: this.name,
                style: 'details1' 
              },
              { 
                text: 'Payment For: Checkup',
                style: 'details1'
              },
              { 
                text: 'Payment Fee: Php '+this.amount+'.00',
                style: 'details1'
              },
              { 
                text: 'Cash: Php '+this.receive+'.00',
                style: 'details1'
              }
            ],
            [
              {
                text: 'Date: '+this.date,
                alignment: 'right' ,
                style: 'details1'
              }
              // ,
              // { 
              //   text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
              //   alignment: 'right' ,
              //   style: 'details1'
              // }
            ]
          ]
        },
        {
          columns: [
            [{ text: 'Office Stamp', style:'officeStamp' }],
            [{ text: 'Signature', alignment: 'right', italics: true, style:'signature'}],
          ]
        },
        { 
          text: 'Issued In: Barangay Barretto' ,
          style: 'details2'
        },
        { 
          text: 'Receiver: Barangay Official' ,
          style: 'details1'
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          fontSize: 18,
          margin: [0, 70,0, 20]          
        },
        details: {
          bold: true,
          fontSize: 14,
          margin: [0, 5,0, 5]          
        },
        details1: {
          fontSize: 14,
          margin: [0, 5,0, 5]          
        },
        details2: {
          fontSize: 14,
          margin: [0, 55,0, 5]          
        },
        signature: {
          fontSize: 14,
          margin: [0, 55,0, 20]          
        },
        officeStamp: {
          bold: true,
          fontSize: 18,
          margin: [0, 55,0, 20]          
        }
      }
    };

    pdfMake.createPdf(docDefinition3).open();
  }

     //Documents
      printReceiptDocu = async (): Promise<void> => {
        const response = await this.dashboardService.sendDashboardRequest(`payments/${this.data.method}/${this.data.id}`, null);
        this.printdata2 = response.payload[0];
        this.paymentFor = this.printdata2.docu_type;
        this.name = this.printdata2.res_lname+', '+this.printdata2.res_fname;
        this.date = this.printdata2.pt_date;
        this.amount = this.printdata2.docu_prc;
        this.receive = this.printdata2.pt_money_recieved;

        const docDefinition2 = {
          info: {
            title: 'Receipt For '+this.name+' ',
          },
          content: [
          {
            text: 'Republic of the Philippines',
            fontSize: 15,
            alignment: 'center',
            bold: true,
            margin: [0, 3,0, 3],
          },
          {
            text: 'CITY OF OLONGAPO',
            fontSize: 15,
            bold: true,
            alignment: 'center',
            margin: [0, 3,0, 3]   
          },
          {
            text: 'Barangay Management System',
            fontSize: 15,
            bold: true,
            alignment: 'center',
            margin: [0, 10, 0, 10]   
          },
          {
            text: 'OFFICE OF THE LUPONG TAGAMAPAYAPA',
            fontSize: 20,
            bold: true,
            alignment: 'center',
            margin: [0, 10, 0, 10]   
          },
          {
            text: 'Official Receipt',
            style: 'sectionHeader'
          },
          {
            columns: [
              [
                { 
                  text: this.name,
                  style: 'details1' 
                },
                { 
                  text: 'Payment For: '+this.paymentFor,
                  style: 'details1'
                },
                { 
                  text: 'Payment Fee: Php '+this.amount+'.00',
                  style: 'details1'
                },
                { 
                  text: 'Cash: Php '+this.receive+'.00',
                  style: 'details1'
                }
              ],
              [
                {
                  text: 'Date: '+this.date,
                  alignment: 'right' ,
                  style: 'details1'
                }
                // ,
                // { 
                //   text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
                //   alignment: 'right' ,
                //   style: 'details1'
                // }
              ]
            ]
          },
          {
            columns: [
              [{ text: 'Office Stamp', style:'officeStamp' }],
              [{ text: 'Signature', alignment: 'right', italics: true, style:'signature'}],
            ]
          },
          { 
            text: 'Issued In: Barangay Barretto' ,
            style: 'details2'
          },
          { 
            text: 'Receiver: Barangay Official' ,
            style: 'details1'
          }
        ],
        styles: {
          sectionHeader: {
            bold: true,
            fontSize: 18,
            margin: [0, 70,0, 20]          
          },
          details: {
            bold: true,
            fontSize: 14,
            margin: [0, 5,0, 5]          
          },
          details1: {
            fontSize: 14,
            margin: [0, 5,0, 5]          
          },
          details2: {
            fontSize: 14,
            margin: [0, 55,0, 5]          
          },
          signature: {
            fontSize: 14,
            margin: [0, 55,0, 20]          
          },
          officeStamp: {
            bold: true,
            fontSize: 18,
            margin: [0, 55,0, 20]          
          }
        }
      };

    pdfMake.createPdf(docDefinition2).open();
  }

   //Orders
   printReceiptOrders = async (): Promise<void> => {
    const response = await this.dashboardService.sendDashboardRequest(`payments/${this.data.method}/${this.data.id}`, null);
    this.printdata = response.payload[0];
    this.name = this.printdata.med_name;
    this.date = this.printdata.pt_date;
    this.amount = this.printdata.fld_totalAmount;
    console.log(this.printdata); 

    const docDefinition = {
      info: {
        title: 'Receipt For '+this.name+' '+this.date,
      },
      content: [
      {
        text: 'Republic of the Philippines',
        fontSize: 15,
        alignment: 'center',
        bold: true,
        margin: [0, 3,0, 3],
      },
      {
        text: 'CITY OF OLONGAPO',
        fontSize: 15,
        bold: true,
        alignment: 'center',
        margin: [0, 3,0, 3]   
      },
      {
        text: 'Barangay Management System',
        fontSize: 15,
        bold: true,
        alignment: 'center',
        margin: [0, 10, 0, 10]   
      },
      {
        text: 'OFFICE OF THE LUPONG TAGAMAPAYAPA',
        fontSize: 20,
        bold: true,
        alignment: 'center',
        margin: [0, 10, 0, 10]   
      },
      {
        text: 'Official Receipt',
        style: 'sectionHeader'
      },
      {
        columns: [
          [
            { 
              text: 'Payment For: '+this.name,
              style: 'details1'
            },
            { 
              text: 'Total Amount: Php '+this.amount+'.00',
              style: 'details1'
            },
            { 
              text: 'Payment Received: Php '+this.pt_money_recieved+'.00',
              style: 'details1'
            }
          ],
          [
            {
              text: 'Date: '+this.date,
              alignment: 'right' ,
              style: 'details1'
            }
          ]
        ]
      },
      {
        columns: [
          [{ text: 'Office Stamp', style:'officeStamp' }],
          [{ text: 'Signature', alignment: 'right', italics: true, style:'signature'}],
        ]
      },
      { 
        text: 'Issued In: Barangay Barretto' ,
        style: 'details2'
      },
      { 
        text: 'Receiver: Barangay Official' ,
        style: 'details1'
      }
    ],
    styles: {
      sectionHeader: {
        bold: true,
        fontSize: 18,
        margin: [0, 70,0, 20]          
      },
      details: {
        bold: true,
        fontSize: 14,
        margin: [0, 5,0, 5]          
      },
      details1: {
        fontSize: 14,
        margin: [0, 5,0, 5]          
      },
      details2: {
        fontSize: 14,
        margin: [0, 55,0, 5]          
      },
      signature: {
        fontSize: 14,
        margin: [0, 55,0, 20]          
      },
      officeStamp: {
        bold: true,
        fontSize: 18,
        margin: [0, 55,0, 20]          
      }
    }
  };

pdfMake.createPdf(docDefinition).open();
}


}
