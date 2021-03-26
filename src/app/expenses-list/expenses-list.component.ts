import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Expense } from 'src/app/models/Expense.model';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit, OnDestroy {

  expenses: Expense[];
  expenseSubscription: Subscription;

  columnsToDisplay = ['purchasedOn','nature','originalAmount', 'comment', 'createdAt','lastModifiedAt' ];

  constructor(private expenseService: ExpenseService) { }

  //On init we subscribe to expenseService to get any update on expenses then adapt the local object
  ngOnInit(): void {
    this.expenseService.getExpensesFromServer();
    this.expenseSubscription = this.expenseService.expenseSubject.subscribe(
      (expenses: Expense[]) => {
        this.expenses = expenses;
      }
    );
    this.expenseService.emitExpenses();
  }

  //Destroy subscrition as the component is destroy to avoid unlimited subscription
  ngOnDestroy() {
    this.expenseSubscription.unsubscribe();
  }

}
