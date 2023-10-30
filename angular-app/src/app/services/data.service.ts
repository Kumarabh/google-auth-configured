import { Injectable } from '@angular/core';
import { User } from '../types/User';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  loggedInUser: User = { id: '1341017039', firstName: 'John', lastName: 'Doe'}
  isLoggedIn: boolean = true;

  constructor() { }

  login() {
    this.isLoggedIn = true;
  }

  signOutExternal() {
    this.isLoggedIn = false;

  }
}
