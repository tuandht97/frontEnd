import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})

export class ExchangeComponent implements OnInit {

  items;
  displayedColumns = ['code', 'amount', 'price', 'owner', 'change', 'buy'];
  dataSource: MatTableDataSource<Item>;
  currentUserRole: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filter = '';

  constructor(
    public itemService: ItemService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    this.currentUserRole = this.auth.getCurrentUserRole;
    this.getData();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        console.log('Got the JWT as: ', params['code']);
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
}