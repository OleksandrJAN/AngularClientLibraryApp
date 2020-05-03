import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { WriterService } from '../service/writer.service';
import { Writer } from '../model/writer';
import { ErrorMessage } from '../error/error-message';
import { TokenStorageService } from '../auth/token-storage.service';
import { Book } from '../model/book';


@Component({
  selector: 'app-writer-page',
  templateUrl: './writer-page.component.html',
  styleUrls: ['./writer-page.component.css']
})
export class WriterPageComponent implements OnInit {

  isCurrentUserAdmin: boolean;

  writer: Writer = new Writer();
  books: Book[];

  errorMessage: ErrorMessage = new ErrorMessage();
  
  private subscription: Subscription;

  constructor(
    private writerService: WriterService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) { }
  
  ngOnInit(): void {
    this.isCurrentUserAdmin = this.tokenStorage.isCurrentUserAdmin();

    let id: number;
    this.subscription = this.route.params.subscribe(params => id = params['id']);

    this.writerService.findOne(id).subscribe(
      (writer: Writer) => {
        this.writer = writer;
        this.findWriterBooks(id);
      },
      (error: HttpErrorResponse) => this.checkError(error)
    );
  }

  findWriterBooks(id: number) {
    this.writerService.findWriterBooks(id).subscribe(
      (books: Book[]) => this.books = books,
      (error: HttpErrorResponse) => this.checkError(error)
    )
  }

  deleteWriter() {
    this.writerService.delete(this.writer).subscribe(
      () => this.router.navigate(['/writers']),
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
