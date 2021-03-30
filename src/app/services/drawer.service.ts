// -- IMPORTS -- //

  // NG Module
import { Injectable } from '@angular/core';

  // Material components
import { MatDrawer} from '@angular/material/sidenav';

// ----
@Injectable()
export class DrawerService {

  constructor(public drawer: MatDrawer) { }

  /**
   * @desc Service handling the behavior of the sidenav/drawer. This service allows others components to manipulate it
   * @param drawer The ref in the template of the drawer we manipulate
   */
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
