import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ExpenseService } from 'src/app/services/expense.service';

import { Injectable } from '@angular/core';
import { ConverterService } from 'src/app/services/converter.service';




@Injectable({
    providedIn: 'root'
})
export class FormService {

    public expenseForm: FormGroup;



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
                private converterService: ConverterService) { }


    initForm(): void {
        this.expenseForm = this.formBuilder.group({
            id: [''],
            purchasedOn: ['', Validators.required],
            nature: ['', [Validators.required, Validators.maxLength(120)]],
            originalAmount: ['', Validators.required],
            currency: ['EUR', Validators.required],
            comment: ['', [Validators.maxLength(600)]]
        });
        this.converterService.getRatesFromExternalApi();
    }

    submitExpenseForm(): void {
        // get form value and send it to expense service
        const formValue = this.expenseForm.value;

        // Check if id exist if yes update if not addExpense
        if (formValue.id) {
            this.expenseService.updateExpense(formValue);

        }
        else {
            this.expenseService.addExpense(formValue);
        }
    }

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
