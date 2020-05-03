import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Writer } from '../model/writer';
import { Book } from '../model/book';


@Injectable()
export class WriterService {

  private writerUrl: string = 'http://localhost:8080/writers';

  constructor(private http: HttpClient) { }
 
  public findAll(): Observable<Writer[]> {
    return this.http.get<Writer[]>(this.writerUrl);
  }

  public findOne(id: number): Observable<Writer> {
    return this.http.get<Writer>(this.writerUrl + "/" + id);
  }

  public findWriterBooks(id: number): Observable<Book[]> {
    return this.http.get<Book[]>(this.writerUrl + "/" + id + "/books");
  }
 
  public save(writer: Writer) {
    return this.http.post<Writer>(this.writerUrl, writer);
  }

  public update(currentWriterId: number, editedWriter: Writer) {
    return this.http.put<Writer>(this.writerUrl+ "/" + currentWriterId, editedWriter);
  }

  public delete(writer: Writer): any {
    return this.http.delete(this.writerUrl + "/" + writer.id);
  }
}
