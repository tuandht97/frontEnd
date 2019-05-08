import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss']
})
export class ItemCreateComponent implements OnInit {

  public typeaheadFocusModel: any;

  code: string[] = [];

  assets: any[];

  constructor(private userService: UserService) {
    this.userService.getAsset().subscribe(data => {
      this.assets = data['assets'];
      for (var x in this.assets)
        this.code.push(this.assets[x].code)
      console.log(this.code)
    }, error => {
    });
  }

  ngOnInit() {
  }

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  focusSearch = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.focus$)
      .merge(this.click$.filter(() => !this.instance.isPopupOpen()))
      .map(term => (term === '' ? this.code : this.code.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10));

}
