import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';

import { UserService } from '../../_services/user.service';
import { ValidatorService } from '../../_services/validator.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private validatorService: ValidatorService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        //this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        // const salt = bcrypt.genSaltSync(10);
        // this.form.value.password = bcrypt.hashSync(this.form.value.password, salt);
        // console.log(this.form.value.password);
        this.loading = true;
        this.userService.login(this.form.value.email, this.form.value.password)
            .pipe(first())
            .subscribe(
              data => {
                alert('login successfully');
                this.router.navigate(['/']);
            },
            error => {
                console.log(error);
                this.loading = false;
            });
              //{
                // next: (response) => {

                //   if(response.length > 0){
                //     var user = response[0];
                //     alert('login successfully');
                //     sessionStorage.setItem('currentUser', JSON.stringify(user));
                //     this.router.navigate(['/']);
                //   }else{
                //     alert("Invalid Email or Password.");
                //   }
                  
                // },
                // error: error => {
                //   alert('error');
                //     console.log(error);
                //     this.loading = false;
                // }
            //});
    }

}
