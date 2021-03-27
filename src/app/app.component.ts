import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { DrawerService } from 'src/app/services/drawer.service';

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

