// Import Expense Model
import { Expense } from 'src/app/models/Expense.model';

// Import env vars
import { environment } from 'src/environments/environment';

// Import Modules
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

// Import others services
import { SnackBarService } from 'src/app/services/snackbar.service';
import { ConverterService } from 'src/app/services/converter.service';
import { Observable } from 'rxjs';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';



@Injectable({
  providedIn: 'root'
})
export class ExpenseService {


  // Create a subject of expense to be observed by expense list component
  expenseSubject = new Subject<Expense[]>();

  private expenses: Expense[] = [
  ];

  private currentExpense: any;

  private totalExpensesOnDB: number;

  constructor(private httpClient: HttpClient,
              private converterService: ConverterService,
              private snackBarService: SnackBarService) {

  }

  emitExpenses(): void {
    this.expenseSubject.next(this.expenses.slice());
  }

  addExpense(expense): void {
    // First we enrich the expense
    const enrichedExpense = this.enrichExpenseData(expense);
    // Then we send to serveur
    this.saveExpensesToServer(enrichedExpense);
    // Finally we refresh view with updated expenses
    this.getExpensesFromServer();
    this.emitExpenses();
    this.snackBarService.openSnackBar('Expenses has been created !');
  }

  updateExpense(expense): void {
    // First we enrich the expense
    const enrichedExpense = this.enrichExpenseData(expense);
    // Then we send to serveur
    this.updateExpensesToServer(enrichedExpense);
    // Finally we refresh view with updated expenses
    this.getExpensesFromServer();
    this.emitExpenses();
    this.snackBarService.openSnackBar('Expenses has been updated !');
  }


  deleteExpense(id): void {
    this.deleteExpenseOnServer(id);
    this.getExpensesFromServer();
    this.snackBarService.openSnackBar('Expenses has been deleted !');

  }

  // Method to transform data get by user before sending it to server
  // We use the converterService to convert orginal amount before sending it to DB
  enrichExpenseData(expense): object {
    const { id, purchasedOn, nature, comment, originalAmount, currency } = expense;
    const enrichExpense = {
      id,
      purchasedOn,
      nature,
      comment,
      originalAmount: {
        amount: originalAmount,
        currency
      },
      convertedAmount: {
        amount: (originalAmount / this.converterService.getRatesOfCurrency(currency)),
        currency: 'EUR'
      },
    };
    return enrichExpense;
  }

  // Current Expense Setter
  setCurrentExpense(expenseId): void {
    const currentExpense = this.expenses.find((expense) => (
      expense.id === expenseId
    ));
    this.currentExpense = currentExpense;
  }

  // Current Expense Getter
  getCurrentExpense(): Expense {
    return this.currentExpense;
  }

  // Number of expenses in DB Setter
  async setTotalExpensesOnDB(): Promise<void>{
    const promise = this.httpClient.get<any[]>(`${environment.API_BASE_URL}/api/expenseItems`).toPromise();
    const response = await promise;
    this.totalExpensesOnDB = response.length;
  }
  // Number of expenses in DB getter
  getTotalExpensesOnDB(): number {
    return this.totalExpensesOnDB;
  }

  // ALL CRUD METHOD

  // Read -- Read method use pagniation
  getExpensesFromServer(event?: PageEvent): void {

    // PAGINATION API Query Constructor -- Query is different if we have an PageChange event or not (init)
    // If event we get page data from event and construct the query
    // If last page the limit of the query is the last expenses to get, else its pageSize

    let apiQuery = null;
    if (event){
      const {pageIndex, pageSize, length} = event;
      const lastPage = (pageIndex + 1) * pageSize > length;
      const limit = lastPage ? length - pageIndex * pageSize : pageSize;
      apiQuery = `?_page=${pageIndex}&_limit=${limit}`
    }
    else {
      apiQuery = `?_page=${0}&_limit=${10}`;
    }

    this.httpClient
      // API BASE URL are stored in env file
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

  // Read One
  getOneExpenseFromServer(expenseId): void {
    this.httpClient
      // API BASE URL are stored in env file
      .get<any[]>(`${environment.API_BASE_URL}/api/expenseItems/${expenseId}`)
      .subscribe(
        (response) => {
          this.currentExpense = response;
          this.emitExpenses();
        },
        (error) => {
          this.snackBarService.openSnackBar('An error happened when getting expense from the server, please retry');
          console.trace(error);
        }
      );
  }

  // Create
  saveExpensesToServer(expense): void {
    this.httpClient
      .post(`${environment.API_BASE_URL}/api/expenseItems`, expense)
      .subscribe(
        () => {
        },
        (error) => {
          this.snackBarService.openSnackBar('An error happened during expense edition, please retry');
          console.trace(error);
        }
      );
  }

  // Update
  updateExpensesToServer(expense): void {
    this.httpClient
      .put(`${environment.API_BASE_URL}/api/expenseItems/${expense.id}`, expense)
      .subscribe(
        () => {
        },
        (error) => {
          this.snackBarService.openSnackBar('An error happened during expense creation, please retry');
          console.trace(error);
        }
      );
  }

  // Delete
  deleteExpenseOnServer(expenseId): void {
    this.httpClient
      .delete(`${environment.API_BASE_URL}/api/expenseItems/${expenseId}`)
      .subscribe(
        () => {
          console.log('Deleted');
        },
        (error) => {
          this.snackBarService.openSnackBar('An error happened during expense deletion, please retry');
          console.trace(error);
        }
      );
  }

}
