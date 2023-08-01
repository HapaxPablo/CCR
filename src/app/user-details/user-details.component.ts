import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../models/user.interface';
import { UsersService } from '../services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  public user: IUser = {} as IUser;
  public userDetailsForm!: FormGroup;
  public isEditing = false;
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public userService: UsersService,
  ) { 

    this.subscription = this.userService.user$.subscribe((user) => {
      if(user){
        this.user.first_name = user.first_name
        this.user.last_name = user.last_name
        this.user.email = user.email
        this.user.avatar = user.avatar
      }
    })
  }

  ngOnInit(): void {
    this.userDetailsForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      avatar: ['']
    });

    this.route.params.subscribe(params => {
      const userId = +params['id'];
      this.userService.getUserDetails(userId);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  public editUser(): void {
    if (this.userDetailsForm.valid) {
      const updatedUserData = this.userDetailsForm.value;
      const userId = this.user.id;
      this.userService.editUser(userId, updatedUserData).subscribe(
        (response) => {
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
    this.router.navigate(['/home']);
  }
  public onEdit(): void {
    this.isEditing = true;
  }

  
}
