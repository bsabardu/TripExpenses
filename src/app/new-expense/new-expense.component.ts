import { Component, OnInit} from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { DrawerService } from 'src/app/services/drawer.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.scss']
})

export class NewExpenseComponent implements OnInit {

  // Data used in component
  expenseForm: FormGroup;
  currencies: object[];
  natureErrorMsg = '';
  commentErrorMsg = '';

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

    onSubmit(expenseForm: NgForm): void {
      if (this.expenseForm.invalid) {
        return;
      }
      this.formService.submitExpenseForm();
      expenseForm.resetForm();
      this.drawerService.close();
      // -- We close the drawer after submit but that might be interesting to keep the drawer
      //    and refocus on purchaseOn to chain creation (if it's a common user behavior)
    }

    onCancel(): void {
      this.drawerService.close();
      this.expenseForm.reset();
    }

  // FORM VALIDATION -- Set multiple errors for Nature field //
    setErrors(): void {
      // Handle multiple error for NATURE field
      if (this.expenseForm.controls.nature.hasError('maxlength')) {
        this.natureErrorMsg = 'Nature should be max 120 characters';
      }
      else if (this.expenseForm.controls.nature.hasError('required')) {
        this.natureErrorMsg = 'Nature of the expense is required';
      }
    } 




}
