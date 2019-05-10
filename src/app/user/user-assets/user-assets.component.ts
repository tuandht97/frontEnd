import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-assets',
  templateUrl: './user-assets.component.html',
  styleUrls: ['./user-assets.component.scss']
})
export class UserAssetsComponent implements OnInit {

  assets;
  balance;
  displayedColumns = ['code', 'amount'];
  dataSource: MatTableDataSource<Asset>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filter = '';

  constructor(
    public userService: UserService
  ) {
    this.getData();
  }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getData() {
    this.userService.getAsset().subscribe(data => {
      this.dataSource = new MatTableDataSource(data['assets']);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.balance = data['balance'];
    }, error => {
    });
  }
}

export interface Asset {
  code: string,
  amount: number
}