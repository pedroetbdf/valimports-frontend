import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {

  expense: Expense = new Expense();

  constructor(private _expenseService: ExpenseService,
    private _router: Router,
    private _activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const isIdPresent = this._activateRoute.snapshot.paramMap.has('id');
    if (isIdPresent) {
      const id = +this._activateRoute.snapshot.paramMap.get('id');
      this._expenseService.getExpense(id).subscribe(
        data => this.expense = data
      )
    }
  }

  saveExpense() {
    this._expenseService.saveExpense(this.expense).subscribe(
      data => {
        console.log('response', data);
        this._router.navigateByUrl("/expenses");
      }
    )
  }

  deleteExpense(id: number) {
this._expenseService.deleteExpense(id).subscribe(
  data => {
    console.log('deleted response', data);
    this._router.navigateByUrl('/expenses');
  }
)
  }
}
