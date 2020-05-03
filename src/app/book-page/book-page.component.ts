import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { Book } from '../model/book';
import { BookService } from '../service/book.service';
import { ImageService } from '../service/image.service';
import { ErrorMessage } from '../error/error-message';
import { TokenStorageService } from '../auth/token-storage.service';
import { Review } from '../model/review';
import { User } from '../model/user';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {

  currentUser: User;
  isCurrentUserAdmin: boolean;

  book: Book = new Book();
  image: string;
  reviews: Review[];

  errorMessage: ErrorMessage = new ErrorMessage();
  
  private subscription: Subscription;

  constructor(
    private bookService: BookService,
    private imageService: ImageService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit() {
    this.getCurrentUserInfo();

    let id: number;
    this.subscription = this.route.params.subscribe(params => id = params['id']);

    this.bookService.findOne(id).subscribe(
      (book: Book) => {
        this.book = book;
        this.loadImage();
        this.getBookReviews();
      },
      (error: HttpErrorResponse) => this.checkError(error)
    );
  }

  getCurrentUserInfo() {
    this.tokenStorage.getCurrentUser().subscribe(
      (user: User) => this.currentUser = user,
      (error: HttpErrorResponse) => this.checkError(error)
    );
    this.isCurrentUserAdmin = this.tokenStorage.isCurrentUserAdmin();
  }

  
  loadImage() {
    this.imageService.getImage(this.book.filename).subscribe(
      (image: string) => this.image = image,
      (error: HttpErrorResponse) => this.checkError(error)
    )
  }

  getBookReviews() {
    this.bookService.findBookReviews(this.book.id).subscribe(
      (reviews: Review[]) => this.reviews = reviews,
      (error: HttpErrorResponse) => this.checkError(error)
    )
  }


  deleteBook() {
    this.bookService.delete(this.book).subscribe(
      () => this.router.navigate(['/books']),
      (error: HttpErrorResponse) => this.checkError(error)
    )
  }


  checkError(error: HttpErrorResponse) {
    console.log(error);
    this.errorMessage.status = error.status;

    if (error.error) {
      if (error.error.message) {
        this.errorMessage.message = error.error.message;
      } else {
        this.errorMessage.message = error.error;
      }
    }
  }

}
