// == Import NG Modules 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// == Import Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { NewExpenseComponent } from './new-expense/new-expense.component';

// == Import Services
import { ExpensesService } from 'src/app/services/expenses.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ExpensesListComponent,
    NewExpenseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    ExpensesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
