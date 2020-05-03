import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

import { WriterService } from './service/writer.service';
import { WriterListComponent } from './writer-list/writer-list.component';
import { WriterFormComponent } from './writer-form/writer-form.component';
import { WriterPageComponent } from './writer-page/writer-page.component';

import { BookService } from './service/book.service';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BookPageComponent } from './book-page/book-page.component';
import { ImageService } from './service/image.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './auth/auth.service';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ReviewFormComponent } from './review-form/review-form.component';
import { UserService } from './service/user.service';
import { ReviewService } from './service/review.service';
import { UserPageComponent } from './user-page/user-page.component';
import { UserListComponent } from './user-list/user-list.component';
import { ReviewCardComponent } from './review-card/review-card.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { TokenStorageService } from './auth/token-storage.service';


@NgModule({
  declarations: [
    AppComponent,
    WriterListComponent,
    WriterFormComponent,
    WriterPageComponent,
    NotFoundPageComponent,
    BookListComponent,
    BookFormComponent,
    BookPageComponent,
    LoginComponent,
    SignupComponent,
    ReviewFormComponent,
    UserPageComponent,
    UserListComponent,
    ReviewCardComponent,
    ReviewListComponent,
    UserSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    WriterService,
    BookService,
    ImageService,
    AuthService,
    TokenStorageService,
    UserService,
    ReviewService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
