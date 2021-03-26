import { Expense } from 'src/app/models/Expense.model';
import { Subject } from 'rxjs/Subject'; 

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  private expenses: Expense[] = [
    {
      id: "727212a0-4d73-4615-bd23-d7df6f562491",
      purchasedOn: "2018-12-04",
      nature: "Restaurant",
      originalAmount: {
        amount: 17,
        currency: "GBP"
      },
      convertedAmount: {
        amount: 19.09,
        currency: "EUR"
      },
      comment: "Mission de 5 jours à Londres",
      createdAt: "2018-12-05T14:00:34.435154Z",
      lastModifiedAt: "2018-12-05T14:00:34.435154Z"
    }
  ];

  expenseSubject = new Subject<Expense[]>();

  emitExpenses() {
    this.expenseSubject.next(this.expenses.slice());
  }

  constructor() { }
}
