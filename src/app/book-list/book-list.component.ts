import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Book } from '../model/book';
import { BookService } from '../service/book.service';
import { ErrorMessage } from '../error/error-message';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[];
  isAdmin: boolean;

  errorMessage: ErrorMessage = new ErrorMessage();

  constructor(
    private bookService: BookService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit() {
    this.isAdmin = this.tokenStorage.isCurrentUserAdmin();

    this.bookService.findAll().subscribe(
      (books: Book[]) => {
        this.books = books;
      },
      (error: HttpErrorResponse) => {
        this.checkError(error);
      }
    );
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
