import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { httpsAgent } from 'src/Common/api.constant';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private path: string = environment.apiUrl;

  constructor( private http: HttpClient ) { }

  public signOutExternal = () => {
    localStorage.removeItem('token');
    console.log('==> token deleted.');

  }

  LoginWithGoogle(credentials: string): Observable<any> {
    const httpOptions = {
      headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${credentials}`
      },
      // httpsAgent: httpsAgent
    }
    console.log('==> credentials', credentials);
    // const payload = {
    //   token: credentials
    // }
    return this.http.post(this.path + 'signInWithGoogle', null, httpOptions)
  }

  // LoginWithGoogle(credentials: string): Observable<any> {
  //   const httpOptions = {
  //     headers: {
  //       'content-type': 'application/json'
  //     },
  //     params: {}
  //   }
  //   return this.http.post<any>('http://localhost:3000/auth', credentials, httpOptions);
  // }



}
