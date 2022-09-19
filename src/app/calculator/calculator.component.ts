import { Component, OnInit } from '@angular/core';
import { angularMath } from 'angular-ts-math/dist/angular-ts-math/angular-ts-math';
import * as math from "mathjs";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  currentValue: string  = '';

  isExecutable: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  getNumber(v: string): void {
    if (v === 'π') {
      this.currentValue += String(angularMath.getPi());
    } else if (v === 'e') {
      this.currentValue += String(angularMath.getE());
    } else {
      this.currentValue === '0' ? this.currentValue = v : this.currentValue += v;
    }
  }

  getDecimal(): void {
    if (!this.currentValue.includes('.')) {
      this.currentValue += '.';
    }
  }

  getOperation(op: string): void {
    this.currentValue += op;
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
      console.log('Error: Empty Expression');
      return;
    }

    try {
      const node2 = math.parse(currentValue);
      if(node2.isNode) {
        console.log('It is executable.');

        this.isExecutable = true;
      }
    } catch (e) {
      console.log('It is NOT executable.');
    }
  }

  saveExpression() {
    alert(`Saved: ${this.currentValue}`);
  }
}
