import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Form } from './form_value';
import { Observable,throwError,of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetPostService {

  constructor(private http: HttpClient) { }
  private geturl = "https://cs251-outlab-6.herokuapp.com/initial_values/";
  private posturl = "https://cs251-outlab-6.herokuapp.com/add_new_feedback/"

    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        window.alert('An error occurred: ' + error.message);
      } else {
        window.alert(
          'An error occurred: ' + error.message);
      }
      return throwError(
        'Something bad happened; please try again later.');
    }

  getInitialValues(): Observable<Form>{
    return this.http.get<Form>(this.geturl).pipe(retry(3),catchError(this.handleError));
  }
  getUpdatedValues(formvalue: Form): Observable<Form>{
    return this.http.post<Form>(this.posturl, formvalue).pipe(catchError(this.handleError));
  }

}
