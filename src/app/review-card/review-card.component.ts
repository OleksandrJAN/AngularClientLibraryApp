import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Review } from '../model/review';
import { User } from '../model/user';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent implements OnInit {


  @Input() currentUser: User;
  @Input() isCurrentUserAdmin: boolean;

  @Input() review: Review;

  @Input() isUserPage: boolean = false;
  @Input() isBookPage: boolean = false;

  @Output() onDelete = new EventEmitter<Review>();
  @Output() onEdit = new EventEmitter<Review>();

  
  constructor() { }

  ngOnInit(): void { }


  deleteReviewEvent() { 
    this.onDelete.emit(this.review);
  }

  editReviewEvent() {
    this.onEdit.emit(this.review);
  }

}
