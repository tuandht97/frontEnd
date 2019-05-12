import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  tfaFlag: boolean = false

  constructor(
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    if (this.auth.getCurrentUserRole) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, this.checkPassword]],
      authcode: ['']
    });
  }

  public submit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.auth.login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        result => {
          if (result === 200)
            this.router.navigate(['exchange'])
          if (result === 206)
            this.tfaFlag = true;
        },
        err => this.toastr.error("Đăng nhập không thành công")
      );
  }

  get f() { return this.loginForm.controls; }


  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }
}
