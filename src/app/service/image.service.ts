import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private _imageUrl: string = 'http://localhost:8080/image';

  constructor(private http: HttpClient) { }

  // returns a string that equals the file name on the server
  loadFile(file: File): Observable<string> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    return this.http.post(this._imageUrl, formdata, {responseType: 'text'});
  }

  getImage(filename: string): Observable<string> {
    return this.http.get(this._imageUrl + "/" + filename,{ responseType: 'text' });
  }

}
