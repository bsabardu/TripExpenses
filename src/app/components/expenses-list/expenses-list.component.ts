// -- IMPORTS -- //

  // NG Modules
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

  // Custom services
import { ExpenseService } from 'src/app/services/expense.service';
import { FormService } from 'src/app/services/form.service';
import { DialogService } from 'src/app/services/dialog.service';
import { DrawerService } from 'src/app/services/drawer.service';

  // Expense model
import { Expense } from 'src/app/models/Expense.model';

// ----

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit, OnDestroy {

  expenses: Expense[];
  expenseSubscription: Subscription;

  // Values need by pagninator component
  pageEvent: PageEvent;
  datasource: null;
  pageIndex: number;
  pageSize: number;
  length: number;

  // Columns to display
  columnsToDisplay = ['purchasedOn', 'nature', 'originalAmount', 'convertedAmount', 'comment', 'actions' ];

  constructor(private expenseService: ExpenseService,
              private dialogService: DialogService,
              private drawerService: DrawerService,
              private formService: FormService,
   ) { }


  /**
   * @desc Method on component initialisation :
   * Update expenses length(see below), get expenses from server and subscribe to subject
   */
   ngOnInit(): void {
    this.updateExpensesLength();
    this.expenseService.getExpensesFromServer();
    this.expenseSubscription = this.expenseService.expenseSubject.subscribe(
      (expenses: Expense[]) => {
        this.expenses = expenses;
      }
    );
  }


  /**
   * @desc Method called when clicking on page change in the paginator module.
   * It sends a page event to expense service that will use it to update dates accordingly
   */
  getServerData(event?: PageEvent): void {
    this.expenseService.getExpensesFromServer(event);
  }


  /**
   * @desc Method on component destuction : unsubscribe
   */
    ngOnDestroy(): void {
    this.expenseSubscription.unsubscribe();
  }


  /**
   * @desc Update the total number of expenses
   * throught the total expenses setter in Expense Service
   * @async
   */
  async updateExpensesLength(): Promise<void> {
    await this.expenseService.setTotalExpensesOnDB();
    this.length = this.expenseService.getTotalExpensesOnDB();
  }


 // ACTIONS ON EXPENSES ROW //

  /**
   * @desc Method triggered when clicking on an expense deletion.
   * It triggers a confirmation dialog using the dialog service
   * @param expenseId Id of the selected expense given by the component
   */
  onDelete(expenseId): void {
    this.dialogService.openDialog(
      'Confirm Deletion',
      'Please confirm the expense deletion. It cannot be recovered',
      () => {this.expenseService.deleteExpense(expenseId); },
      'Delete',
      true
    );
  }

  /**
   * @desc Method triggered when clicking on edit an expense.
   * It opens the from drawer, set the current expense to the one selected and fill the form.
   * @param expenseId Id of the selected expense given by the component
   */
  onEdit(expenseId): void {
    this.drawerService.open();
    this.expenseService.setCurrentExpense(expenseId);
    this.formService.fillForm();
  }

}
