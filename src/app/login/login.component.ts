import { Component, OnInit } from '@angular/core';
import { ILoginData } from '../models/loginData.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

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
      (error) => {
        this.registrationError = true;
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
