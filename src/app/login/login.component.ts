import { Component, OnInit } from '@angular/core';
import { ILoginData } from '../models/loginData.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public errorMessage = ''
  public userData: ILoginData = {} as ILoginData
  private apiUrl = 'https://reqres.in/'
  registrationSuccess = false
  registrationError = false

  constructor(private http: HttpClient, private router: Router) { }

  register() {
    if (!this.userData.email || !this.userData.password) {
      this.registrationError = true;
      return;
    }
    this.http.post(`${this.apiUrl}api/login`, this.userData).subscribe(
      response => {
        this.registrationSuccess = true;
        this.registrationError = false
        this.navigateToHomePage()
      },
      (err: HttpErrorResponse) => {
        this.registrationError = true
        this.errorMessage = err.error.error
    }
    );
  }
  public navigateToRegisterPage(): void {
    this.router.navigate(['/register']);
  }
  public navigateToHomePage(): void {
    this.router.navigate(['/home']);
  }

}
