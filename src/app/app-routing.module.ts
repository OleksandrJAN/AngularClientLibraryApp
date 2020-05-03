import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { WriterListComponent } from './writer-list/writer-list.component';
import { WriterFormComponent } from './writer-form/writer-form.component';
import { WriterPageComponent } from './writer-page/writer-page.component';

import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BookPageComponent } from './book-page/book-page.component';

import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},

  { path: 'writers', component: WriterListComponent },
  { path: 'writers/add', component: WriterFormComponent, pathMatch: 'full' },
  { path: 'writers/:id/edit', component: WriterFormComponent },
  { path: 'writers/:id', component: WriterPageComponent },

  { path: 'books', component: BookListComponent },
  { path: 'books/add', component: BookFormComponent, pathMatch: 'full' },
  { path: 'books/:id/edit', component: BookFormComponent },
  { path: 'books/:id', component: BookPageComponent },

  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserPageComponent },
  { path: 'users/:id/settings', component: UserSettingsComponent, pathMatch: 'full' },

  { path: '404', component: NotFoundPageComponent },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
