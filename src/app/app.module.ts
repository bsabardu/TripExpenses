// == Import NG Modules 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'



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





// == Import Services
import { ExpenseService } from 'src/app/services/expense.service';

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
    HttpClientModule,

    //Material
    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule
  ],
  providers: [
    ExpenseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
