import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Expense } from 'src/app/models/Expense.model';
import { ExpenseService } from 'src/app/services/expense.service';
import { DialogService } from 'src/app/services/dialog.service';
import { DrawerService } from 'src/app/services/drawer.service';


@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit, OnDestroy {

  expenses: Expense[];
  expenseSubscription: Subscription;

  columnsToDisplay = ['purchasedOn', 'nature', 'originalAmount', 'convertedAmount', 'comment', 'actions' ];

  constructor(private expenseService: ExpenseService,
              private dialogService: DialogService,
              private drawerService: DrawerService,
   ) { }

  // On init we subscribe to expenseService to get any update on expenses then adapt the local object
  ngOnInit(): void {
    this.expenseService.getExpensesFromServer();
    this.expenseSubscription = this.expenseService.expenseSubject.subscribe(
      (expenses: Expense[]) => {
        this.expenses = expenses;
      }
    );
    this.expenseService.emitExpenses();
  }

  // Destroy subscrition as the component is destroy to avoid unlimited subscription
  ngOnDestroy(): void {
    this.expenseSubscription.unsubscribe();
  }

  // Method to delete an expense using its uid
  // This method works with a dedicated Dialog service
  onDelete(expenseId): void {
    this.dialogService.openDialog(
      'Confirm Deletion',
      'Please confirm the expense deletion. It cannot be recovered',
      () => {this.expenseService.deleteExpense(expenseId);},
      'Confirm',
      true
    );
  }

  onEdit(expenseId): void {
    this.drawerService.open();
  }
}
