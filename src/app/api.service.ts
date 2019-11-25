import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  getWheater(city, unit): Observable<any> {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=13537c6bab4e519d06153ee3239f66fc&units=${unit}&lang=ru`;
    return this.http.get(url).pipe(
      tap(_ => console.log(`fetched`)),
      catchError(this.handleError<any>(``))
    );
  }

  getWheaterByCord(lat, lon, unit): Observable<any> {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=13537c6bab4e519d06153ee3239f66fc&units=${unit}&lang=ru`;
    return this.http.get(url).pipe(
      tap(_ => console.log(`fetched`)),
      catchError(this.handleError<any>(``))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
