import { UserService } from './../_helpers/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from './../_helpers/user.interface';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
    users: User[];

    constructor(private _toastr: ToastrService, private _userService: UserService, private router: Router) {
    }

    ngOnInit(): void {
        this.getAllUsers();
    }

    getAllUsers() {
        return this._userService.getUsers().subscribe((res: User[]) => {
            this.users = res;
        });
    }

    Delete(userId: number) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this._userService.deleteUser(userId).subscribe(res => {
                    this.getAllUsers();
                    this._toastr.success("Deleted Success !!", "User Registration");
                })
            }
        })
    }

    Edit(userId: number) {
        this.router.navigate(['/add-user'], { queryParams: { userId: userId } });
    }
}
