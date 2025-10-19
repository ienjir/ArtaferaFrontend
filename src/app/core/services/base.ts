import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment.development";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export abstract class Base {
  protected http = inject(HttpClient)
  protected abstract readonly resourcePath: string
  protected readonly baseUrl = environment.apiUrl

  protected get<T>(endpoint: string = ''): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${this.resourcePath}${endpoint}`).pipe(
      catchError(this.handleError)
    );
  }

  protected post<T>(endpoint: string = '', body: any = {}): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${this.resourcePath}${endpoint}`, body).pipe(
      catchError(this.handleError)
    );
  }

  protected handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => error);
  }
}
