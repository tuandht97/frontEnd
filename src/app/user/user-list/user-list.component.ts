import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from '../../models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  displayedColumns = ['username', 'firstName', 'lastName', 'identityCard', 'balance'];
  userSource: MatTableDataSource<User>;
  sellerSource: MatTableDataSource<User>;
  currentUserRole: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filter = '';
  filter2 = '';

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
    this.userSource.filter = filterValue;
  }

  applyFilterSeller(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.sellerSource.filter = filterValue;
  }

  getData() {
    this.userService.getAllUser().subscribe(data => {

      this.userSource = new MatTableDataSource(data.user);
      this.userSource.paginator = this.paginator;
      this.userSource.sort = this.sort;

      this.sellerSource = new MatTableDataSource(data.seller);
      this.sellerSource.paginator = this.paginator;
      this.sellerSource.sort = this.sort;
    }, error => {
    });
  }
}

