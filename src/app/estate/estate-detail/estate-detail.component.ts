import { Component, OnInit } from '@angular/core';
import { Estate } from '../../models/estate';
import { EstateService } from '../../services/estate.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-estate-detail',
  templateUrl: './estate-detail.component.html',
  styleUrls: ['./estate-detail.component.scss']
})
export class EstateDetailComponent implements OnInit {
  currentUserRole: string;
  estate: Estate;

  constructor(
    private activatedRoute: ActivatedRoute,
    private estateService: EstateService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.estateService.getById(id))
    ).subscribe(estate => {
      console.log(estate)
      this.estate = estate;
    });
  }

  get isAdmin() {
    return this.currentUserRole === 'Admin';
  }

  get isSeller() {
    return this.currentUserRole === 'Seller';
  }
}
