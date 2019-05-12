import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  items;
  displayedColumns = ['code', 'amount', 'price'];
  dataSource: MatTableDataSource<Item>;
  currentUserRole: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filter = '';

  constructor(
    public itemService: ItemService,
    private toastr: ToastrService,
    private auth: AuthService
  ) {
    this.currentUserRole = this.auth.getCurrentUserRole;
    this.getData();
  }

  ngOnInit() {
    if (this.isUser) {
      this.displayedColumns.push('btn');
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getData() {
    this.itemService.getByUser().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
    });
  }

  get isUser() {
    return this.currentUserRole === 'User';
  }

  removeItem(id) {
    this.itemService.delete(id).subscribe(
      result => {
        this.toastr.success("Ngừng bán mã thành công")
      },
      err => {
        this.toastr.error("Ngừng bán mã không thành công")
      });
  }
}
