import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService } from '../../_services/user.service';
import { ValidatorService } from '../../_services/validator.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    currentUser: any;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private validatorService: ValidatorService
    ) {}

    ngOnInit() {
        
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        if (this.isAddMode) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if(this.currentUser){
                this.router.navigate(['/']);
            }
        }
        
        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email:  [null, [Validators.required, Validators.email], [this.validatorService.uniqueEmailValidator()], {updateOn: 'blur'}],
            password: ['', passwordValidators],
            confirm_password: [null, Validators.required]
        }, {
            validators: [this.validatorService.compareValidator('confirm_password', 'password')]
        });

        if (!this.isAddMode) {
            this.userService.getById(this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        // reset alerts on submit
      

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createUser();
        } else {
            this.updateUser();
        }
    }

    private createUser() {
        // const salt = bcrypt.genSaltSync(10);
        // this.form.value.password = bcrypt.hashSync(this.form.value.password, salt);
        delete this.form.value.confirm_password;
        this.userService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    alert('User added successfully');
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error: error => {
                    console.log(error);
                    this.loading = false;
                }
            });
    }

    private updateUser() {
        this.userService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    alert('Update successful');
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    console.log(error);
                    this.loading = false;
                }
            });
    }

}
