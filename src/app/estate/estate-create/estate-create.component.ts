import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { EstateService } from '../../services/estate.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-estate-create',
  templateUrl: './estate-create.component.html',
  styleUrls: ['./estate-create.component.scss']
})
export class EstateCreateComponent implements OnInit {

  estateForm: FormGroup;
  submitted = false;

  constructor(
    private auth: AuthService,
    private estateService: EstateService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.estateForm = this.formBuilder.group({
      name: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
      address: ['', Validators.required],
      squareMeter: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required]
    });
  }

  urls = [];

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event) => {
          console.log(event);
          this.urls.push(reader.result);
        }

        reader.readAsDataURL(event.target.files[i]);
        console.log(event.target.files[i]);
      }
    }
  }

  removeImage(id: number) {
    console.log(this.urls);
    this.urls.splice(id, 1);
    console.log(this.urls);
  }

  public submit() {
    this.submitted = true;

    if (this.estateForm.invalid) {
      return;
    }

    this.estateService.create(this.estateForm.value)
      .pipe(first())
      .subscribe(
        result => {
          this.toastr.success("Tạo bất động sản thành công"),
            this.router.navigate(['estate'])
        },
        err => {
          this.toastr.error("Tạo bất động sản không thành công")
        }
      );
  }

  get f() { return this.estateForm.controls; }
}
