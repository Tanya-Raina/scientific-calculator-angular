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

  getNumber(v: string): void {
    if (v === 'π') {
      this.currentValue += String(angularMath.getPi().toFixed(3));
    } else if (v === 'e') {
      this.currentValue += String(angularMath.getE().toFixed(3));
    } else {
      this.currentValue += v;
    }
  }

  getDecimal(): void {
    if (!this.currentValue.includes('.')) {
      this.currentValue += '.';
    }
  }

  getOperation(op: string): void {
    this.currentValue += `${op} `;
  }

  getParameter(param: string): void {
    this.currentValue += `${param} `;
  }

  getFunction(func: string): void {
    this.currentValue += `${func} `;
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
        console.log('It is executable.');

        this.isExecutable = true;
      }
    } catch (e) {
      console.log('It is NOT executable.');
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
