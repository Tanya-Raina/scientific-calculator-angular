import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { angularMath } from 'angular-ts-math/dist/angular-ts-math/angular-ts-math';
import * as math from "mathjs";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  @Output() formulaNameExpr = new EventEmitter<string[]>();

  formulaName: string = '';

  currentValue: string  = '';

  isDecimalUsed: boolean = false;

  isExecutable: boolean = false;

  parameterList: string[] = [
    'Time',
    'Speed',
    'Product_Count',
    'Defective_Products',
    'Count_In',
    'Count_Out'
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // Previous Character Checking Function
  previousChar() {
    return this.currentValue[this.currentValue.length - 1];
  }

  getNumber(num: string): void {
    if(this.currentValue.length == 0) {
      this.currentValue += num;
      return ;
    }
    const regex = new RegExp(/[A-Za-z\)\]]/);
    if(!regex.test(this.previousChar())) {
      if (num === 'π') {
        this.currentValue += String(angularMath.getPi().toFixed(3));
      } else if (num === 'e') {
        this.currentValue += String(angularMath.getE().toFixed(3));
      } else {
        this.currentValue += num;
      }
    } else {
      // this.notifyService.showWarning("Missing Operator (+,-,*,/)");
      alert("Missing Operator (+,-,*,/)");
    }
  }

  getDecimal(): void {
    const regex = new RegExp(/[0-9]/);
    if(this.currentValue.length == 0 || !regex.test(this.previousChar())) {
      // this.notifyService.showWarning("Add a number[0-9] before using decimal!");
      alert("Add a number[0-9] before using decimal!");
      return;
    }
    if(!this.isDecimalUsed) {
      this.isDecimalUsed = true;
      this.currentValue += '.';
    } else {
      // this.notifyService.showError("Invalid Expression!");
      alert("Invalid Expression!");
    }
  }

  getOperator(op: string): void {
    if(this.currentValue.length == 0) {
      // this.notifyService.showWarning("Add variables and functions to perform operation");
      alert("Add variables and functions to perform operation");
      return;
    }
    const regex = new RegExp(/[,\+\-\*\/%]/);
    if(!regex.test(this.previousChar())) {
      this.currentValue += op;
      this.isDecimalUsed = false;
    } else {
      this.currentValue = this.currentValue.slice(0, this.currentValue.length-1);
      this.currentValue += op;
    }
  }

  getParameter(param: string): void {
    if(this.currentValue.length === 0){
      this.currentValue += param;
      return;
    }
    const regex = new RegExp(/[A-Za-z0-9\]\)]/);
    if(!regex.test(this.previousChar())){
      this.currentValue += param;
    }
    else{
      // this.notifyService.showWarning("Missing arithmetic operator or parenthesis!");
      alert("Missing arithmetic operator or parenthesis!");
    }
  }

  getParenthesis(sym: string): void {
    if(sym === '(' || sym === '[' || sym === '{') {
      if(this.currentValue.length === 0) {
        this.currentValue += sym;
        return;
      }
      const regex = new RegExp(/[A-Za-z0-9\)\]]/);
      if(regex.test(this.previousChar())) {
        // this.notifyService.showWarning("Missing arithmetic operator");
        alert("Missing arithmetic operator");
        return;
      }
    }
    this.currentValue += sym;
  }

  getFunction(func: string): void {
    if (this.currentValue.length === 0) {
      this.currentValue += func;
      return;
    }
    const regex = new RegExp(/[A-Za-z0-9\)\]]/);
    if (!regex.test (this.previousChar()) ) {
      this.currentValue += func;
    } else {
      // this.notifyService.showWarning("Missing arithmetic operator!");
      alert("Missing arithmetic operator!");
    }
  }

  allClear(): void {
    this.currentValue = '';
    this.isExecutable = false;
  }

  clearOne() {
    this.currentValue = this.currentValue.slice(0, -1);
  }

  parseExpression(currentValue: string): void {
    // const expr = '((SumOf(B,A) + (AvgOf(C) * 10))/SumOf(D)) * 100';

    console.log(currentValue);

    if (currentValue === '') {
      alert('Error: Empty Expression');
      return;
    }

    try {
      const node2 = math.parse(currentValue);
      console.log(node2);
      if(node2.isNode) {
        alert('Formula is executable.');

        this.isExecutable = true;
      }
    } catch (e) {
      this.isExecutable = false;
      this.reset();
      alert('Formula is not executable.');
    }
  }

  saveExpression() {
    if(this.formulaName === '') {
      alert('Error: Empty Name');
      return;
    }
    console.log(`${this.formulaName}: ${this.currentValue}`);

    this.formulaNameExpr.emit([this.formulaName, this.currentValue]);

    this.reset();
  }


  getFormulaName(event: any) {
    this.formulaName = event.target.value;
  }

  reset() {
    this.currentValue = '';
    this.isExecutable = false;
    this.formulaName = '';
  }

}
