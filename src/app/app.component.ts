import { DBOperation } from './_helpers/db-operation.enum';
import { User } from './_helpers/user.interface';
import { UserService } from './_helpers/user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import  { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MustMatch } from './_helpers/must-match.validator';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Angular_CRUD_Using_Routes_APP';
    registerForm : FormGroup;
    users: User[];
    submitted: boolean = false;
    buttonText: string = 'Submit';
    dbops: DBOperation;

    constructor(private _toastr: ToastrService, private _fb:FormBuilder, private _userService: UserService) {
    }

    ngOnInit(): void {
        this.setFormState();
        this.getAllUsers();
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

        this.buttonText = "Update";
        this.dbops = DBOperation.update;

        let user = this.users.find( (u: User) => u.id === userId );
        this.registerForm.patchValue(user);
        this.registerForm.get('password').setValue('');
        this.registerForm.get('confirmPassword').setValue('');
        this.registerForm.get('acceptTerms').setValue(false);
    }

    get f() {
        return this.registerForm.controls;
    }

    getAllUsers() {
        return this._userService.getUsers().subscribe((res : User[]) => {
            this.users = res;
        });
    }

    onSubmit() {
        this.submitted = true;

        if(this.registerForm.invalid) {
            return;
        }

        switch(this.dbops) {
            case DBOperation.create:
                this._userService.addUser(this.registerForm.value).subscribe(res => {
                    this.getAllUsers();
                    this.onCancel();
                    this._toastr.success("User Added !!", "User Registration");
                })
                break;
            case DBOperation.update:
                this._userService.updateUser(this.registerForm.value).subscribe(res => {
                    this.getAllUsers();
                    this.onCancel();
                    this._toastr.success("User Updated !!", "User Registration")
                })
                break;
        }
    }

    onCancel() {
        this.registerForm.reset();
        this.buttonText = "Submit";
        this.dbops = DBOperation.create;
        this.submitted = false;
    }

    setFormState() {

        this.buttonText = "Submit";
        this.dbops = DBOperation.create;

        this.registerForm = this._fb.group({
            id: [0],
            title: ['', Validators.compose([Validators.required])],
            firstName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
            lastName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            // dob: ['', Validators.compose([Validators.required, Validators.pattern('/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/')])],
            dob: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            confirmPassword: ['', Validators.compose([Validators.required])],
            acceptTerms: [false, Validators.compose([Validators.requiredTrue])]
        });
    }



}
