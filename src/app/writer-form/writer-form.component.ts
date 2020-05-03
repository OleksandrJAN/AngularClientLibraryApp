import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { WriterService } from '../service/writer.service';
import { Writer } from '../model/writer';
import { TokenStorageService } from '../auth/token-storage.service';
import { ErrorMessage } from '../error/error-message';

@Component({
  selector: 'app-writer-form',
  templateUrl: './writer-form.component.html',
  styleUrls: ['./writer-form.component.css']
})
export class WriterFormComponent implements OnInit {

  writer: Writer = new Writer();
  currentWriterID: number;

  isAdmin: boolean;

  backLink: string = "/writers";
  putAction: boolean = false;
  
  errorMessage: ErrorMessage = new ErrorMessage();
 
  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private writerService: WriterService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    if (!this.isSufficientAccessRights()) {
      return;
    }
  
    this.route.url.subscribe(
      () => {
        this.route.params.subscribe(params => this.currentWriterID = params['id']);
        if (this.currentWriterID !== undefined) {
          // Edit Form
          this.initWriter();
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

  initWriter() {
    this.writerService.findOne(this.currentWriterID).subscribe(
      (writer: Writer) => {
        this.writer = writer;
        this.backLink = "/writers/" + this.currentWriterID;
        this.putAction = true;
      },
      (error: HttpErrorResponse) => this.checkError(error)
    );
  }
 
  onSubmit() {
    if (this.putAction) {
      this.writerService.update(this.currentWriterID, this.writer).subscribe(
        (editedWriter: Writer) => this.router.navigate(['/writers/', editedWriter.id]),
        (error: HttpErrorResponse) => this.checkError(error)
      );
    } else {
      this.writerService.save(this.writer).subscribe(
        (writer: Writer) => this.router.navigate(['/writers/', writer.id]),
        (error: HttpErrorResponse) => this.checkError(error)
      );
    }
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