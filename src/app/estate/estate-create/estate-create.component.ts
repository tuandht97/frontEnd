import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { EstateService } from '../../services/estate.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeEstate } from '../../enum/typeEstate.enum';

@Component({
  selector: 'app-estate-create',
  templateUrl: './estate-create.component.html',
  styleUrls: ['./estate-create.component.scss']
})
export class EstateCreateComponent implements OnInit {

  estateForm: FormGroup;
  submitted = false;

  pay: number;

  keys = Object.keys;
  typeEstate = TypeEstate;

  constructor(
    private auth: AuthService,
    private estateService: EstateService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.estateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      code: ['', [Validators.required, Validators.maxLength(10)]],
      amount: [1, [Validators.required, Validators.min(1)]],
      sumPrice: ['', [Validators.required, Validators.min(10000)]],
      price: [1, Validators.required],
      typeEstate: ['', Validators.required],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      squareMeter: ['', [Validators.required, Validators.min(0)]],
      description: [null, Validators.required]
    });
  }

  urls = [];

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event) => {
          this.urls.push(reader.result);
        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  removeImage(id: number) {
    this.urls.splice(id, 1);
  }

  public submit() {
    this.submitted = true;

    if (this.estateForm.invalid) {
      return;
    }

    this.estateForm['controls']['price'].setValue(this.pay);

    // this.estateService.create(this.estateForm.value)
    //   .pipe(first())
    //   .subscribe(
    //     result => {
    //       this.toastr.success("Tạo bất động sản thành công"),
    //         this.router.navigate(['estate'])
    //     },
    //     err => {
    //       this.toastr.error("Tạo bất động sản không thành công")
    //     }
    //   );
  }

  get f() { return this.estateForm.controls; }

  onKey(value: number) {
    this.pay = (value / 10000) / this.estateForm.value.amount;
    if (this.pay < 1)
      this.pay = 1;
  }

  onAmount(value: number) {
    this.pay = (this.estateForm.value.sumPrice / 10000) / value;
    if (this.pay < 1)
      this.pay = 1;
  }
}
