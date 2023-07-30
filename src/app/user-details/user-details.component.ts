import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../models/user.interface';
import { IResponseSingleUser } from '../models/responseSingleUser.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  public user: IUser = {} as IUser;
  private apiUrl = 'https://reqres.in/';
  public userDetailsForm!: FormGroup;
  public isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userDetailsForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      avatar: ['']
    });

    this.route.params.subscribe(params => {
      const userId = +params['id'];
      this.loadUserDetails(userId);
    });
    
  }

  private loadUserDetails(userId: number): void {
    this.http.get<IResponseSingleUser>(`${this.apiUrl}api/users/${userId}`).subscribe(
      (response: IResponseSingleUser) => {
        this.user = response.data;
        console.log(response);
        this.userDetailsForm.patchValue({
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          email: this.user.email,
          avatar: this.user.avatar
        });
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
  
  public editUser(): void {
    if (this.userDetailsForm.valid) {
      const updatedUserData = this.userDetailsForm.value;
      this.http.put(`${this.apiUrl}api/users/${this.user.id}`, updatedUserData).subscribe(
        (response: any) => {
          console.log('Данные пользователя успешно обновлены:', response);
          this.isEditing = false;
        },
        (error) => {
          console.error('Error updating user details:', error);
        }
      );
    }
  }
  
  public navigateToUserDetails(): void {
    this.router.navigate(['/users']);
  }
  public onEdit(): void {
    this.isEditing = true;
  }
}
