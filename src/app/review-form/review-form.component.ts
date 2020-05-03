import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ErrorMessage } from '../error/error-message';
import { Review, Assessment } from '../model/review';


@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {

  @Input() review: Review;
  @Input() errorMessage: ErrorMessage;

  @Output() onSaveAction = new EventEmitter();
  @Output() onUpdateAction = new EventEmitter()


  assessments: Assessment[] = [
    Assessment.NEGATIVE, Assessment.NEUTRAL, Assessment.POSITIVE
  ];


  constructor() { }

  ngOnInit(): void { }

  onSubmit() {
    if (this.review.id === undefined) {
      this.onSaveAction.emit(this.review);
    } else {
      this.onUpdateAction.emit(this.review);
    }
  }

}
