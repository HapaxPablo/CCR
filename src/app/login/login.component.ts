import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http'
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginSuccess = false
  loginError = false
  public errorMessage = ''

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(private router: Router, private loginServ: AuthService) { }

  ngOnInit(): void {  }

  sendLoginData() {
    if (this.loginForm.valid) {
      this.loginServ.login(this.loginForm).subscribe(
        (response) => {
          console.log(response)
          this.loginSuccess = true;
          this.loginError = false
          this.navigateToHomePage()
        },
        (err: HttpErrorResponse) => {
          this.loginError = true;
          this.errorMessage = err.error.error;
          console.log(err.error);
        }
      );
    }
  }

  public navigateToRegisterPage(): void {
    this.router.navigate(['/register']);
  }
  public navigateToHomePage(): void {
    this.router.navigate(['/home']);
  }



}
