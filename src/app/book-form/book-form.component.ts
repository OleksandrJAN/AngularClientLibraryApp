import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { BookService } from '../service/book.service';
import { Book, Genre } from '../model/book';
import { Writer } from '../model/writer';
import { WriterService } from '../service/writer.service';
import { ImageService } from '../service/image.service';
import { ErrorMessage } from '../error/error-message';
import { TokenStorageService } from '../auth/token-storage.service';


@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  book: Book = new Book();
  currentBookID: number;

  writers: Writer[];
  poster: File;
  allGenres: Genre[] = [
    Genre.TRAGEDY, Genre.DRAMA, Genre.HORROR, Genre.FANTASY
  ];

  isAdmin: boolean;

  backLink: string = "/books";
  putAction: boolean = false;
  posterFileName: string;

  errorMessage: ErrorMessage = new ErrorMessage();


  checkGenre(genre: Genre) {
    return this.book.genres.includes(genre);
  }

  changeGenre(genre: Genre, $event) {
    if ($event.target.checked) {
      (this.book.genres).push(genre);
    } else {
      this.book.genres.splice(this.book.genres.indexOf(genre), 1);
    }
  }

  onfileSelected($event) {
    this.poster = $event.target.files[0];
    if (this.poster !== undefined) {
      let bigSize: boolean = this.poster.name.length > 40;
      if (!bigSize) {
        this.posterFileName = this.poster.name.slice(0, 40);
      } else {
        this.posterFileName = this.poster.name.slice(0, 37);
        this.posterFileName += "...";
      }
    }
  }
  

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private bookService: BookService,
    private writerService: WriterService,
    private imageService: ImageService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    if (!this.isSufficientAccessRights()) {
      return;
    }
    
    this.initWriters();
  
    this.route.url.subscribe(
      () => {
        this.route.params.subscribe(params => this.currentBookID = params['id']);
        if (this.currentBookID !== undefined) {
          // Edit Form
          this.initBook();
        } 
      }
    ) 
  }

  isSufficientAccessRights(): boolean {
    if (!this.tokenStorage.isCurrentUserAuth()) {
      this.errorMessage = ErrorMessage.authenticationError();
      return false;
    }

    this.isAdmin = this.tokenStorage.isCurrentUserAdmin();
    if (!this.isAdmin) {
      this.errorMessage = ErrorMessage.forbiddenError();
      return false;
    }

    return true;
  }

  initWriters() {
    this.writerService.findAll().subscribe(
      (writers: Writer[]) => this.writers = writers,
      (error: HttpErrorResponse) => this.checkError(error)
    );
  }

  initBook() {
    this.bookService.findOne(this.currentBookID).subscribe(
      (book: Book) => {
        this.book = book;
        this.backLink = "/books/" + this.currentBookID;
        this.putAction = true;
      },
      (error: HttpErrorResponse) => this.checkError(error)
    );
  }


  onSubmit() {
    if (this.currentBookID === undefined) {
      // Add Form
      this.loadFile(this.saveBook);
    } else {
      // Edit Form
      if (this.poster === undefined) {
        // old poster file
        this.updateBook();
      } else {
        // new poster file
        this.loadFile(this.updateBook);
      }
    }
  }

  saveBook = () => {
    this.bookService.save(this.book).subscribe(
      (book: Book) => this.router.navigate(['/books/' + book.id]),
      (error: HttpErrorResponse) => this.checkError(error)
    );
  }

  updateBook = () => {
    this.bookService.update(this.currentBookID, this.book).subscribe(
      (editedBook: Book) => this.router.navigate(['/books/' + editedBook.id]),
      (error: HttpErrorResponse) => this.checkError(error)
    );
  }

  loadFile(action: () => void) {
    this.imageService.loadFile(this.poster).subscribe(
      (filename: string) => {
        this.book.filename = filename;
        action();
      },
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
