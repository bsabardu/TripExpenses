import { Expense } from 'src/app/models/Expense.model';
import { Subject } from 'rxjs/Subject'; 
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// Import converter service
import { ConverterService } from 'src/app/services/converter.service';


import { Injectable } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  
  //Create a subject of expense to be observed by expense list component
  expenseSubject = new Subject<Expense[]>();
  
  private expenses: Expense[] = [
  ];

  constructor(private httpClient: HttpClient,
              private converterService: ConverterService) { 
  
  }
  
  emitExpenses() {
    this.expenseSubject.next(this.expenses.slice());
  }


  addExpense(expense) {
    //First we enriche the expense
    let enrichedExpense = this.enrichExpenseData(expense);
    //Then we send to serveur
    this.saveExpensesToServer(enrichedExpense);
    //Finally we refresh view with updated expenses
    this.getExpensesFromServer();
    this.emitExpenses();
  }

  deleteExpense(id) {
    this.deleteExpenseOnServer(id);
    this.getExpensesFromServer();
  }

  //Method to transform data get by user before sending it to server
    //We use the converterService to convert orginal amount before sending it to DB
  enrichExpenseData(expense) {
    const { purchasedOn, nature, comment, originalAmount, currency } = expense;
    let enrichExpense =  {
      purchasedOn,
      nature,
      comment,
      originalAmount: {
        amount: originalAmount,
        currency: currency
      },
      convertedAmount: {
        amount: (originalAmount / this.converterService.getRatesOfCurrency(currency)),
        currency: 'EUR'
      },
    }
    return enrichExpense
  }


  // ALL CRUD METHOD

    // Read
    getExpensesFromServer() {
      this.httpClient
      //API BASE URL are stored in env file
        .get<any[]>(`${environment.API_BASE_URL}/api/expenseItems`)
        .subscribe(
          (response) => {
            this.expenses = response;
            this.emitExpenses();
          },
          (error) => {
            console.log('Erreur de chargement', error);
          }
        );
    }
    
    // Create
    saveExpensesToServer(expense) {
      this.httpClient
        .post(`${environment.API_BASE_URL}/api/expenseItems`, expense)
        .subscribe(
          () => {
            console.log('Saved')
          },
          (error) => {
            console.log('Error', error)
          }
        )
    }

    // Delete
    deleteExpenseOnServer(expenseId) {
      this.httpClient
      .delete(`${environment.API_BASE_URL}/api/expenseItems/${expenseId}`)
      .subscribe(
        () => {
          console.log('Deleted')
        },
        (error) => {
          console.log('Error', error)
        }
      ) 
    }

}
