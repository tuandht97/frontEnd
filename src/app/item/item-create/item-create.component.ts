import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import { first, map, startWith } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { ItemService } from '../../services/item.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss']
})
export class ItemCreateComponent implements OnInit {

  public typeaheadFocusModel: any;

  code: string[] = [];
  assets: any[];
  amountCodeCurrent: number;
  amount: number;
  codeCurrent: string;

  itemForm: FormGroup;
  submitted = false;

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private itemService: ItemService
  ) {
    this.userService.getAsset().subscribe(data => {
      this.assets = data['assets'];
      for (var x in this.assets)
        this.code.push(this.assets[x].code)
    }, error => {
    });
  }

  ngOnInit() {
    this.itemForm = this.formBuilder.group({
      code: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(1)]],
    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  public submit() {
    this.submitted = true;

    if (this.itemForm.invalid) {
      return;
    }

    let code = this.assets.find(x => x.code == this.itemForm.value.code)
    if (code) {
      if (code.amount < this.itemForm.value.amount) {
        this.toastr.error("Bạn chỉ có " + code.amount + " trong tài sản")
        this.itemForm['controls']['amount'].setValue(0);
        return;
      }
    }
    else {
      this.toastr.error("Mã không có trong tài sản của bạn")
      this.itemForm['controls']['code'].setValue("");
      return;
    }

    this.itemService.create(this.itemForm.value)
      .pipe(first())
      .subscribe(
        result => {
          this.toastr.success("Giao bán mã thành công"),
            this.router.navigate(['item'])
        },
        err => {
          this.toastr.error("Giao bán mã không thành công")
        }
      );
  }

  get f() { return this.itemForm.controls; }

  public sellAll() {
    this.amount = this.amountCodeCurrent;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.code.filter(x => x.toLowerCase().includes(filterValue));
  }

  updateCode(value: string) {
    this.itemForm['controls']['code'].setValue(value);
  }

  updateForm(ev: any) {
    if (ev.source.value) {
      const code = this.assets.find(x => x.code == ev.source.value)
      if (code) {
        this.itemForm['controls']['code'].setValue(code.code);
        this.amountCodeCurrent = code.amount;
      } else {
        this.toastr.error("Mã không tồn tại trong tài sản của bạn")
      }
    } else {
      this.toastr.error("Chọn mã không thành công")
    }
  }
}
