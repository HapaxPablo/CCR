import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{
  
  public resources: any[] = [];
  public userForm!: FormGroup;
  public resourcesForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public usersService: UsersService
  ) { }

  ngOnInit(): void {
      this.userForm = this.formBuilder.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        avatar: ['']
      });
      this.resourcesForm = this.formBuilder.group({
        name: ['', Validators.required],
        last_name: ['', Validators.required],
        color: ['', Validators.required],
        year: []
      });
  }
  public navigateToUserDetails(userId: number): void {
    this.router.navigate(['users', userId]);
  }

  public navigateToLoginPage(): void {
    this.router.navigate(['/login']);
  }

}
