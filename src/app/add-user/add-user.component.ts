import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../_helpers/user.interface';
import { UserService } from './../_helpers/user.service';
import { ToastrService } from 'ngx-toastr';
import { DBOperation } from './../_helpers/db-operation.enum';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MustMatch } from '../_helpers/must-match.validator';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
    registerForm : FormGroup;
    submitted: boolean = false;
    buttonText: string = 'Submit';
    dbops: DBOperation;
    userId: number;

    constructor(private _toastr: ToastrService, private _fb:FormBuilder, private _userService: UserService, private router: Router, private _activatedRoute: ActivatedRoute) {
        this._activatedRoute.queryParams.subscribe(param => {
            this.userId = param['userId'];
        })
    }

    ngOnInit(): void {
        this.setFormState();
        if(this.userId && this.userId != null)
        {
            this.getUserById(this.userId);
        }
    }

    get f() {
        return this.registerForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        if(this.registerForm.invalid) {
            return;
        }

        switch(this.dbops) {
            case DBOperation.create:
                this._userService.addUser(this.registerForm.value).subscribe(res => {
                    // this.getAllUsers();
                    this.onCancel();
                    this._toastr.success("User Added !!", "User Registration");
                })
                break;
            case DBOperation.update:
                this._userService.updateUser(this.registerForm.value).subscribe(res => {
                    // this.getAllUsers();
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
        this.router.navigate(['list-user']);
    }

    setFormState() {

        this.buttonText = "Submit";
        this.dbops = DBOperation.create;

        // this.registerForm = this._fb.group({
        //     id: [0],
        //     title: ['', Validators.compose([Validators.required])],
        //     firstName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
        //     lastName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
        //     email: ['', Validators.compose([Validators.required, Validators.email])],
        //     // dob: ['', Validators.compose([Validators.required, Validators.pattern('/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/')])],
        //     dob: ['', Validators.compose([Validators.required])],
        //     password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        //     confirmPassword: ['', Validators.compose([Validators.required])],
        //     acceptTerms: [false, Validators.compose([Validators.requiredTrue])]
        // }, {
        //     validators : MustMatch('password', 'confirmPassword'),
        // });

        this.registerForm = new FormGroup({
            id: new FormControl(null),
            title: new FormControl('', Validators.compose([Validators.required])),
            firstName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
            lastName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
            email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
            dob: new FormControl('', Validators.compose([Validators.required])),
            password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
            confirmPassword: new FormControl('', Validators.compose([Validators.required])),
            acceptTerms: new FormControl(false, Validators.compose([Validators.requiredTrue])),
        },
            MustMatch('password', 'confirmPassword'),
        )
    }

    getUserById(id: number) {
        this._userService.getUser(id).subscribe(res => {
            this.buttonText = "Update";
            this.dbops = DBOperation.update;

            this.registerForm.patchValue(res);
            this.registerForm.get('password').setValue('');
            this.registerForm.get('confirmPassword').setValue('');
            this.registerForm.get('acceptTerms').setValue(false);
        })

    }
}
