import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { IRegisterData } from '../models/registerData.interface';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registrationSuccess = false
  registrationError = false
  public errorMessage = ''

  public registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(private router: Router, private regServ: RegisterService) { }

  ngOnInit(): void {  }

  sendRegData() {
    if (this.registerForm.valid) {
      this.regServ.register(this.registerForm).subscribe(
        (response) => {
          console.log(response)
          this.registrationSuccess = true;
          this.registrationError = false
          this.navigateToHomePage()
        },
        (err: HttpErrorResponse) => {
          this.registrationError = true;
          this.errorMessage = err.error.error;
          console.log(err.error);
        }
      );
    }
  }

  public navigateToLoginPage(): void {
    this.router.navigate(['/login']);
  }
  public navigateToHomePage(): void {
    this.router.navigate(['/home']);
  }



}
