import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transaction.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  items;
  displayedColumns = ['code', 'amount', 'price', 'seller', 'createdDate'];
  dataSource: MatTableDataSource<Transaction>;
  currentUserRole: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filter = '';

  constructor(
    public tranService: TransactionService,
    public auth: AuthService
  ) {
    this.getData();
    this.currentUserRole = this.auth.getCurrentUserRole;
  }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getData() {
    this.tranService.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
    });
  }

  get isSeller() {
    return this.currentUserRole === 'Seller';
  }

  get isUser() {
    return this.currentUserRole === 'User';
  }
}
