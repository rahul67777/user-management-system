import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private api: HttpClient) {}
  fetchUsersList(): Observable<any> {
    return this.api.get('https://jsonplaceholder.typicode.com/users').pipe(
      catchError((err) => {
        return of(err?.error);
      })
    );
  }
}
