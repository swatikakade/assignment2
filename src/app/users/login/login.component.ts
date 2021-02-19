import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { UserService } from '../../_services/user.service';
import { ValidatorService } from '../../_services/validator.service';
import * as bcrypt from 'bcryptjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/_store/app.state';
import { login } from 'src/app/_store/actions/users.actions';

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
        private validatorService: ValidatorService,
        private httpClient: HttpClient,
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.userService.logout();
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        const email = this.form.value.email;
        const password = this.form.value.password;
        this.store.dispatch(login({email, password}));

        // this.userService.login(this.form.value.email, this.form.value.password)
        //     .pipe(first())
        //     .subscribe({
        //       next: () => {
        //         this.userService.isAuthorized();
        //         const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        //         this.router.navigateByUrl(returnUrl);
        //     },
        //     error: error => {
        //         alert(error);
        //         this.loading = false;
        //     }
        //   });
    }

}
