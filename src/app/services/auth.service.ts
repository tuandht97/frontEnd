import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUserRole: BehaviorSubject<string>;
  public role: Observable<string>;
  private currentUser: BehaviorSubject<string>;
  public user: Observable<string>;
  private currentUserID: BehaviorSubject<string>;

  constructor(private http: HttpClient) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem('access_token'));
    if (decodedToken) {
      this.currentUserRole = new BehaviorSubject<string>(decodedToken.role);
      this.role = this.currentUserRole.asObservable();
      this.currentUser = new BehaviorSubject<string>(decodedToken.name);
      this.user = this.currentUser.asObservable();
      this.currentUserID = new BehaviorSubject<string>(decodedToken.sub);
    } else {
      this.currentUserRole = new BehaviorSubject<string>('');
      this.role = this.currentUserRole.asObservable();
      this.currentUser = new BehaviorSubject<string>('');
      this.user = this.currentUser.asObservable();
      this.currentUserID = new BehaviorSubject<string>('');
    }
  }

  public get getCurrentUserRole(): string {
    if (this.currentUserRole)
      return this.currentUserRole.value;
    return null;
  }

  public get getCurrentUser(): string {
    if (this.currentUser)
      return this.currentUser.value;
    return null;
  }

  public get getCurrentUserID(): string {
    if (this.currentUserID)
      return this.currentUserID.value;
    return null;
  }

  login(user: User): Observable<any> {
    // return this.http.post<{ token: string, status: number }>('/api/users/login', user)
    return this.http.post<{ token: string, status: number, message: string }>('/api/users/login', user)
      .pipe(
        map(result => {
          if (result.token) {
            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(result.token);
            this.currentUserRole.next(decodedToken.role);
            this.currentUser.next(decodedToken.name);
            this.currentUserID.next(decodedToken.sub);
            localStorage.setItem('access_token', result.token);
          }
          //  return true;
          return result.status;
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.currentUserRole.next(null);
    this.currentUser.next(null);
    this.currentUserID.next(null);
  }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

  setupAuth(userID: string) {
    return this.http.post("/api/tfa/setup", { id: userID }, { observe: 'response' })
  }

  getAuth(userID: string) {
    const params = new HttpParams()
      .set('id', userID);
    return this.http.get("/api/tfa/setup/", { params, observe: 'response' });
  }

  deleteAuth(userID: string) {
    const params = new HttpParams()
      .set('id', userID);
    return this.http.delete("/api/tfa/setup", { params, observe: 'response' });
  }

  verifyAuth(code: any, id: string) {
    return this.http.post("/api/tfa/verify", { code: code, id: id }, { observe: 'response' });
  }
}
