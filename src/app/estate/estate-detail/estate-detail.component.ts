import { Component, OnInit } from '@angular/core';
import { Estate } from '../../models/estate';
import { EstateService } from '../../services/estate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map, first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-estate-detail',
  templateUrl: './estate-detail.component.html',
  styleUrls: ['./estate-detail.component.scss']
})
export class EstateDetailComponent implements OnInit {

  currentUserRole: string;
  currentUser: string;
  public estate: Estate;

  processNow: number;

  submited: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private estateService: EstateService,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private stockService: StockService
  ) { }

  ngOnInit() {
    this.currentUserRole = this.auth.getCurrentUserRole;
    this.currentUser = this.auth.getCurrentUser;

    this.activatedRoute.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.estateService.getById(id))
    ).subscribe(estate => {
      this.estate = estate;
      this.processNow = (estate.process / 3) * 100;
      this.submited = estate.checker.includes(this.currentUser);
      if (estate.config)
        this.submited = true;
    });
  }

  submit() {

    if (this.submited) {
      this.toastr.error("Bạn đã xác nhận bất động sản này trước đó")
      return;
    }

    this.stockService.create(this.estate.id)
      .pipe(first())
      .subscribe(
        result => {
          this.processNow = ((this.estate.process + 1) / 3) * 100;
          this.toastr.success("Xác nhận thành công"),
            this.router.navigate(['estate'])
        },
        err => {
          this.toastr.error("Xác nhận và tạo mã không thành công")
        }
      );
  }

  submitDelete() {
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

  get isAdmin() {
    return this.currentUserRole === 'Admin';
  }

  get isSeller() {
    return this.currentUserRole === 'Seller';
  }
}
