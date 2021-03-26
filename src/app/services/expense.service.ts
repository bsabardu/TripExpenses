import { Expense } from 'src/app/models/Expense.model';
import { Subject } from 'rxjs/Subject'; 
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  
  //Create a subject of expense to be observed by expense list component
  expenseSubject = new Subject<Expense[]>();
  
  private expenses: Expense[] = [
  ];

  //Use this function when you need to 
  emitExpenses() {
    this.expenseSubject.next(this.expenses.slice());
  }

  constructor(private httpClient: HttpClient) { 
  
  }
    getExpensesFromServer() {
      this.httpClient
      //API BASE URL are stored in env file
        .get<any[]>(`${environment.API_BASE_URL}/api/expenseItems`)
        .subscribe(
          (response) => {
            console.log(response);
            this.expenses = response;
            this.emitExpenses();
          },
          (error) => {
            console.log('Erreur de chargement', error);
          }
        );
    }
}
