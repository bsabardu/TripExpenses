// -- IMPORTS -- //

  // NG Modules
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

  // Custom Services
import { ConverterService } from 'src/app/services/converter.service';
import { ExpenseService } from 'src/app/services/expense.service';

  // Import currencies enum
import currencies from 'src/app/core/enums/currencies';

// ----

@Injectable({
providedIn: 'root'
})

export class FormService {

public expenseForm: FormGroup;

// Currencies data for form select, coming from enum
currencies = currencies;

constructor(private formBuilder: FormBuilder,
            private expenseService: ExpenseService,
            private converterService: ConverterService) { }

  /**
   * @desc Method exectuted on form initialisation
   * it creates a form from FromBuilder NG class, creates fields and set validators
   * Also it generate a first array of currencies rates
   */
initForm(): void {
  this.converterService.getRatesFromExternalApi();
  this.expenseForm = this.formBuilder.group({
    id: [''],
    purchasedOn: ['', Validators.required],
    nature: ['', [Validators.required, Validators.maxLength(120)]],
    originalAmount: ['', Validators.required],
    currency: ['EUR', Validators.required],
    comment: ['', [Validators.maxLength(600)]]
  });
}

  /**
   * @desc Get last currency rates from API, get data from form. If it finds an id
   * it's because the expense already exists, so trigger an update. Else create the expense
   */
submitExpenseForm(): void {
  this.converterService.getRatesFromExternalApi();
  const formValue = this.expenseForm.value;
  if (formValue.id) {
    this.expenseService.updateExpense(formValue);
  }
  else {
    this.expenseService.addExpense(formValue);
  }
}

  /**
   * @desc Get the selected expense from the expense service then Fill form.
   * Mostly used when user clicks on "edit" in the expense list
   */
fillForm(): void {
  const formData = this.expenseService.getCurrentExpense();
  this.expenseForm.setValue({
    id: formData.id,
    purchasedOn: formData.purchasedOn,
    nature: formData.nature,
    originalAmount: formData.originalAmount.amount,
    currency: formData.originalAmount.currency,
    comment: formData.comment,
  });
}


}
