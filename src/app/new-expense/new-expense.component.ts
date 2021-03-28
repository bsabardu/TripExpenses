import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DrawerService } from 'src/app/services/drawer.service';
import { FormService } from 'src/app/services/form.service';


// Import converter service
import { ConverterService } from 'src/app/services/converter.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.scss']
})

export class NewExpenseComponent implements OnInit {

  //Data used in component
  expenseForm: FormGroup;
  currencies: object[];
  natureErrorMsg: string = '';
  commentErrorMsg: string = '';

  constructor(
    private drawerService: DrawerService,
    private formService: FormService,
    ) { }

    ngOnInit(): void {
      this.formService.initForm();
      this.expenseForm = this.formService.expenseForm;
      this.currencies = this.formService.currencies;

      this.expenseForm.statusChanges.subscribe(() => this.setErrors());
    }


    onSubmitForm(): void {
      this.formService.submitExpenseForm();
      // this.expenseForm.clearValidators();
      // this.expenseForm.updateValueAndValidity();
      this.expenseForm.reset();
    }

    onCancel(): void {
      this.drawerService.close();
      this.expenseForm.reset();
    }


  // FORM VALIATION //
    setErrors() {
      //Handle multiple error for NATURE field
      if (this.expenseForm.controls['nature'].hasError('maxlength')) {
        console.log('Error Chars');
        this.natureErrorMsg = "Nature should be max 120 characters";
      }
      else if (this.expenseForm.controls['nature'].hasError('required')) {
        console.log('Error Required');
        this.natureErrorMsg = "Nature of the expense is required";
      }

      //Handle multple error for COMMENT field
      if (this.expenseForm.controls['comment'].hasError('maxlength')) {
        console.log('Error Chars');
        this.commentErrorMsg = "Comment should be max 600 characters";
      }
      else if (this.expenseForm.controls['comment'].hasError('required')) {
        console.log('Error Required');
        this.commentErrorMsg = "Comment is required";
      }      
    };

    

}
