import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment.development";
import {catchError, delay, map, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export abstract class Base {
  protected http = inject(HttpClient)
  protected abstract readonly resourcePath: string
  protected readonly baseUrl = environment.apiUrl

  protected get<T>(endpoint: string = ''): Observable<T> {
    return this.http.get<{ data: T }>(`${this.baseUrl}/${this.resourcePath}${endpoint}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  protected post<T>(endpoint: string = '', body: any = {}): Observable<T> {
    return this.http.post<{ data: T }>(`${this.baseUrl}/${this.resourcePath}${endpoint}`, body).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  protected handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    const userError = {
      message: error.status === 0 ? 'Network error' : 'Server error',
      originalError: error
    };
    return throwError(() => userError);
  }
}
