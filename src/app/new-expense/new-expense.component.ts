import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from 'src/app/services/expense.service';
import { DrawerService } from 'src/app/services/drawer.service';


// Import converter service
import { ConverterService } from 'src/app/services/converter.service';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.scss']
})
export class NewExpenseComponent implements OnInit {

  public expenseForm: FormGroup;

  // Here choose the default value of the currency selector
  selected = 'EUR';

  // Currencies array, (handle it in a dedicated service seams overkilled here)
  currencies = [
    {
      tag: 'EUR',
      name: 'Euro'
    },
    {
      tag: 'GBP',
      name: 'Pound sterling'
    },
    {
      tag: 'USD',
      name: 'US Dollar'
    },
    {
      tag: 'CHF',
      name: 'Swiss Franc'
    }
  ];

  constructor(private formBuilder: FormBuilder,
              private expenseService: ExpenseService,
              private drawerService: DrawerService,
              private converterService: ConverterService) { }

  ngOnInit(): void {
    this.initForm();
    const currentExpense = this.expenseService.getExpenseData();

    if (currentExpense){
      this.expenseForm.patchValue({
        purchasedOn: currentExpense.purchasedOn,
        nature: currentExpense.nature,
        originalAmount: currentExpense.originalAmount.amount,
        currency: currentExpense.originalAmount.currency,
        comment: currentExpense.comment
      });

    }

  }


  initForm(): void {
    this.expenseForm = this.formBuilder.group({
      purchasedOn: ['', [Validators.required , Validators.maxLength(120)]],
      nature: ['', Validators.required],
      originalAmount: ['', Validators.required],
      currency: ['EUR', Validators.required],
      comment: ['', [Validators.required, Validators.maxLength(600)]]
    });
    this.converterService.getRatesFromExternalApi();
  }

  onSubmitForm(): void {
    // get form value and send it to expense service
    const formValue = this.expenseForm.value;
    this.converterService.getRatesOfCurrency(formValue.currency);
    this.expenseService.addExpense(formValue);
  }

  onCancel(): void {
    this.drawerService.close();
  }

}
