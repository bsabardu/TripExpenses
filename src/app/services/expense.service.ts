import { Expense } from 'src/app/models/Expense.model';
import { Subject } from 'rxjs/Subject'; 
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// Import converter service
import { ConverterService } from 'src/app/services/converter.service';


import { Injectable } from '@angular/core';

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
    let enrichedExpense: Expense = this.enrichExpenseData(expense);
    this.expenses.push(enrichedExpense);
    this.saveExpensesToServer(enrichedExpense);
    this.emitExpenses();
  }


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

    //Method to transform data get by user before sending it to server
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
}
