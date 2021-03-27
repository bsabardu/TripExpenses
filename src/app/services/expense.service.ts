// Import Expense Model
import { Expense } from 'src/app/models/Expense.model';

// Import env vars
import { environment } from 'src/environments/environment';

// Import Modules
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Import others services
import { SnackBarService } from 'src/app/services/snackbar.service';
import { ConverterService } from 'src/app/services/converter.service';



@Injectable({
  providedIn: 'root'
})
export class ExpenseService {


  // Create a subject of expense to be observed by expense list component
  expenseSubject = new Subject<Expense[]>();

  private expenses: Expense[] = [
  ];

  private currentExpense: any;

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

  deleteExpense(id): void {
    this.deleteExpenseOnServer(id);
    this.getExpensesFromServer();
    this.snackBarService.openSnackBar('Expenses has been deleted !');

  }

  // Method to transform data get by user before sending it to server
  // We use the converterService to convert orginal amount before sending it to DB
  enrichExpenseData(expense): object {
    const { purchasedOn, nature, comment, originalAmount, currency } = expense;
    const enrichExpense = {
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
  };

  // Current Expense Getter
  getExpenseData(): Expense {
    return this.currentExpense;
  }

  // ALL CRUD METHOD

  // Read
  getExpensesFromServer(): void {
    this.httpClient
      // API BASE URL are stored in env file
      .get<any[]>(`${environment.API_BASE_URL}/api/expenseItems`)
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
          console.log('Saved');
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
      )
  }

}
