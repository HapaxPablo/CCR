import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'https://reqres.in/'



  constructor(private http: HttpClient) {  }

  register(form:FormGroup) {
    let data = {email: form.get('email')?.value, password: form.get('password')?.value}
    return this.http.post(`${this.apiUrl}api/register`, data)
  }

}
