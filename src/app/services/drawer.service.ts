import { Injectable } from '@angular/core';
import { MatDrawer} from '@angular/material/sidenav';

@Injectable()
export class DrawerService {

  constructor(public drawer: MatDrawer) { }

  setDrawer(drawer: MatDrawer): void {
    this.drawer = drawer;
  }

  toggle(): void {
    this.drawer.toggle();
  }

  open(): void {
    this.drawer.open();
  }

  close(): void {
    this.drawer.close();
  }
}
