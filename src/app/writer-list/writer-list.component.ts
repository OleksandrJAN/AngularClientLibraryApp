import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Writer } from '../model/writer';
import { WriterService } from '../service/writer.service';
import { ErrorMessage } from '../error/error-message';
import { TokenStorageService } from '../auth/token-storage.service';


@Component({
  selector: 'app-writer-list',
  templateUrl: './writer-list.component.html',
  styleUrls: ['./writer-list.component.css']
})
export class WriterListComponent implements OnInit {

  writers: Writer[];
  isAdmin: boolean;

  errorMessage: ErrorMessage = new ErrorMessage();

  constructor(
    private writerService: WriterService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit() {
    this.isAdmin = this.tokenStorage.isCurrentUserAdmin();

    this.writerService.findAll().subscribe(
      (writers: Writer[]) => {
        this.writers = writers;
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
