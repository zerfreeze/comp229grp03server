import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private permissionLevel: number = 0; // Initialize the permission level to 0

  private surveysUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{token: string, permissionlevel: number}>(this.surveysUrl+'users/signIn', {username: username, password: password})
      .pipe(
        map(result => {
          console.log(result);
          localStorage.setItem('access_token', result.token);
          this.permissionLevel = result.permissionlevel; // Set the permission level value
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    console.log('Tokenn', localStorage.getItem('access_token') )
    return (localStorage.getItem('access_token') !== null);   
  }

  public get hasPermission(): boolean {
    console.log('Permission Level:', this.permissionLevel);
    return this.permissionLevel !== 1;
  }
}
