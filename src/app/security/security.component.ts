import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  tfa: any = {};
  authcode: string = "";
  errorMessage: string = null;
  userID: string;

  constructor(private auth: AuthService) {
    this.getAuthDetails();
  }

  ngOnInit() {
  }

  getAuthDetails() {
    this.userID = this.auth.getCurrentUserID;
    this.auth.getAuth(this.userID).subscribe((data) => {
      const result = data.body;
      if (data.status === 200) {
        if (this.isEmpty(result)) {
          this.setup();
        } else {
          this.tfa = result;
        }
      }
    });
  }

  setup() {
    this.auth.setupAuth(this.userID).subscribe((data) => {
      const result = data.body
      if (data['status'] === 200) {
        this.tfa = result;
      }
    });
  }

  confirm() {
    this.auth.verifyAuth(this.authcode, this.userID).subscribe((data) => {
      const result = data.body
      if (result['status'] === 200) {
        this.errorMessage = null;
        this.tfa.secret = this.tfa.tempSecret;
        this.tfa.tempSecret = "";
      } else {
        this.errorMessage = result['message'];
      }
    });
  }

  disabledTfa() {
    this.auth.deleteAuth(this.userID).subscribe((data) => {
      const result = data.body
      if (data['status'] === 200) {
        console.log(result);
        this.authcode = "";
        this.getAuthDetails();
      }
    });
  }

  isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop))
        return false;
    }
    return true;
  }
}

