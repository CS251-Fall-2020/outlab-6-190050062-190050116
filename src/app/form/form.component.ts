import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Form } from '../form_value';
import { GetPostService } from '../get-post.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(private getpost: GetPostService) { }

  ngOnInit(): void {
    this.getInitialValues();
  }

  value: Form = { name: '', email: '', feedback: '', comment: '' };

  getInitialValues(): void {
    this.getpost.getInitialValues().subscribe(value => this.feedbackForm.patchValue(value));
  }

  feedbackForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    feedback: new FormControl(''),
    comment: new FormControl('')
  })

  submit() {
    this.getpost.getUpdatedValues(this.feedbackForm.value).subscribe(value => { this.value = value });
  }
}
