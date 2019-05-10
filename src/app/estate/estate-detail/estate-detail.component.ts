import { Component, OnInit } from '@angular/core';
import { Estate } from '../../models/estate';
import { EstateService } from '../../services/estate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map, first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-estate-detail',
  templateUrl: './estate-detail.component.html',
  styleUrls: ['./estate-detail.component.scss']
})
export class EstateDetailComponent implements OnInit {

  createForm: FormGroup;
  submitted = false;

  currentUserRole: string;
  estate: Estate;

  constructor(
    private activatedRoute: ActivatedRoute,
    private estateService: EstateService,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private stockService: StockService
  ) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      code: ['', Validators.required]
    });

    this.activatedRoute.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.estateService.getById(id))
    ).subscribe(estate => {
      console.log(estate)
      this.estate = estate;
    });

    this.currentUserRole = this.auth.getCurrentUserRole;
  }

  submit() {
    this.submitted = true;

    if (this.createForm.invalid) {
      return;
    }

    this.stockService.create(this.estate.id, this.createForm.value.code)
      .pipe(first())
      .subscribe(
        result => {
          this.toastr.success("Xác nhận và tạo mã thành công"),
            this.router.navigate(['stock'])
        },
        err => {
          this.toastr.error("Xác nhận và tạo mã không thành công")
        }
      );
  }

  submitDelete() {
    this.submitted = true;

    if (this.estate.config) {
      this.toastr.error("Không thể xóa bất động sản đã xác nhận");
      return;
    }

    this.estateService.delete(this.estate.id)
      .pipe(first())
      .subscribe(
        result => {
          this.toastr.success("Xóa bất động sản thành công"),
            this.router.navigate(['estate'])
        },
        err => {
          this.toastr.error("Xóa bất động sản không thành công")
        }
      );
  }

  get f() { return this.createForm.controls; }

  get isAdmin() {
    return this.currentUserRole === 'Admin';
  }

  get isSeller() {
    return this.currentUserRole === 'Seller';
  }
}
