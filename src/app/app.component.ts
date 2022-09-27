import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'scientific-calculator-angular';
  formulaName: string = '';
  formulaExpr: string = '';

  displayFormulaNameExpr(formulaNameExpr: string[]) {
    this.formulaName = formulaNameExpr[0];
    this.formulaExpr = formulaNameExpr[1];
  }
}
