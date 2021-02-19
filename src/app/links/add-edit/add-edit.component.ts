import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidatorService } from 'src/app/_services/validator.service';
import { LinkService } from 'src/app/_services/link.service';
import { first } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { addLink, loadLink, updateLink } from '../../_store/actions/links.actions';
import { LinkState, linksFeatureKey } from '../../_store/reducers/links.reducers';
import { selectedLink } from 'src/app/_store/selectors/links.selector';
import { Link } from 'src/app/_models/link';
import { NgForm} from '@angular/forms'

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
  currentUserId: null;
  link: any = {};

  categories = ['Food', 'Technology', 'News'];
  //@Input() public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private validatorService: ValidatorService,
    private linkService: LinkService,
    private store: Store<LinkState>
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    //get current user id
    this.currentUser = localStorage.getItem("currentUser")?JSON.parse(localStorage.getItem("currentUser")):null;
    this.currentUserId = this.currentUser?this.currentUser.id:null;

    // validation for url link
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

    this.form = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        link:  ['', [Validators.required, Validators.pattern(urlRegex)]],
        category: ['', Validators.required],
        user_id: [this.currentUserId, Validators.required]
    });

    if (!this.isAddMode) {
      this.store.dispatch(loadLink({ id: this.id }));
      this.store.select(selectedLink).subscribe(link => {
        if (link != null) {
          this.form.patchValue(link);
        }
      });
    }
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

    if (this.isAddMode) {
      // add
      this.store.dispatch(addLink({ Link: this.form.value }));
      this.router.navigate['/links'];
    } else {
      // edit
      const update: Update<Link> = {
        id: this.id,
        changes: this.form.value
      };
      this.store.dispatch(updateLink({ Link: update }));
    }
  }

}
