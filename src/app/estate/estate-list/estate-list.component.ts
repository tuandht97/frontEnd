import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { Estate } from '../../models/estate';
import { EstateService } from '../../services/estate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estate-list',
  templateUrl: './estate-list.component.html',
  styleUrls: ['./estate-list.component.scss']
})
export class EstateListComponent implements OnInit {

  filter = '';
  currentUserRole: string;

  displayedColumns = ['name', 'code', 'owner', 'price', 'amount', 'process', 'btn'];
  dataSource: MatTableDataSource<Estate>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private auth: AuthService,
    private estateService: EstateService,
    private router: Router
  ) {
    this.currentUserRole = this.auth.getCurrentUserRole;
    if (this.currentUserRole === 'Admin')
      this.getAll();
    if (this.currentUserRole === 'Seller')
      this.getEstateUser();
  }

  ngOnInit() {
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

  getAll() {
    this.estateService.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
    });
  }

  getEstateUser() {
    this.estateService.getEstateUser().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
    });
  }

  get isAdmin() {
    return this.currentUserRole === 'Admin';
  }

  get isSeller() {
    return this.currentUserRole === 'Seller';
  }

  goConfig(id) {
    this.router.navigate(['estate/' + id])
  }

  goUpdate(id) {
    this.router.navigate(['estate/create'])
  }
}
