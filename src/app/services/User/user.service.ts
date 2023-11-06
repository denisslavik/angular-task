import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'environments';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.apiUrl;

  private currentUserSubject = new BehaviorSubject<any>(this.getCurrentUser());

  currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createUser(user: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, user);
  }

  updateUser(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getUsersList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  login(user: any): Observable<any> {
    console.log(user, 'user');
    return this.http.get(
      `${this.baseUrl}?Email=${user.email}&Password=${user.password}`
    );
  }

  logout(): void {
    sessionStorage.removeItem('currentUser');
  }

  setCurrentUser(user: any): void {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): any {
    return JSON.parse(sessionStorage.getItem('currentUser') || '{}');
  }
}
