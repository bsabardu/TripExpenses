import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Expense } from 'src/app/models/Expense.model';
import { ExpenseService } from 'src/app/services/expense.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { DialogComponent } from '../dialog/dialog.component';
import { DialogService } from 'src/app/services/dialog.service';


@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit, OnDestroy {

  expenses: Expense[];
  expenseSubscription: Subscription;

  columnsToDisplay = ['purchasedOn','nature','originalAmount', 'convertedAmount', 'comment', 'createdAt','lastModifiedAt', 'actions' ];

  constructor(private expenseService: ExpenseService,
              private dialogService: DialogService,
              private dialog: MatDialog) { }

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

  //Method to delete an expense using its uid
  //This method works with a dedicated Dialog service
  onDelete(expenseId) {
    this.dialogService.openDialog(
      "Confirm Deletion",
      "Please confirm the expense deletion. It cannot be recovered",
      () => {this.expenseService.deleteExpense(expenseId)},
      "Confirm",
      true
    );
  }
}
