import { Component, OnInit } from '@angular/core';
import { map, switchMap, first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

import { Item } from '../../models/item';

import { UserService } from '../../services/user.service';
import { TransactionService } from '../../services/transaction.service';
import { ItemService } from '../../services/item.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.scss']
})

export class TransactionCreateComponent implements OnInit {

  tranForm: FormGroup;
  submitted = false;

  currentUser: string;
  item: Item;

  balance: number;
  pay: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private tranService: TransactionService,
    private itemService: ItemService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.activatedRoute.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.itemService.getById(id))
    ).subscribe(item => {
      this.item = item;
    });
  }

  ngOnInit() {
    this.tranForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(1)]]
    });

    this.userService.getAsset().subscribe(data => {
      this.balance = data['balance'];
    }, error => {
    });
  }

  onKey(value: number) {
    this.pay = value * this.item.price;
  }

  public submit() {
    this.submitted = true;

    if (this.tranForm.invalid) {
      return;
    }

    if (this.pay > this.balance) {
      this.toastr.error("Bạn không đủ coin trong tài khoản")
      return;
    }

    if (this.tranForm.value > this.item.amount) {
      this.toastr.error("Không đủ mã")
      this.tranForm['controls']['amount'].setValue(0);
      return;
    }

    this.tranService.create(this.item.id, this.tranForm.value.amount)
      .pipe(first())
      .subscribe(
        result => {
          this.toastr.success("Mua thành thành công"),
            this.router.navigate(['user'])
        },
        err => {
          this.toastr.error("Mua không thành công")
        }
      );
  }

  get f() { return this.tranForm.controls; }
}