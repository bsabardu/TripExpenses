// == Import NG Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './app-material/app-material.module';

import { MatDrawer} from '@angular/material/sidenav';



// == Import Local Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ExpensesListComponent } from './components/expenses-list/expenses-list.component';
import { NewExpenseComponent } from './components/new-expense/new-expense.component';
import { DialogComponent } from './components/dialog/dialog.component';

// == Import Services
import { ExpenseService } from 'src/app/services/expense.service';
import { ConverterService } from 'src/app/services/converter.service';
import { DrawerService } from 'src/app/services/drawer.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { FormService } from 'src/app/services/form.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ExpensesListComponent,
    NewExpenseComponent,
    DialogComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppMaterialModule,

  ],
  providers: [
    ExpenseService,
    ConverterService,
    DrawerService,
    SnackBarService,
    FormService,
    MatDrawer,
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]

})
export class AppModule { }
