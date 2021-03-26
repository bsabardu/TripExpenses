import { Component } from '@angular/core';
import { SideNavService } from "src/app/services/sidenav.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lucca-TripExpenses';

  // Prop handling open / close of drawer
 isDrawerOpened: boolean = this.sidenavService.opened

 constructor(private sidenavService: SideNavService){
   
 }

 onOpen() {
   this.sidenavService.open();
   this.isDrawerOpened = this.sidenavService.opened
 }

}

