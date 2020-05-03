import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../model/book';
import { Review } from '../model/review';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookUrl: string = 'http://localhost:8080/books';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.bookUrl);
  }

  public findOne(id: number): Observable<Book> {
    return this.http.get<Book>(this.bookUrl + "/" + id);
  }

  public findBookReviews(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(this.bookUrl + "/" + id + "/reviews");
  }
 
  public save(book: Book) {
    return this.http.post<Book>(this.bookUrl, book);
  }

  public update(currentBookId: number, editedBook: Book) {
    return this.http.put<Book>(this.bookUrl+ "/" + currentBookId, editedBook);
  }

  public delete(Book: Book): any {
    return this.http.delete(this.bookUrl + "/" + Book.id);
  }
}
