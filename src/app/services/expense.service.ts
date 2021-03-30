// tslint:disable: no-console

// -- IMPORTS -- //

  // NG Modules
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

  // Custom Services
import { SnackBarService } from 'src/app/services/snackbar.service';
import { ConverterService } from 'src/app/services/converter.service';

  // .ENV
import { environment } from 'src/environments/environment';

  // Import Expense Model
import { Expense } from 'src/app/models/Expense.model';
import { CurrencyPipe } from '@angular/common';

// ----

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  // Create a subject of expense to be observed by expenses-list component
  expenseSubject = new Subject<Expense[]>();

  // Private array of expenses
  private expenses: Expense[] = [
  ];

  // Selected expense, usefull to pre-fill the form
  private currentExpense: any;

  // Selected expense, usefull to pre-fill the form
  private totalExpensesOnDB: number;

  constructor(private httpClient: HttpClient,
              private converterService: ConverterService,
              private snackBarService: SnackBarService) {

  }


  emitExpenses(): void {
    this.expenseSubject.next(this.expenses.slice());
  }


  /**
   * @desc Method handling expense creation.
   * Use the enrich expense method to enrich data before sending it to server
   * Then send it to server and display a snackbar
   * @param expense - formValues coming from form service
   */
  addExpense(expense): void {
    const enrichedExpense = this.enrichExpenseData(expense);
    this.saveExpensesToServer(enrichedExpense);
    this.snackBarService.openSnackBar('Expenses has been created !');
  }


  /**
   * @desc Method handling expense edition.
   * Use the enrich expense method to enrich data before sending it to server
   * Then send it to server and display a snackbar
   * @param expense - formValues coming from form service
   */
  updateExpense(expense): void {
    const enrichedExpense = this.enrichExpenseData(expense);
    this.updateExpensesToServer(enrichedExpense);
    this.snackBarService.openSnackBar('Expenses has been updated !');
  }

  /**
   * @desc Method handling expense deleting.
   * Delete on server using id and display a snackbar
   * @param id - id of the expense to delete
   */
  deleteExpense(id: string): void {
    this.deleteExpenseOnServer(id);
    this.snackBarService.openSnackBar('Expenses has been deleted !');
  }

  /**
   * @desc Method used to enrich expense data coming from From service before sending it to servers
   * We use the converter service to get the converted amount.
   * @param expense - formValues coming from form service
   * @returns - an enriched Expense object
   */
  enrichExpenseData(expense): object {
    return {
      ...expense,
      originalAmount: {
        amount: expense.originalAmount,
        currency: expense.currency
      },
      convertedAmount: {
        amount: (expense.originalAmount / this.converterService.getRatesOfCurrency(expense.currency)),
        currency: expense.currency
      },
    };
  }

  // CURRENT EXPENSE SETTER & GETTER //

  setCurrentExpense(expenseId): void {
    const currentExpense = this.expenses.find((expense) => (
      expense.id === expenseId
    ));
    this.currentExpense = currentExpense;
  }

  getCurrentExpense(): Expense {
    return this.currentExpense;
  }

  // NUMBER OF EXPENSES IN DB SETTER & GETTER //

  /**
   * @desc Method calling the DB to get the number of stored expenses
   * @async
   */
  async setTotalExpensesOnDB(): Promise<void>{
    const promise = this.httpClient.get<any[]>(`${environment.API_BASE_URL}/api/expenseItems`).toPromise();
    const response = await promise;
    this.totalExpensesOnDB = response.length;
  }

  getTotalExpensesOnDB(): number {
    return this.totalExpensesOnDB;
  }



  // EXPENSES API CRUD METHODS

  /** READ
   * @desc Get expenses from server. Expenses can be filterd by a Page Event (for pagination)
   * API URL is built dynamically with base_url stored in env file and params
   * @param event - PageEvent sent on change page event of paginator component
   */
  getExpensesFromServer(event?: PageEvent): void {

    let apiQuery = null;
    if (event){
      const {pageIndex, pageSize, length} = event;
      const lastPage = (pageIndex + 1) * pageSize > length;

      // If last page the limit of the query is the last expenses to get, else its pageSize
      const limit = lastPage ? length - pageIndex * pageSize : pageSize;

      apiQuery = `?_page=${pageIndex + 1}&_limit=${limit}`;
    }
    // If do not have event we set default data for API url
    else {
      apiQuery = `?_page=${1}&_limit=${10}`;
    }

    this.httpClient
      .get<any[]>(`${environment.API_BASE_URL}/api/expenseItems${apiQuery}`)
      .subscribe(
        (response) => {
          this.expenses = response;
          this.emitExpenses();
        },
        (error) => {
          this.snackBarService.openSnackBar('An error happened when getting expenses from the server, please retry');
          // This should be logged somewhere but for this project i simply added a console trace
          console.trace(error);
        }
      );
  }

  /** READ ONE
   * @desc Same method as get all expenses but with the expense Id specified.
   * @param expenseId - Id of the expense we want to get
   */
  getOneExpenseFromServer(expenseId): void {
    this.httpClient
      .get<any[]>(`${environment.API_BASE_URL}/api/expenseItems/${expenseId}`)
      .subscribe(
        (response) => {
          this.currentExpense = response;
        },
        (error) => {
          this.snackBarService.openSnackBar('An error happened when getting expense from the server, please retry');
          console.trace(error);
        }
      );
  }

  /** CREATE
   * @desc Create an expense on the server. After creation get new expenses and update table
   * @param expense - Enriched expense send as payload for creation
   */
  saveExpensesToServer(expense): void {
    this.httpClient
      .post(`${environment.API_BASE_URL}/api/expenseItems`, expense)
      .subscribe(
        () => {
          this.getExpensesFromServer();
        },
        (error) => {
          this.snackBarService.openSnackBar('An error happened during expense edition, please retry');
          console.trace(error);
        }
      );
  }


  /** UPDATE
   * @desc Update an expense on the server using its id. After creation get new expenses and update table
   * @param expense - Enriched expense send as payload for update
   */
  updateExpensesToServer(expense): void {
    this.httpClient
      .put(`${environment.API_BASE_URL}/api/expenseItems/${expense.id}`, expense)
      .subscribe(
        () => {
          this.getExpensesFromServer();
        },
        (error) => {
          this.snackBarService.openSnackBar('An error happened during expense creation, please retry');
          console.trace(error);
        }
      );
  }

  /** DELETE
   * @desc Delete an expense on the server using its id. After deletion get new expenses and update table
   * @param expense - Enriched expense send as payload for update
   */
  deleteExpenseOnServer(expenseId): void {
    this.httpClient
      .delete(`${environment.API_BASE_URL}/api/expenseItems/${expenseId}`)
      .subscribe(
        () => {
          this.getExpensesFromServer();
        },
        (error) => {
          this.snackBarService.openSnackBar('An error happened during expense deletion, please retry');
          console.trace(error);
        }
      );
  }

}
