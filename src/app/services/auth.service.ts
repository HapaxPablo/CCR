import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://reqres.in/'

  constructor(private http: HttpClient) {  }

  register(form:FormGroup) {
    let data = {email: form.get('email')?.value, password: form.get('password')?.value}
    return this.http.post(`${this.apiUrl}api/register`, data)
  }

  login(form:FormGroup) {
    let data = {email: form.get('email')?.value, password: form.get('password')?.value}
    return this.http.post(`${this.apiUrl}api/login`, data)
  }

}
