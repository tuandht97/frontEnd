import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerSellerForm: FormGroup;
  submitted = false;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    if (this.auth.getCurrentUserRole) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, this.checkPassword]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      identityCard: ['', Validators.required]
    });

    this.registerSellerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, this.checkPassword]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      identityCard: ['', Validators.required],
      typeUser: ['', Validators.required]
    });
  }

  public submit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        result => {
          this.toastr.success("Đăng kí thành công"),
            this.router.navigate(['login'])
        },
        err => {
          this.toastr.error("Đăng kí không thành công")
        }
      );
  }

  public submitSeller() {
    this.submitted = true;

    if (this.registerSellerForm.invalid) {
      return;
    }

    this.userService.registerSeller(this.registerSellerForm.value)
      .pipe(first())
      .subscribe(
        result => {
          this.toastr.success("Đăng kí thành công"),
            this.router.navigate(['login'])
        },
        err => {
          this.toastr.error("Đăng kí không thành công")
        }
      );
  }

  get f() { return this.registerForm.controls; }
  get s() { return this.registerSellerForm.controls; }


  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }
}
