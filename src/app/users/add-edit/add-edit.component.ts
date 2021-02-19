import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { addUser, loadUser, updateUser } from '../../_store/actions/users.actions';
import { LinkState, linksFeatureKey } from '../../_store/reducers/links.reducers';
import { selectedUser } from 'src/app/_store/selectors/users.selectors';
import { UserService } from '../../_services/user.service';
import { ValidatorService } from '../../_services/validator.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/app/_models/user';

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
        private validatorService: ValidatorService,
        private store: Store<LinkState>
    ) {}

    ngOnInit() {
        
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        
        if (this.isAddMode) { // add mode
            this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
            if(this.currentUser){
                this.router.navigate(['/']);
            }
            // password not required in edit mode
            const passwordValidators = [Validators.minLength(6)];
            passwordValidators.push(Validators.required);
            this.form = this.formBuilder.group({
                first_name: ['', Validators.required],
                last_name: ['', Validators.required],
                email:  [null, [Validators.required, Validators.email], [this.validatorService.uniqueEmailValidator()], {updateOn: 'blur'}],
                password: ['', passwordValidators],
                confirm_password: [null, Validators.required]
            }, {
                validators: [this.validatorService.compareValidator('confirm_password', 'password')]
            });
        }else{  // edit mode
            //validation
            this.form = this.formBuilder.group({
                first_name: ['', Validators.required],
                last_name: ['', Validators.required],
                email:  [null, [Validators.required, Validators.email]]
            });

            //get user values
            this.store.dispatch(loadUser({ id: this.id }));
            this.store.select(selectedUser).subscribe(user => {
                if (user != null) {
                this.form.patchValue(user);
                }
            });
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
            // add
            this.store.dispatch(addUser({ User: this.form.value }));
            this.router.navigate['/users/login'];
        } else {
            // edit
            const update: Update<User> = {
                id: this.id,
                changes: this.form.value
            };
            this.store.dispatch(updateUser({ User: update }));
        }
    }
}
