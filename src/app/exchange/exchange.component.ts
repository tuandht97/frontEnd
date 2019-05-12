import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})

export class ExchangeComponent implements OnInit {

  items;
  displayedColumns = ['code', 'amount', 'price', 'owner', 'change'];
  dataSource: MatTableDataSource<Item>;
  currentUserRole: string;
  currentUser: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filter = '';

  constructor(
    public itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {
    this.currentUserRole = this.auth.getCurrentUserRole;
    this.currentUser = this.auth.getCurrentUser;
    if (this.isUser)
      this.displayedColumns.push('buy')
    this.getData();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.filter = params['code'];
      }
    )
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getData() {
    this.itemService.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
    });
  }

  get isUser() {
    return this.currentUserRole === 'User';
  }

  goBuy(id) {
    this.router.navigate(['transaction/create/' + id])
  }
}