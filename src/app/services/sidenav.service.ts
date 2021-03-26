export class SideNavService {

    opened = false;

    open() {
       this.opened = true
    }

    close() {
        this.opened = false
    }

}
