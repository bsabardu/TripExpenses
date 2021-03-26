import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Expense } from 'src/app/models/Expense.model';
import { ExpenseService } from 'src/app/services/expense.service';
import { SideNavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.scss']
})
export class NewExpenseComponent implements OnInit {

  expenseForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private expenseService: ExpenseService,
              private sidenavService: SideNavService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.expenseForm = this.formBuilder.group({
      purchasedOn: ['', Validators.required],
      nature: ['', Validators.required],
      originalAmount: [0, [Validators.required, Validators.email]],
      currency: ['EUR', Validators.required],
      comment: ['', Validators.required]
    });
  }

  onSubmitForm() {
    const formValue = this.expenseForm.value;
    const newExpense = new Expense(
      formValue['purchasedOn'],
      formValue['nature'],
      formValue['originalAmount'],
      formValue['currency'],
      formValue['comment'],
    );
    this.expenseService.addExpense(newExpense);
  }

  onCancel() {
    this.sidenavService.close();
  }

}
