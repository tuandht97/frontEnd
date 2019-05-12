import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/services/auth.service';

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

  currentUserRole: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filter = '';

  constructor(
    public userService: UserService,
    public auth: AuthService
  ) {
    this.currentUserRole = this.auth.getCurrentUserRole;
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

  get isUser() {
    return this.currentUserRole === 'User';
  }
}

export interface Asset {
  code: string,
  amount: number
}