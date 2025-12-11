import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment.development";
import {catchError, delay, map, Observable, throwError} from "rxjs";
import {response} from "express";

@Injectable({
  providedIn: 'root'
})
export abstract class Base {
  protected http = inject(HttpClient)
  protected abstract readonly resourcePath: string
  protected readonly baseUrl = environment.apiUrl

  protected get<T>(endpoint: string = '', safe: boolean): Observable<T> {
    return this.http.get<{ data: T }>(`${this.baseUrl}/${this.resourcePath}${endpoint}`).pipe(
      map(response => response.data),
      safe? catchError(this.handleError) : o => o
    )
  }

  protected post<T>(endpoint: string = '', body: any = {}, safe: boolean): Observable<T> {
    return this.http.post<{ data: T }>(`${this.baseUrl}/${this.resourcePath}${endpoint}`, body).pipe(
      map(response => response.data),
      safe? catchError(this.handleError)  : o => o
    );
  }

  protected handleError(error: any): Observable<never> {
    console.error(error)
    return throwError(() => error)
  }
}
