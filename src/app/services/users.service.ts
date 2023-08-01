import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseUsers } from '../models/responseUsers.interface';
import { BehaviorSubject, map } from 'rxjs';
import { IUser } from '../models/user.interface';
import { IResource } from '../models/resource.interface';
import { IResponseResources } from '../models/responseResources';
import { IResponseSingleUser } from '../models/responseSingleUser.interface';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private apiUrl = 'https://reqres.in/';
  public users$: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  public resources$: BehaviorSubject<IResource[]> = new BehaviorSubject<IResource[]>([]);
  public user$: BehaviorSubject<IUser | undefined> = new BehaviorSubject<IUser | undefined>(undefined);

  constructor(private http: HttpClient) { 
    this.getUsersList();
    this.getResourcesList();
  }

  getUsersList(){

    this.http.get<IResponseUsers>(`${this.apiUrl}api/users?page=2`).pipe(
      map(d => d.data)
    ).subscribe(d => this.users$.next(d))
    
  }

  deleteUser(userId: number){
    this.http.delete(`${this.apiUrl}api/users/${userId}`).subscribe(
      (response) => {
        console.log('Пользователь успешно удален:', response);
        let users = this.users$.getValue()
        users = users.filter((user) => user.id !== userId)
        this.users$.next(users)
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  getResourcesList() {
    this.http.get<IResponseResources>(`${this.apiUrl}api/unknown`).pipe(
      map(d => d.data)
    ).subscribe(d => this.resources$.next(d))
  }

  getUserDetails(userId: number) {
    this.http.get<IResponseSingleUser>(`${this.apiUrl}api/users/${userId}`).pipe(
      map(d => d.data)
    ).subscribe(d => this.user$.next(d));
  }

  editUser(userId: number, userDetails: IResponseSingleUser){
    return this.http.put<IResponseSingleUser>(`${this.apiUrl}api/users/${userId}`, userDetails);
  }

}
