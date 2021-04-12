import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-checkout-expense',
  templateUrl: './checkout-expense.component.html',
  styleUrls: ['./checkout-expense.component.css']
})
export class CheckoutExpenseComponent implements OnInit {

  constructor() { }
  

  ngOnInit(): void {
  }

  generatePDF(){
    var docDefinition = {
      content: [
      {
        text: 'REPUBLIC OF THE PHILIPPINES',
        fontSize: 15,
        alignment: 'center',
        bold: true,
        margin: [0, 3,0, 3]   
      },
      {
        text: 'CITY OF OLONGAPO',
        fontSize: 15,
        bold: true,
        alignment: 'center',
        margin: [0, 3,0, 3]   
      },
      {
        text: 'BARANGAY',
        fontSize: 15,
        bold: true,
        alignment: 'center',
        margin: [0, 8,0, 8]   
      },
      {
        text: 'OFFICE OF THE PUNONG BARANGAY',
        fontSize: 20,
        bold: true,
        alignment: 'center',
        margin: [0, 5,0, 5]   
      },
      {
        text: 'Official Receipt',
        style: 'sectionHeader'
      },
      {
        columns: [
          [
            { 
              text: 'Christian Alip',
              style: 'details1' 
            },
            { 
              text: '091234567890',
              style: 'details1' 
            },
            { 
              text: '13 Gabaya Street Barangay Barretto' ,
              style: 'details1'
            },
            { 
              text: 'Expense For: Clean Up Drive' ,
              style: 'details1'
            },
            { 
              text: 'Budget Fee: Php 15,000.00' ,
              style: 'details1'
            },
            { 
              text: 'Tax: Php 0.00' ,
              style: 'details1'
            },
            { 
              text: 'Cash: Php 20,000.00' ,
              style: 'details1'
            },
            { 
              text: 'Change: Php 5,000.00' ,
              style: 'details1'
            },
          ],
          [
            {
              text: `Date: ${new Date().toLocaleString()}`,
              alignment: 'right' ,
              style: 'details1'
            },
            { 
              text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
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
      },
      {
        text: 'Terms and Conditions',
        style: 'sectionHeader'
      },
      {
          ul: [
            'Terms and Conditions Here',
            'Terms and Conditions Here',
            'Terms and Conditions Here'
          ], 
      }
    ],
    styles: {
      sectionHeader: {
        bold: true,
        fontSize: 18,
        margin: [0, 35,0, 20]          
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
