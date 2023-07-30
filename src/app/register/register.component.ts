import { Component } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { IRegisterData } from '../models/registerData.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public userData: IRegisterData = {} as IRegisterData
  private apiUrl = 'https://reqres.in/'
  registrationSuccess = false
  registrationError = false

  constructor(private http: HttpClient, private router: Router) { }

  register() {
    if (!this.userData.email || !this.userData.password) {
      this.registrationError = true;
      return;
    }
    this.http.post(`${this.apiUrl}api/register`, this.userData).subscribe(
      response => {
        this.registrationSuccess = true;
        this.registrationError = false
        this.navigateToHomePage()
      },
      (error) => {
        this.registrationError = true;
      }
    );
  }

  public navigateToLoginPage(): void {
    this.router.navigate(['/login']);
  }
  public navigateToHomePage(): void {
    this.router.navigate(['/home']);
  }



}
