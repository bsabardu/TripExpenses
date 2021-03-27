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
import { DialogComponent } from './dialog/dialog.component';

  // Material Components
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatDrawer} from '@angular/material/sidenav';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';


// == Import Services
import { ExpenseService } from 'src/app/services/expense.service';
import { ConverterService } from 'src/app/services/converter.service';
import { DrawerService } from 'src/app/services/drawer.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

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

    // Material
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
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule
  ],
  providers: [
    ExpenseService,
    ConverterService,
    DrawerService,
    SnackBarService,
    MatDrawer,
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]

})
export class AppModule { }
