import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    title = 'Angular_CRUD_Using_Routes_APP';

    constructor(private _toastr: ToastrService) {
    }

    ngOnInit(): void {
        this._toastr.success("User Added", "User Registration");
        this._toastr.info("User Added", "User Registration");
        this._toastr.error("User Added", "User Registration");
    }

}
