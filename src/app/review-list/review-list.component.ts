import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { User } from '../model/user';
import { Review } from '../model/review';
import { ReviewService } from '../service/review.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMessage } from '../error/error-message';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  @Input() currentUser: User;
  @Input() isCurrentUserAdmin: boolean;

  @Input() reviews: Review[];

  @Input() isUserPage: boolean = false;
  @Input() isBookPage: boolean = false;
  @Input() bookId: number;

  @ViewChild('reviewForm')
  reviewForm: ElementRef;

  formReview: Review = new Review();
  reviewFormErrorMessage: ErrorMessage = new ErrorMessage();

  constructor(
    private reviewService: ReviewService
  ) { }

  ngOnInit(): void { }


  saveReview(review: Review) {
    this.reviewService.save(review, this.bookId, this.currentUser.id).subscribe(
      (review: Review) => {
        this.reviews.push(review);

        // обнуляем 'formReview' для review-form.component
        this.formReview = new Review();
      },
      (error: HttpErrorResponse) => this.checkReviewFormError(error)
    )
  }

  editReviewEventListener(review: Review) {
    this.formReview = review;
    this.scrollToReviewForm();
  }

  scrollToReviewForm() {
    this.reviewForm.nativeElement.scrollIntoView();
  }

  updateReview(review: Review) {
    this.reviewService.update(review).subscribe(
      (review: Review) => {
        // удаляем старую рецензию 'this.formReview' и вставляем на её место новую рецензию 'review'
        let indexOfEditedReview = this.reviews.indexOf(this.formReview);        
        this.reviews.splice(indexOfEditedReview, 1, review);

        // обнуляем 'formReview' для review-form.component
        this.formReview = new Review();
      },
      (error: HttpErrorResponse) => this.checkReviewFormError(error)
    )
  }

  deleteReviewEventListener(review: Review) {
    this.reviewService.delete(review).subscribe(
      () => this.reviews.splice(this.reviews.indexOf(review)),
      (error: HttpErrorResponse) => {
        // ошибка может произойти если кто то уже удалил рецензию
        window.location.reload();
        // console.log(error);
      } 
    )
  }

  
  checkReviewFormError(error: HttpErrorResponse) {
    console.log(error);
    this.reviewFormErrorMessage.status = error.status;

    if (error.error) {
      if (error.error.message) {
        this.reviewFormErrorMessage.message = error.error.message;
      } else {
        this.reviewFormErrorMessage.message = error.error;
      }
    }
  }

}
