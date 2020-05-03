import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from '../model/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private reviewUrl: string = 'http://localhost:8080/reviews';

  constructor(private http: HttpClient) { }

  
  public save(review: Review, bookId: number, authorId: number) {
    let reviewDto = {
      text: review.text,
      assessment: review.assessment,
      bookId: bookId,
      authorId: authorId
    }
    
    return this.http.post<Review>(this.reviewUrl, reviewDto);
  }

  public update(editedReview: Review) {
    return this.http.put<Review>(this.reviewUrl+ "/" + editedReview.id, editedReview);
  }

  public delete(review: Review): any {
    return this.http.delete(this.reviewUrl + "/" + review.id);
  }


}
