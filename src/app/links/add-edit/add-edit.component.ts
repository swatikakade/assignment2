import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidatorService } from 'src/app/_services/validator.service';
import { LinkService } from 'src/app/_services/link.service';
import { first } from 'rxjs/operators';

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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private validatorService: ValidatorService,
    private linkService: LinkService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    //get current user id
    var currentUserId = 2;

    // validation for url link
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

    this.form = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        link:  ['', [Validators.required, Validators.pattern(urlRegex)]],
        category: ['', Validators.required],
        user_id: [currentUserId, Validators.required]
    });

    if (!this.isAddMode) {
        this.linkService.getById(this.id)
            .pipe(first())
            .subscribe(x => this.form.patchValue(x));
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
        this.createLink();
    } else {
        this.updateLink();
    }
  }

  private createLink() {
    this.linkService.add(this.form.value)
        .pipe(first())
        .subscribe({
            next: () => {
                alert('Link added successfully');
                this.router.navigate(['users', 'mylinks']);
            },
            error: error => {
                console.log(error);
                this.loading = false;
            }
    });
  }

  private updateLink() {
      this.linkService.update(this.id, this.form.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  alert('Update successful');
                  this.router.navigate(['users', 'mylinks']);
              },
              error: error => {
                  console.log(error);
                  this.loading = false;
              }
      });
  }

}
