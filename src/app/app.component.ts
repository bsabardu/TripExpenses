// -- IMPORTS -- //

  // NG Modules
import { Component, ViewChild, AfterViewInit } from '@angular/core';

  // Custom Services
import { DrawerService } from 'src/app/services/drawer.service';

  // Material Components
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {
  @ViewChild('drawer') public drawer: MatDrawer;
  title = 'TripExpenses';

  constructor(private drawerService: DrawerService) {}

  ngAfterViewInit(): void {
    this.drawerService.setDrawer(this.drawer);
  }

}

