import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../models/user.interface';
import { IResources } from '../models/resources.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{
  public users: IUser[] = [];
  public resources: any[] = [];
  private apiUrl = 'https://reqres.in/'
  public userForm!: FormGroup;
  public resourcesForm!: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
      this.loadUsers();
      this.loadResources();
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
  private loadUsers(): void {
    this.http.get<{ data: IUser[] }>(`${this.apiUrl}api/users?page=2`).subscribe(
      (response) => {
        this.users = response.data;
        this.userForm.patchValue({
          first_name: this.users[0].first_name,
          last_name: this.users[0].last_name,
          email: this.users[0].email,
          avatar: this.users[0].avatar
        });
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  private loadResources(): void {
    this.http.get<{data: IResources[]}>(`${this.apiUrl}api/unknown`).subscribe(
      (response) => {
        this.resources = response.data;
        this.resourcesForm.patchValue({
          name: this.resources[0].name,
          color: this.resources[0].color,
          pantone_value: this.resources[0].pantone_value,
          year: this.resources[0].year
        });
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  public deleteUser(userId: number): void {
    this.http.delete(`${this.apiUrl}api/users/${userId}`).subscribe(
      (response) => {
        console.log('Пользователь успешно удален:', response);
        this.users = this.users.filter((user) => user.id !== userId);
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  public navigateToLoginPage(): void {
    this.router.navigate(['/login']);
  }

}
