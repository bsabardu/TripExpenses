// -- IMPORTS -- //

  // NG Modules
import { Component, OnInit} from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

  // Custom services
import { DrawerService } from 'src/app/services/drawer.service';
import { FormService } from 'src/app/services/form.service';

// ----

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

  /**
   * @desc Method on component initialisation:
   * Trigger the initForm method of form service
   * Get expenseForm and currencies object from Form service
   * Set custom errors management to from
   */
    ngOnInit(): void {
      this.formService.initForm();
      this.expenseForm = this.formService.expenseForm;
      this.currencies = this.formService.currencies;
      this.expenseForm.statusChanges.subscribe(() => this.setErrors());
    }

  /**
   * @desc Method on form dom object submission.
   * Trigger the from submission from Form Service, reset fields and close drawer.
   * @param expenseForm form object. As NgForm to use the reset form feature
   */
    onSubmit(expenseForm: NgForm): void {
      this.formService.submitExpenseForm();
      expenseForm.resetForm();                  // resetForm is used to avoid having validator triggered after reseting the form
      this.drawerService.close();
      // (That might be interesting to keep the drawer openand refocus on first field to chain creation
      // (if it's a common user behavior)
    }

    onCancel(): void {
      this.drawerService.close();
      this.expenseForm.reset();
    }

  // FORM VALIDATIONS -- //

  /**
   * @desc Method that set custom validation (for fields with 2+ validators)
   */
    setErrors(): void {
      // Nature field : maxLength & required
      if (this.expenseForm.controls.nature.hasError('maxlength')) {
        this.natureErrorMsg = 'Nature should be max 120 characters';
      }
      else if (this.expenseForm.controls.nature.hasError('required')) {
        this.natureErrorMsg = 'Nature of the expense is required';
      }
    }




}
