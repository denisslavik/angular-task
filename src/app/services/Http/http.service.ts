import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments';

@Injectable()
export class HttpService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  updateUser(id: number, user: any) {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }
}
