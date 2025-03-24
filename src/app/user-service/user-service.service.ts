import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  url = 'https://jsonplaceholder.typicode.com/users';
  constructor(private api: HttpClient) {}
  fetchUsersList(): Observable<any> {
    return this.api.get(this.url).pipe(
      catchError((err) => {
        return of(err?.error);
      })
    );
  }
  addUser(data: any): Observable<any> {
    return this.api.post(this.url, data).pipe(
      catchError((err) => {
        return of(err?.error);
      })
    );
  }
  deleteUser(id: any) {
    return this.api.delete(this.url + '/' + id).pipe(
      catchError((err) => {
        return of(err?.error);
      })
    );
  }
  editUser(data: any, id: number): Observable<any> {
    return this.api.put(this.url + '/' + id, data).pipe(
      catchError((err) => {
        return of(err?.error);
      })
    );
  }
}
