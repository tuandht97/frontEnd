import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-coin',
  templateUrl: './user-coin.component.html',
  styleUrls: ['./user-coin.component.scss']
})
export class UserCoinComponent implements OnInit {

  itemsList: Item[] = [
    { id: 1, name: '500,000 VND', value: 50 },
    { id: 2, name: '1,000,000 VND', value: 100 },
    { id: 3, name: '2,000,000 VND', value: 200 },
    { id: 4, name: '5,000,000 VND', value: 500 },
    { id: 5, name: '10,000,000 VND', value: 1000 },
    { id: 6, name: '20,000,000 VND', value: 2000 }
  ];

  radioSel: Item;
  radioSelected: number;
  nameSel: string;
  valueSel: number;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
  }

  getSelecteditem() {
    this.radioSel = this.itemsList.find(x => x.id == this.radioSelected);
    this.nameSel = this.radioSel.name;
    this.valueSel = this.radioSel.value;
  }

  onItemChange(item) {
    this.getSelecteditem();
  }

  buy() {
    this.userService.buyCoin(this.valueSel)
      .subscribe(
        result => {
          this.toastr.success("Giao dịch thành công"),
            this.router.navigate(['user'])
        },
        err => {
          this.toastr.error("Giao dịch không thành công")
        }
      );
  }
}

export class Item {
  id: number;
  name: string;
  value: number;
}