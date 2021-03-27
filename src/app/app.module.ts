// == Import NG Modules 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




// == Import Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { NewExpenseComponent } from './new-expense/new-expense.component';

  // Material Components
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';




// == Import Services
import { ExpenseService } from 'src/app/services/expense.service';
import { ConverterService } from 'src/app/services/converter.service';  
// we are using a service to handle sidenav behavior. that might be overkill but i didn't find any better solution as open and close button are not in the same component
import { SideNavService } from 'src/app/services/sidenav.service';
import { SnackBarService } from 'src/app/services/snackbar.service'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ExpensesListComponent,
    NewExpenseComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    //Material
    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  providers: [
    ExpenseService,
    ConverterService,
    SideNavService,
    SnackBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
